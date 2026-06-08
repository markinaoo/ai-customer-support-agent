import { notFound } from "next/navigation";
import { DemoLabel } from "@/components/demo-label";
import { MarketingGenerator } from "@/components/marketing/marketing-generator";
import { getBusinessProfile } from "@/lib/business-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function MarketingPage({ params }: PageProps) {
  const { slug } = await params;
  const business = await getBusinessProfile(slug);

  if (!business) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-2xl font-semibold">营销内容</h2>
          <DemoLabel />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">使用 DeepSeek 生成营销草稿，并保存到 Supabase。</p>
      </div>
      <MarketingGenerator business={business} />
    </div>
  );
}
