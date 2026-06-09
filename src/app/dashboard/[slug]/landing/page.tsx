import { notFound } from "next/navigation";
import { DemoLabel } from "@/components/demo-label";
import { LandingEditor } from "@/components/dashboard/landing-editor";
import { getBusinessProfile } from "@/lib/business-data";
import { getEditorLandingConfig } from "@/lib/landing-pages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function LandingEditorPage({ params }: PageProps) {
  const { slug } = await params;
  const business = await getBusinessProfile(slug);

  if (!business) {
    notFound();
  }

  const landing = await getEditorLandingConfig(business);

  return (
    <div className="space-y-4">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-2xl font-semibold">落地页编辑</h2>
          <DemoLabel />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          用模板、主题和可编辑内容快速生成客户落地页。基础版可自动生成，高级需求通过这里调整，不需要单独写页面代码。
        </p>
      </div>
      <LandingEditor business={business} initialConfig={landing} />
    </div>
  );
}
