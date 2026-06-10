import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, HelpCircle, MapPin, MessageCircle, Sparkles, Store, UsersRound } from "lucide-react";
import { DemoLabel } from "@/components/demo-label";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { BusinessProfile } from "@/lib/businesses";
import { landingTemplates, landingThemes, type LandingPageConfig } from "@/lib/landing-config";
import { chatPath, publicBusinessPath } from "@/lib/routes";
import { cn } from "@/lib/utils";

export function LandingPageView({
  business,
  config,
  preview = false
}: {
  business: BusinessProfile;
  config: LandingPageConfig;
  preview?: boolean;
}) {
  const template = landingTemplates[config.templateKey];
  const theme = landingThemes[config.themeKey];
  const content = config.content;
  const services = getSelectedItems(business.services, content.featuredServiceIds).slice(0, 6);
  const faqs = getSelectedItems(business.faqs, content.featuredFaqIds).slice(0, 6);
  const heroHeight = preview ? "min-h-[420px] sm:min-h-[460px]" : "min-h-[74svh] sm:min-h-[86vh]";

  return (
    <main className={cn("bg-background", preview ? "rounded-lg border border-border" : "min-h-screen")}>
      <section className={cn("relative overflow-hidden", heroHeight)}>
        {/* eslint-disable-next-line @next/next/no-img-element -- Landing images can be local paths, demo uploads, or future storage URLs. */}
        <img
          src={config.heroImage || business.coverImage}
          alt={`${business.name} 服务环境`}
          className={cn("absolute inset-0 h-full w-full object-cover", getHeroObjectPositionClass(business.slug))}
        />
        <div className={cn("absolute inset-0", theme.heroOverlayClass)} />
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-black/55 to-transparent" />
        <div className={cn("relative mx-auto flex max-w-7xl items-end px-4 py-10 pb-12 sm:items-center sm:px-6 sm:py-14", heroHeight)}>
          <div className="max-w-3xl text-white">
            <div className="flex flex-wrap gap-2">
              <Badge className={theme.heroAccentClass}>{content.eyebrow}</Badge>
              <DemoLabel />
            </div>
            <h1 className={cn("mt-5 max-w-[15ch] font-semibold leading-[1.12] sm:max-w-3xl", preview ? "text-3xl sm:text-5xl" : "text-3xl sm:text-6xl")}>
              {content.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">{content.subheadline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LandingAction href={chatPath(business.slug)} preview={preview} variant="secondary">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                {content.primaryCta}
              </LandingAction>
              <LandingAction
                href={publicBusinessPath(business.slug)}
                preview={preview}
                variant="outline"
                className="border-white/30 bg-white/12 text-white hover:bg-white/20"
              >
                <Store className="h-5 w-5" aria-hidden="true" />
                {content.secondaryCta}
              </LandingAction>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/78">
              {content.trustPoints.map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-secondary" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 hidden px-4 pb-6 sm:block">
          <div className="mx-auto flex max-w-7xl items-end justify-between gap-4 text-white/80">
            <div className="grid gap-3 md:grid-cols-3">
              <HeroSignal icon={MapPin} label="门店" value={business.address} />
              <HeroSignal icon={Clock} label="营业时间" value={business.openingHours} />
              <HeroSignal icon={MessageCircle} label="微信咨询" value={business.wechat} />
            </div>
          </div>
        </div>
      </section>

      {content.sectionVisibility.proofMetrics ? (
        <section className={theme.statsBandClass}>
          <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:px-6 md:grid-cols-3">
            {content.proofMetrics.map((metric) => (
              <div key={metric.label} className="rounded-md border border-border/70 bg-white/70 p-4 shadow-sm">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="mt-1 text-lg font-semibold">{metric.value}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {content.sectionVisibility.painPoints ? (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
            <div>
              <Badge tone="amber">{template.labels.pain}</Badge>
              <h2 className="mt-4 text-3xl font-semibold">{template.labels.painTitle}</h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">落地页先处理客户犹豫点，再把真正有意向的人引导到在线咨询。</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {content.painPoints.map((item) => (
                <Card key={item} className="transition hover:-translate-y-0.5 hover:shadow-md">
                  <CardContent className="flex gap-3 p-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10">
                      <UsersRound className={cn("h-5 w-5", theme.iconClass)} aria-hidden="true" />
                    </span>
                    <p className="text-sm leading-6 text-muted-foreground">{item}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {content.sectionVisibility.highlights ? (
        <section className={theme.mutedBandClass}>
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <div className="max-w-2xl">
              <Badge tone="teal">{template.labels.highlights}</Badge>
              <h2 className="mt-4 text-3xl font-semibold">让客户快速相信，也方便门店跟进</h2>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {content.highlights.map((item, index) => (
                <Card key={item.title} className="overflow-hidden">
                  <div className="h-1 bg-primary/70" />
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <Sparkles className={cn("h-5 w-5", theme.iconClass)} aria-hidden="true" />
                      <span className="text-xs font-semibold text-muted-foreground">0{index + 1}</span>
                    </div>
                    <h3 className="mt-5 font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {content.sectionVisibility.services ? (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Badge tone="rose">{template.labels.services}</Badge>
              <h2 className="mt-4 text-3xl font-semibold">到店前先看清楚服务和价格</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">主推项目直接展示，减少反复问价，也让客户更容易选择要咨询的服务。</p>
            </div>
            <LandingAction href={chatPath(business.slug)} preview={preview} variant="outline">
              询问适合我的项目
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </LandingAction>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.id} className="transition hover:-translate-y-0.5 hover:shadow-md">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold">{service.name}</h3>
                    <span className="shrink-0 rounded-md bg-secondary/20 px-2 py-1 text-sm font-semibold text-[#72500d]">{service.price}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.description}</p>
                  {service.duration ? <p className="mt-3 text-xs text-muted-foreground">参考时长：{service.duration}</p> : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      {content.sectionVisibility.journey ? (
        <section className={theme.mutedBandClass}>
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <Badge tone="teal">{template.labels.journey}</Badge>
                <h2 className="mt-4 text-3xl font-semibold">{template.labels.journeyTitle}</h2>
              </div>
              <div className="grid flex-1 gap-3 sm:grid-cols-4">
                {content.journey.map((step, index) => (
                  <div key={step} className="rounded-md border border-border bg-card p-4 shadow-sm">
                    <p className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">0{index + 1}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {content.sectionVisibility.faqs ? (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <Badge tone="neutral">{template.labels.faqs}</Badge>
          <h2 className="mt-4 text-3xl font-semibold">客户常问的问题先回答</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <Card key={faq.id}>
                <CardContent className="p-5">
                  <div className="flex gap-3">
                    <HelpCircle className={cn("mt-0.5 h-5 w-5 shrink-0", theme.iconClass)} aria-hidden="true" />
                    <div>
                      <h3 className="font-semibold">{faq.question}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      <section className={theme.finalBandClass}>
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{content.finalCta}</h2>
            <p className="mt-2 text-sm text-muted-foreground">示例门店，仅用于功能演示。实际客户可替换图片、文案、服务、FAQ和按钮。</p>
          </div>
          <LandingAction href={chatPath(business.slug)} preview={preview} variant="primary">
            {content.primaryCta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </LandingAction>
        </div>
      </section>
    </main>
  );
}

function HeroSignal({
  icon: Icon,
  label,
  value
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-md border border-white/18 bg-white/12 px-4 py-3 backdrop-blur">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-xs text-white/60">{label}</p>
        <p className="mt-1 truncate text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  );
}

function getHeroObjectPositionClass(slug: string) {
  if (slug === "luna-fit") {
    return "object-[68%_center] sm:object-center";
  }

  if (slug === "bella-hair") {
    return "object-[58%_center] sm:object-center";
  }

  return "object-center";
}

function LandingAction({
  href,
  preview,
  variant,
  className,
  children
}: {
  href: string;
  preview: boolean;
  variant: "primary" | "secondary" | "outline";
  className?: string;
  children: React.ReactNode;
}) {
  const classes = buttonClasses({ variant, size: "lg", className });

  if (preview) {
    return <span className={classes}>{children}</span>;
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

function getSelectedItems<T extends { id: string }>(items: T[], selectedIds: string[]) {
  if (selectedIds.length === 0) {
    return items;
  }

  const selected = selectedIds.map((id) => items.find((item) => item.id === id)).filter((item): item is T => Boolean(item));
  return selected.length > 0 ? selected : items;
}
