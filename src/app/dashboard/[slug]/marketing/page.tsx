import { notFound } from "next/navigation";
import { MarketingGenerator } from "@/components/marketing/marketing-generator";
import { getBusiness } from "@/lib/businesses";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function MarketingPage({ params }: PageProps) {
  const { slug } = await params;
  const business = getBusiness(slug);

  if (!business) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">营销内容</h2>
        <p className="mt-1 text-sm text-muted-foreground">按商家资料、服务和渠道模板生成中文推广内容。</p>
      </div>
      <MarketingGenerator business={business} />
    </div>
  );
}
