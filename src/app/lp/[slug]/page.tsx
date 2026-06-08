import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, MessageCircle, Store, UsersRound } from "lucide-react";
import { DemoLabel } from "@/components/demo-label";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getClientLandingContent } from "@/lib/client-landing";
import { getBusinessProfile } from "@/lib/business-data";
import { getBusinessSlugs } from "@/lib/businesses";
import { chatPath, publicBusinessPath } from "@/lib/routes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBusinessSlugs().map((slug) => ({ slug }));
}

export default async function ClientLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const business = await getBusinessProfile(slug);

  if (!business) {
    notFound();
  }

  const landing = getClientLandingContent(business);

  return (
    <main className="min-h-screen bg-background">
      <section className="relative min-h-[82vh] overflow-hidden">
        <Image src={business.coverImage} alt={`${business.name} 服务环境`} fill priority sizes="100vw" className="absolute inset-0 object-cover" />
        <div className="absolute inset-0 bg-[#13211e]/68" />
        <div className="relative mx-auto flex min-h-[82vh] max-w-7xl items-center px-4 py-16 sm:px-6">
          <div className="max-w-3xl text-white">
            <div className="flex flex-wrap gap-2">
              <Badge tone="teal" className="border-white/30 bg-white/15 text-white">
                {landing.eyebrow}
              </Badge>
              <DemoLabel />
            </div>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.12] sm:text-6xl">{landing.headline}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/85">{landing.subheadline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={chatPath(business.slug)} className={buttonClasses({ variant: "secondary", size: "lg" })}>
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                {landing.primaryCta}
              </Link>
              <Link href={publicBusinessPath(business.slug)} className={buttonClasses({ variant: "outline", size: "lg", className: "border-white/30 bg-white/12 text-white hover:bg-white/20" })}>
                <Store className="h-5 w-5" aria-hidden="true" />
                {landing.secondaryCta}
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/78">
              {landing.trustPoints.map((item) => (
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
          {landing.proofMetrics.map((metric) => (
            <div key={metric.label}>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="mt-1 font-semibold">{metric.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
          <div>
            <Badge tone="amber">客户关心什么</Badge>
            <h2 className="mt-4 text-3xl font-semibold">先把顾虑说清楚</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {landing.painPoints.map((item) => (
              <Card key={item}>
                <CardContent className="flex gap-3 p-5">
                  <UsersRound className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  <p className="text-sm leading-6 text-muted-foreground">{item}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <Badge tone="teal">门店怎么承接</Badge>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {landing.highlights.map((item) => (
              <Card key={item.title}>
                <CardContent className="p-5">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Badge tone="rose">咨询流程</Badge>
            <h2 className="mt-4 text-3xl font-semibold">从扫码到跟进</h2>
          </div>
          <div className="grid flex-1 gap-3 sm:grid-cols-4">
            {landing.journey.map((step, index) => (
              <div key={step} className="rounded-md border border-border bg-card p-4">
                <p className="text-sm font-semibold text-primary">0{index + 1}</p>
                <p className="mt-2 text-sm text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{landing.finalCta}</h2>
            <p className="mt-2 text-sm text-muted-foreground">示例门店，仅用于功能演示。实际客户可替换图片、文案、服务和按钮。</p>
          </div>
          <Link href={chatPath(business.slug)} className={buttonClasses({ variant: "primary" })}>
            {landing.primaryCta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
