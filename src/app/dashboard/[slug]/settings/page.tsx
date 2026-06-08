import { notFound } from "next/navigation";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { getBusinessProfile } from "@/lib/business-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SettingsPage({ params }: PageProps) {
  const { slug } = await params;
  const business = await getBusinessProfile(slug);

  if (!business) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">商家设置</h2>
        <p className="mt-1 text-sm text-muted-foreground">当前表单为Demo展示，保存按钮暂未写入数据库。</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_420px]">
        <Card>
          <CardHeader>
            <CardTitle>基础信息</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2 text-sm font-medium">
              商家名称
              <Input defaultValue={business.name} />
            </label>
            <label className="block space-y-2 text-sm font-medium">
              行业
              <Input defaultValue={business.industry} />
            </label>
            <label className="block space-y-2 text-sm font-medium md:col-span-2">
              地址
              <Input defaultValue={business.address} />
            </label>
            <label className="block space-y-2 text-sm font-medium">
              电话
              <Input defaultValue={business.phone} />
            </label>
            <label className="block space-y-2 text-sm font-medium">
              微信
              <Input defaultValue={business.wechat} />
            </label>
            <label className="block space-y-2 text-sm font-medium md:col-span-2">
              营业时间
              <Input defaultValue={business.openingHours} />
            </label>
            <label className="block space-y-2 text-sm font-medium md:col-span-2">
              商家简介
              <Textarea defaultValue={business.description} />
            </label>
            <div className="md:col-span-2">
              <Button>
                <Save className="h-4 w-4" aria-hidden="true" />
                保存设置
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI知识库预览</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">服务项目</p>
              <div className="mt-3 grid gap-2">
                {business.services.slice(0, 5).map((service) => (
                  <div key={service.name} className="flex justify-between gap-3 rounded-md border border-border px-3 py-2 text-sm">
                    <span>{service.name}</span>
                    <span className="text-muted-foreground">{service.price}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">FAQ</p>
              <div className="mt-3 grid gap-2">
                {business.faqs.slice(0, 3).map((faq) => (
                  <div key={faq.question} className="rounded-md border border-border px-3 py-2 text-sm">
                    <p>{faq.question}</p>
                    <p className="mt-1 text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
