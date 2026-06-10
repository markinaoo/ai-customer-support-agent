import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Clock, HelpCircle, MapPin, MessageCircle, Phone, Sparkles, Store } from "lucide-react";
import { DemoLabel } from "@/components/demo-label";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBusinessSlugs } from "@/lib/businesses";
import { getBusinessProfile } from "@/lib/business-data";
import { chatPath, dashboardPath, landingPagePath } from "@/lib/routes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBusinessSlugs().map((slug) => ({ slug }));
}

export default async function BusinessProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const business = await getBusinessProfile(slug);

  if (!business) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="business-hero relative min-h-[66svh] overflow-hidden sm:min-h-[78vh]" data-business-slug={business.slug}>
        <Image src={business.heroImage} alt={`${business.name} 服务场景`} fill priority sizes="100vw" className="absolute inset-0 object-cover" />
        <div className="absolute inset-0 bg-[#14211f]/64" />
        <div className="absolute inset-x-0 top-0 h-36 bg-linear-to-b from-black/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-black/55 to-transparent" />
        <div className="relative mx-auto flex min-h-[66svh] max-w-7xl items-end px-4 py-10 pb-12 sm:min-h-[78vh] sm:items-center sm:px-6 sm:py-16">
          <div className="max-w-3xl text-white">
            <div className="flex flex-wrap gap-2">
              <Badge tone="amber" className="border-white/30 bg-white/15 text-white">
                {business.industry}
              </Badge>
              <Badge tone="teal" className="border-white/30 bg-white/15 text-white">
                门店主页
              </Badge>
              <DemoLabel />
            </div>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.12] sm:text-6xl">{business.name}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/86 sm:text-lg sm:leading-8">{business.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={chatPath(business.slug)} className={buttonClasses({ variant: "secondary", size: "lg" })}>
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                在线咨询
              </Link>
              <Link href={landingPagePath(business.slug)} className={buttonClasses({ variant: "outline", size: "lg", className: "border-white/30 bg-white/12 text-white hover:bg-white/20" })}>
                <Sparkles className="h-5 w-5" aria-hidden="true" />
                查看落地页
              </Link>
              <a href={`tel:${business.phone}`} className={buttonClasses({ variant: "outline", size: "lg", className: "border-white/30 bg-white/12 text-white hover:bg-white/20" })}>
                <Phone className="h-5 w-5" aria-hidden="true" />
                电话咨询
              </a>
            </div>
            <div className="mt-8 grid max-w-2xl gap-3 text-sm text-white/78 sm:grid-cols-3">
              {["项目清楚", "价格先了解", "到店前可咨询"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-secondary" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:px-6 md:grid-cols-3">
          <div className="flex gap-3 rounded-md border border-border/70 bg-white p-4 shadow-sm">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="font-medium">门店地址</p>
              <p className="mt-1 text-sm text-muted-foreground">{business.address}</p>
            </div>
          </div>
          <div className="flex gap-3 rounded-md border border-border/70 bg-white p-4 shadow-sm">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="font-medium">营业时间</p>
              <p className="mt-1 text-sm text-muted-foreground">{business.openingHours}</p>
            </div>
          </div>
          <div className="flex gap-3 rounded-md border border-border/70 bg-white p-4 shadow-sm">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="font-medium">微信</p>
              <p className="mt-1 text-sm text-muted-foreground">{business.wechat}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge tone="teal">服务价目</Badge>
            <h2 className="mt-4 text-3xl font-semibold">热门项目</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">把项目、价格和参考时长展示清楚，客户进入咨询前就能先判断是否适合。</p>
          </div>
          <Link href={chatPath(business.slug)} className={buttonClasses({ variant: "outline" })}>
            问问在线顾问
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {business.services.map((service) => (
            <Card key={service.name} className="overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="h-1 bg-primary/70" />
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
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[420px_1fr]">
          <div>
            <Badge tone="rose">FAQ</Badge>
            <h2 className="mt-4 text-3xl font-semibold">顾客常见问题</h2>
            <p className="mt-4 text-muted-foreground">到店前先回答价格、时间、预约和适合度问题，客户会更愿意留下联系方式。</p>
            <Link href={chatPath(business.slug)} className={buttonClasses({ variant: "primary", className: "mt-6" })}>
              继续在线咨询
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-3">
            {business.faqs.map((faq) => (
              <Card key={faq.question} className="shadow-sm">
                <CardContent className="p-5">
                  <div className="flex gap-3">
                    <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <h3 className="font-semibold">{faq.question}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1fr_360px]">
            <div className="p-6 sm:p-8">
              <Badge tone="teal">Demo预览</Badge>
              <h2 className="mt-4 text-2xl font-semibold">同一套商家资料，可以生成主页、落地页和咨询入口</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">向客户演示时，可以先看门店主页，再打开更偏转化的落地页，最后进入在线咨询和后台线索。</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link href={landingPagePath(business.slug)} className={buttonClasses({ variant: "primary" })}>
                  查看营销落地页
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href={dashboardPath(business.slug)} className={buttonClasses({ variant: "outline" })}>
                  打开老板后台
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="bg-primary p-6 text-primary-foreground sm:p-8">
              <Store className="h-8 w-8" aria-hidden="true" />
              <p className="mt-5 text-sm text-primary-foreground/75">当前示例门店</p>
              <p className="mt-1 text-xl font-semibold">{business.name}</p>
              <p className="mt-4 text-sm leading-6 text-primary-foreground/80">{business.industry} · {business.wechat}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
