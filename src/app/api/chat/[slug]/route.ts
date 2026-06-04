import { NextResponse } from "next/server";
import { createMockChatReply, getBusiness } from "@/lib/businesses";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const business = getBusiness(slug);

  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  const body = (await request.json().catch(() => ({}))) as { message?: unknown };
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  return NextResponse.json({
    reply: createMockChatReply(business, message),
    source: "mock-ai",
    capturedLeadSignals: {
      service: /剪发|染发|烫发|护理|造型|美甲|美睫|睫毛|卸甲|皮肤|清洁|补水|修护|猫眼|法式|小气泡/.test(message),
      schedule: /今天|明天|周|下午|晚上|预约/.test(message),
      budget: /¥|价格|多少钱|预算/.test(message)
    }
  });
}
