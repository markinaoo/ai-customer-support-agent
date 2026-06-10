import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import { getAppBaseUrl } from "@/lib/app-url";
import { getBusinessProfile } from "@/lib/business-data";
import type { BusinessProfile } from "@/lib/businesses";
import { getPublicLandingConfig } from "@/lib/landing-pages";
import { chatPath, landingPagePath, publicBusinessPath } from "@/lib/routes";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const business = await getBusinessProfile(slug);

  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  const link = await resolveQrLink(request, business, slug);
  const svg = await QRCode.toString(link, {
    type: "svg",
    width: 720,
    margin: 2,
    color: {
      dark: "#14211f",
      light: "#ffffff"
    }
  });

  return new NextResponse(svg, {
    headers: getQrHeaders(link)
  });
}

export async function HEAD(request: NextRequest, context: RouteContext) {
  const { slug } = await context.params;
  const business = await getBusinessProfile(slug);

  if (!business) {
    return new NextResponse(null, {
      status: 404,
      headers: {
        "Cache-Control": "no-store"
      }
    });
  }

  const link = await resolveQrLink(request, business, slug);

  return new NextResponse(null, {
    headers: getQrHeaders(link)
  });
}

async function resolveQrLink(request: NextRequest, business: BusinessProfile, slug: string) {
  const target = request.nextUrl.searchParams.get("target");
  const landingConfig = await getPublicLandingConfig(business);
  const baseUrl = await getAppBaseUrl();
  const fallbackTarget = landingConfig.qrTarget === "chat" ? "chat" : "landing";
  const normalizedTarget = target === "chat" || target === "business" || target === "landing" ? target : fallbackTarget;
  const path =
    normalizedTarget === "chat"
      ? chatPath(slug)
      : normalizedTarget === "business"
        ? publicBusinessPath(slug)
        : landingPagePath(slug);

  return `${baseUrl}${path}`;
}

function getQrHeaders(link: string) {
  return {
    "Content-Type": "image/svg+xml; charset=utf-8",
    "Cache-Control": "no-store",
    "X-QR-Target": link
  };
}
