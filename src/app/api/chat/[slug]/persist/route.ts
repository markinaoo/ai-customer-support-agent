import { NextResponse } from "next/server";
import { getBusinessProfile, getLocalBusinessProfile } from "@/lib/business-data";
import {
  extractLeadCandidate,
  getCustomerMessagesForLead,
  getOrCreateConversation,
  saveConversationMessage,
  saveLead,
  type StoredMessage
} from "@/lib/conversation-store";
import { isSupabaseConfigured } from "@/lib/supabase-server";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

type PersistRequestBody = {
  message?: unknown;
  reply?: unknown;
  sessionId?: unknown;
  history?: unknown;
};

export async function POST(request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const business = getLocalBusinessProfile(slug) ?? (await getBusinessProfile(slug));

  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  if (slug === "luna-fit" && !isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const body = (await request.json().catch(() => ({}))) as PersistRequestBody;
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const reply = typeof body.reply === "string" ? body.reply.trim() : "";
  const sessionId = typeof body.sessionId === "string" && body.sessionId.trim() ? body.sessionId.trim() : "";

  if (!message || !reply || !sessionId) {
    return NextResponse.json({ error: "message, reply, and sessionId are required" }, { status: 400 });
  }

  try {
    const conversation = await getOrCreateConversation(slug, sessionId);
    await saveConversationMessage(conversation, "customer", message);
    await saveConversationMessage(conversation, "ai", reply);

    const conversationMessages = [...parseRequestHistory(body.history), { role: "user" as const, content: message }];
    const customerMessages = getCustomerMessagesForLead(conversationMessages);
    const leadCandidate = extractLeadCandidate(business, customerMessages, reply);
    const savedLead = leadCandidate ? await saveLead(slug, conversation?.id ?? null, leadCandidate) : null;

    return NextResponse.json({
      saved: true,
      leadCaptured: Boolean(savedLead),
      demoLabel: "示例门店，仅用于功能演示"
    });
  } catch (error) {
    return NextResponse.json(
      {
        saved: false,
        error: error instanceof Error ? error.message : "Failed to persist chat"
      },
      { status: 500 }
    );
  }
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
