import { NextResponse } from "next/server";
import { getBusinessProfile } from "@/lib/business-data";
import { isSupabaseConfigured } from "@/lib/supabase-server";

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
    business,
    source: isSupabaseConfigured() ? "supabase-or-fallback" : "local-fallback",
    demoLabel: "示例门店，仅用于功能演示"
  });
}
