import { notFound } from "next/navigation";
import { LandingPageView } from "@/components/landing/landing-page-view";
import { getBusinessProfile } from "@/lib/business-data";
import { getBusinessSlugs } from "@/lib/businesses";
import { getPublicLandingConfig } from "@/lib/landing-pages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getBusinessSlugs().map((slug) => ({ slug }));
}

export default async function ClientLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const business = await getBusinessProfile(slug);

  if (!business) {
    notFound();
  }

  const config = await getPublicLandingConfig(business);

  return <LandingPageView business={business} config={config} />;
}
