import { NextResponse } from "next/server";
import { seedLunaFitDemo } from "@/lib/demo-seed";

type SeedBody = {
  confirm?: unknown;
};

export async function POST(request: Request) {
  const configuredToken = process.env.ADMIN_SEED_TOKEN;
  const authorization = request.headers.get("authorization") ?? "";

  if (configuredToken && authorization !== `Bearer ${configuredToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as SeedBody;

  if (body.confirm !== "seed-luna-fit") {
    return NextResponse.json({ error: "Send confirm: seed-luna-fit to seed the fictional demo store." }, { status: 400 });
  }

  try {
    const result = await seedLunaFitDemo();

    return NextResponse.json({
      seeded: true,
      result,
      demoLabel: "示例门店，仅用于功能演示"
    });
  } catch (error) {
    return NextResponse.json(
      {
        seeded: false,
        error: error instanceof Error ? error.message : "Seed failed",
        hint: "Make sure Supabase env vars are set and run supabase/schema.sql first."
      },
      { status: 500 }
    );
  }
}
