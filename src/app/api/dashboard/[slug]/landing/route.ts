import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getBusinessProfile } from "@/lib/business-data";
import { normalizeLandingConfig, type LandingPageConfig } from "@/lib/landing-config";
import { getEditorLandingConfig, publishLandingPage, saveLandingDraft, type LandingPageInput } from "@/lib/landing-pages";
import { landingPagePath } from "@/lib/routes";

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
    landing: await getEditorLandingConfig(business)
  });
}

export async function PATCH(request: Request, context: RouteContext) {
  return persistLanding(request, context, "draft");
}

export async function POST(request: Request, context: RouteContext) {
  return persistLanding(request, context, "publish");
}

async function persistLanding(request: Request, context: RouteContext, mode: "draft" | "publish") {
  const { slug } = await context.params;
  const business = await getBusinessProfile(slug);

  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  const body = (await request.json().catch(() => ({}))) as Partial<LandingPageConfig>;
  const normalized = normalizeLandingConfig(business, { ...body, source: "database" });
  const input: LandingPageInput = {
    templateKey: normalized.templateKey,
    themeKey: normalized.themeKey,
    heroImage: normalized.heroImage,
    qrTarget: normalized.qrTarget,
    content: normalized.content
  };

  try {
    const landing = mode === "publish" ? await publishLandingPage(business, input) : await saveLandingDraft(business, input);

    if (mode === "publish") {
      revalidatePath(landingPagePath(slug));
    }

    return NextResponse.json({
      saved: true,
      published: mode === "publish",
      landing
    });
  } catch (error) {
    return NextResponse.json(
      {
        saved: false,
        error: error instanceof Error ? error.message : "Failed to save landing page"
      },
      { status: 500 }
    );
  }
}
