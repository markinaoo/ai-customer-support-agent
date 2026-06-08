import { NextResponse } from "next/server";
import { getBusinessIdBySlug, getBusinessProfile } from "@/lib/business-data";
import { saveMarketingDrafts } from "@/lib/conversation-store";
import { generateMarketingDrafts } from "@/lib/deepseek";
import { isSupabaseConfigured } from "@/lib/supabase-server";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

type MarketingBody = {
  serviceName?: unknown;
  campaignGoal?: unknown;
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
        { error: "Supabase is not configured for the real LUNA FIT marketing demo." },
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

  const body = (await request.json().catch(() => ({}))) as MarketingBody;
  const serviceName = typeof body.serviceName === "string" && body.serviceName.trim() ? body.serviceName.trim() : business.services[0]?.name ?? "";
  const campaignGoal =
    typeof body.campaignGoal === "string" && body.campaignGoal.trim() ? body.campaignGoal.trim() : "提升本周咨询和体验课预约";

  let generated: Awaited<ReturnType<typeof generateMarketingDrafts>>;

  try {
    generated = await generateMarketingDrafts(business, serviceName, campaignGoal);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Marketing generation failed",
        demoLabel: "示例门店，仅用于功能演示"
      },
      { status: 503 }
    );
  }

  const { drafts, source } = generated;
  const saved = await saveMarketingDrafts(slug, drafts, serviceName, campaignGoal);

  return NextResponse.json({
    drafts,
    savedCount: saved.length,
    source,
    demoLabel: "示例门店，仅用于功能演示"
  });
}
