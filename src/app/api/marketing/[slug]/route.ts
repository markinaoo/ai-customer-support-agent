import { NextResponse } from "next/server";
import { createMarketingDraft, getBusiness } from "@/lib/businesses";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const business = getBusiness(slug);

  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    templateId?: unknown;
    serviceName?: unknown;
    campaignGoal?: unknown;
  };

  const templateId = typeof body.templateId === "string" ? body.templateId : "moments";
  const serviceName = typeof body.serviceName === "string" ? body.serviceName : business.services[0].name;
  const campaignGoal = typeof body.campaignGoal === "string" ? body.campaignGoal : "";

  return NextResponse.json({
    draft: createMarketingDraft(business, templateId, serviceName, campaignGoal),
    source: "mock-template"
  });
}
