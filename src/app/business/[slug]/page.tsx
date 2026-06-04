import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBusiness, getBusinessSlugs } from "@/lib/businesses";
import { chatPath, dashboardPath } from "@/lib/routes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBusinessSlugs().map((slug) => ({ slug }));
}

export default async function BusinessProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const business = getBusiness(slug);

  if (!business) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="relative min-h-[76vh] overflow-hidden">
        <Image src={business.heroImage} alt={`${business.name} 服务场景`} fill priority sizes="100vw" className="absolute inset-0 object-cover" />
        <div className="absolute inset-0 bg-[#14211f]/62" />
        <div className="relative mx-auto flex min-h-[76vh] max-w-7xl items-center px-4 py-16 sm:px-6">
          <div className="max-w-3xl text-white">
            <div className="flex flex-wrap gap-2">
              <Badge tone="amber" className="border-white/30 bg-white/15 text-white">
                {business.industry}
              </Badge>
              <Badge tone="teal" className="border-white/30 bg-white/15 text-white">
                AI商家主页
              </Badge>
            </div>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.12] sm:text-6xl">{business.name}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/86">{business.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={chatPath(business.slug)} className={buttonClasses({ variant: "secondary", size: "lg" })}>
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                咨询AI客服
              </Link>
              <a href={`tel:${business.phone}`} className={buttonClasses({ variant: "outline", size: "lg", className: "border-white/30 bg-white/12 text-white hover:bg-white/20" })}>
                <Phone className="h-5 w-5" aria-hidden="true" />
                电话咨询
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:px-6 md:grid-cols-3">
          <div className="flex gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="font-medium">门店地址</p>
              <p className="mt-1 text-sm text-muted-foreground">{business.address}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="font-medium">营业时间</p>
              <p className="mt-1 text-sm text-muted-foreground">{business.openingHours}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="font-medium">微信</p>
              <p className="mt-1 text-sm text-muted-foreground">{business.wechat}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge tone="teal">服务价目</Badge>
            <h2 className="mt-4 text-3xl font-semibold">热门项目</h2>
          </div>
          <Link href={chatPath(business.slug)} className={buttonClasses({ variant: "outline" })}>
            问问AI客服
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {business.services.map((service) => (
            <Card key={service.name}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold">{service.name}</h3>
                  <span className="shrink-0 rounded-md bg-secondary/25 px-2 py-1 text-sm font-semibold text-[#72500d]">{service.price}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.description}</p>
                <p className="mt-4 text-xs text-muted-foreground">预计时长：{service.duration}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[420px_1fr]">
          <div>
            <Badge tone="rose">FAQ</Badge>
            <h2 className="mt-4 text-3xl font-semibold">顾客常见问题</h2>
            <p className="mt-4 text-muted-foreground">这些问答会作为AI客服的基础知识，后续可接入商家知识库和历史会话持续更新。</p>
          </div>
          <div className="grid gap-3">
            {business.faqs.map((faq) => (
              <Card key={faq.question}>
                <CardContent className="p-5">
                  <h3 className="font-semibold">{faq.question}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">商家运营视角</h2>
          <p className="mt-2 text-muted-foreground">老板可以进入后台查看线索、会话和营销工具。</p>
        </div>
        <Link href={dashboardPath(business.slug)} className={buttonClasses({ variant: "primary" })}>
          打开老板后台
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
