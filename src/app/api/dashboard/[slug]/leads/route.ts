import { NextResponse } from "next/server";
import { getBusinessProfile, getDashboardLeads, isLeadStatus, updateLeadStatus } from "@/lib/business-data";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const business = await getBusinessProfile(slug);

  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  return NextResponse.json({
    leads: await getDashboardLeads(slug)
  });
}

export async function PATCH(request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const business = await getBusinessProfile(slug);

  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  const body = (await request.json().catch(() => ({}))) as { leadId?: unknown; status?: unknown };
  const leadId = typeof body.leadId === "string" ? body.leadId : "";

  if (!leadId || !isLeadStatus(body.status)) {
    return NextResponse.json({ error: "leadId and valid status are required" }, { status: 400 });
  }

  try {
    const lead = await updateLeadStatus(leadId, body.status);
    return NextResponse.json({ lead });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to update lead" }, { status: 500 });
  }
}
