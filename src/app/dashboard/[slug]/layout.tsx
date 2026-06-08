import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/dashboard-shell";
import { getBusinessSlugs } from "@/lib/businesses";
import { getBusinessProfile } from "@/lib/business-data";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBusinessSlugs().map((slug) => ({ slug }));
}

export default async function BusinessDashboardLayout({ children, params }: LayoutProps) {
  const { slug } = await params;
  const business = await getBusinessProfile(slug);

  if (!business) {
    notFound();
  }

  return <DashboardShell business={business}>{children}</DashboardShell>;
}
