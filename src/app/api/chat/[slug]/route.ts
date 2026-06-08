import { NextResponse } from "next/server";
import { getBusinessIdBySlug, getBusinessProfile } from "@/lib/business-data";
import {
  extractLeadCandidate,
  getOrCreateConversation,
  getRecentStoredMessages,
  saveConversationMessage,
  saveLead,
  type StoredMessage
} from "@/lib/conversation-store";
import { generateBusinessChatReply } from "@/lib/deepseek";
import { isSupabaseConfigured } from "@/lib/supabase-server";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

type ChatRequestBody = {
  message?: unknown;
  sessionId?: unknown;
  history?: unknown;
};

export async function POST(request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const business = await getBusinessProfile(slug);

  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  if (slug === "luna-fit") {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "Supabase is not configured for the real LUNA FIT demo." },
        { status: 503 }
      );
    }

    const businessId = await getBusinessIdBySlug(slug);

    if (!businessId) {
      return NextResponse.json(
        { error: "LUNA FIT seed data is missing. Run /api/admin/seed-demo first." },
        { status: 503 }
      );
    }
  }

  const body = (await request.json().catch(() => ({}))) as ChatRequestBody;
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const sessionId = typeof body.sessionId === "string" && body.sessionId.trim() ? body.sessionId.trim() : crypto.randomUUID();

  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  const conversation = await getOrCreateConversation(slug, sessionId);
  await saveConversationMessage(conversation, "customer", message);

  const storedMessages = await getRecentStoredMessages(conversation);
  const requestHistory = parseRequestHistory(body.history);
  const chatMessages = storedMessages.length ? storedMessages : [...requestHistory, { role: "user" as const, content: message }];
  let reply: string;
  let source: string;

  try {
    const generated = await generateBusinessChatReply(business, chatMessages);
    reply = generated.reply;
    source = generated.source;
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "AI generation failed",
        demoLabel: "示例门店，仅用于功能演示"
      },
      { status: 503 }
    );
  }

  await saveConversationMessage(conversation, "ai", reply);

  const customerMessages = chatMessages.filter((item) => item.role === "user").map((item) => item.content);
  const leadCandidate = extractLeadCandidate(business, customerMessages, reply);
  const savedLead = leadCandidate ? await saveLead(slug, conversation?.id ?? null, leadCandidate) : null;

  return NextResponse.json({
    reply,
    source,
    sessionId,
    leadCaptured: Boolean(savedLead),
    demoLabel: "示例门店，仅用于功能演示"
  });
}

function parseRequestHistory(history: unknown): StoredMessage[] {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .map((item): StoredMessage | null => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const candidate = item as { role?: unknown; content?: unknown };
      const role = candidate.role === "ai" || candidate.role === "assistant" ? "assistant" : candidate.role === "user" ? "user" : null;
      const content = typeof candidate.content === "string" ? candidate.content.trim() : "";

      if (!role || !content) {
        return null;
      }

      return { role, content };
    })
    .filter((item): item is StoredMessage => Boolean(item));
}
