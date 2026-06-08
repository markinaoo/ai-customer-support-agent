import { NextResponse } from "next/server";
import { getBusinessIdBySlug } from "@/lib/business-data";
import { requireSupabaseAdmin } from "@/lib/supabase-server";

type CreateLeadBody = {
  businessSlug?: unknown;
  business_id?: unknown;
  name?: unknown;
  phone?: unknown;
  wechat?: unknown;
  service_needed?: unknown;
  preferred_time?: unknown;
  customer_message?: unknown;
  ai_summary?: unknown;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as CreateLeadBody;
  const supabase = requireSupabaseAdmin();
  const businessId =
    typeof body.business_id === "string" && body.business_id
      ? body.business_id
      : typeof body.businessSlug === "string"
        ? await getBusinessIdBySlug(body.businessSlug)
        : null;

  if (!businessId) {
    return NextResponse.json({ error: "Business is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("leads")
    .insert({
      business_id: businessId,
      name: toOptionalString(body.name),
      phone: toOptionalString(body.phone),
      wechat: toOptionalString(body.wechat),
      service_needed: toOptionalString(body.service_needed),
      preferred_time: toOptionalString(body.preferred_time),
      customer_message: toOptionalString(body.customer_message),
      ai_summary: toOptionalString(body.ai_summary),
      status: "New"
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ lead: data });
}

function toOptionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}
