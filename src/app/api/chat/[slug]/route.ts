import { NextResponse } from "next/server";
import { getBusinessProfile, getLocalBusinessProfile } from "@/lib/business-data";
import {
  extractLeadCandidate,
  getOrCreateConversation,
  getCustomerMessagesForLead,
  getRecentStoredMessages,
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
  const business = getLocalBusinessProfile(slug) ?? (await getBusinessProfile(slug));

  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  if (slug === "luna-fit" && !isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase is not configured for the real LUNA FIT demo." },
      { status: 503 }
    );
  }

  const body = (await request.json().catch(() => ({}))) as ChatRequestBody;
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const sessionId = typeof body.sessionId === "string" && body.sessionId.trim() ? body.sessionId.trim() : crypto.randomUUID();

  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  const requestHistory = parseRequestHistory(body.history);
  const storedHistory = await getStoredHistory(slug, sessionId);
  const conversationHistory = mergeMessageHistory([...storedHistory, ...requestHistory]);
  const chatMessages = [...conversationHistory, { role: "user" as const, content: message }].slice(-18);
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

  const customerMessages = getCustomerMessagesForLead(chatMessages);
  const leadCandidate = extractLeadCandidate(business, customerMessages, reply);

  return NextResponse.json({
    reply,
    source,
    sessionId,
    leadCaptured: Boolean(leadCandidate),
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

async function getStoredHistory(slug: string, sessionId: string) {
  return withTimeout((async () => {
    const conversation = await getOrCreateConversation(slug, sessionId);
    return getRecentStoredMessages(conversation);
  })(), 1500, []);
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, fallback: T) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const timeout = new Promise<T>((resolve) => {
    timeoutId = setTimeout(() => resolve(fallback), timeoutMs);
  });

  return Promise.race([promise, timeout]).catch(() => fallback).finally(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  });
}

function mergeMessageHistory(messages: StoredMessage[]) {
  const merged: StoredMessage[] = [];
  const seen = new Set<string>();

  for (const message of messages) {
    const key = `${message.role}:${message.content}`;

    if (!seen.has(key)) {
      merged.push(message);
      seen.add(key);
    }
  }

  return merged.slice(-18);
}
