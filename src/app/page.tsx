import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BotMessageSquare,
  CheckCircle2,
  Clock3,
  LayoutDashboard,
  Megaphone,
  MessageCircle,
  QrCode,
  Sparkles,
  Store,
  UsersRound,
  WandSparkles
} from "lucide-react";
import { PublicHeader } from "@/components/public-header";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createMarketingDraft, defaultDemoBusinessSlug, getBusiness, getBusinessLeads } from "@/lib/businesses";
import { chatPath, dashboardPath, dashboardRoute, publicBusinessPath } from "@/lib/routes";

const painPoints = [
  {
    title: "顾客只问一句价格就走",
    description: "没人解释差异、服务价值和到店前需要确认的信息。"
  },
  {
    title: "忙的时候消息回不过来",
    description: "顾客从二维码、朋友圈、小红书进来，老板和员工很容易漏回。"
  },
  {
    title: "线索散在聊天记录里",
    description: "谁想预约、谁在比价、谁需要回访，没有一个清楚的列表。"
  },
  {
    title: "不会持续发营销内容",
    description: "活动、空档排班、服务介绍都想发，但每次写文案都很耗时间。"
  }
];

const systemActions = [
  {
    title: "AI自动接待咨询",
    description: "客户扫码后直接聊天，先回答营业时间、地址、服务、价格和预约问题。",
    icon: BotMessageSquare
  },
  {
    title: "处理价格异议",
    description: "不是只报低价，而是解释项目差异、时长、适合人群和最终确认方式。",
    icon: MessageCircle
  },
  {
    title: "收集高意向线索",
    description: "识别项目、到店时间、预算和联系方式，沉淀到老板看板。",
    icon: UsersRound
  },
  {
    title: "老板集中跟进",
    description: "看到来源、需求、状态和聊天摘要，知道今天先联系谁。",
    icon: LayoutDashboard
  },
  {
    title: "生成营销内容",
    description: "按服务项目生成朋友圈、小红书、社群活动通知等中文文案。",
    icon: Megaphone
  }
];

const journey = [
  {
    title: "扫码进入",
    description: "门店海报、桌牌、朋友圈、社群都能放同一个链接。",
    icon: QrCode
  },
  {
    title: "询问AI",
    description: "顾客直接问价格、项目、预约和到店问题。",
    icon: BotMessageSquare
  },
  {
    title: "留下联系方式",
    description: "AI把意向、预算、时间段和手机号整理成线索。",
    icon: UsersRound
  },
  {
    title: "老板跟进",
    description: "老板在看板里查看重点客户，继续邀约到店。",
    icon: Store
  }
];

const industries = [
  "美容美发",
  "皮肤管理",
  "美甲美睫",
  "餐饮咖啡",
  "教培体验课",
  "健身瑜伽",
  "家政维修",
  "门店零售",
  "摄影婚礼"
];

const pricing = [
  {
    name: "入门版",
    audience: "适合单店老板先跑通扫码咨询",
    items: ["AI商家主页", "AI客服页", "二维码入口", "基础线索列表"],
    note: "价格待定"
  },
  {
    name: "增长版",
    audience: "适合有稳定咨询量的门店",
    items: ["线索看板", "会话摘要", "营销内容生成", "多渠道来源记录"],
    note: "Demo推荐"
  },
  {
    name: "门店版",
    audience: "适合连锁、多员工、多门店管理",
    items: ["多商家链接", "员工跟进分配", "数据报表", "定制接入"],
    note: "联系演示"
  }
];

const faqs = [
  {
    question: "这个是给谁用的？",
    answer: "适合有线下门店、有咨询和预约需求的中国小商家，尤其是服务型门店。"
  },
  {
    question: "顾客需要下载App吗？",
    answer: "不需要。顾客通过链接或二维码进入页面，直接查看信息并咨询AI。"
  },
  {
    question: "AI会替老板成交吗？",
    answer: "当前定位是先接待、先解释、先收集线索，把高意向顾客交给老板继续跟进。"
  },
  {
    question: "可以改成我的行业和门店信息吗？",
    answer: "可以。系统按商家slug组织，后续只要新增商家资料、服务和FAQ即可扩展。"
  },
  {
    question: "现在接入微信、飞书或钉钉了吗？",
    answer: "这个Demo还没有接入真实消息平台，当前先展示完整业务链路。"
  },
  {
    question: "营销内容是真AI生成的吗？",
    answer: "当前是Demo模板生成，后续可接入真实大模型生成更贴合门店语气的内容。"
  }
];

export default function HomePage() {
  const demoSlug = defaultDemoBusinessSlug;
  const demoBusiness = getBusiness(demoSlug);

  if (!demoBusiness) {
    throw new Error("Seed demo business bella-hair is missing.");
  }

  const demoLeads = getBusinessLeads(demoSlug).slice(0, 3);
  const demoService = demoBusiness.services[3] ?? demoBusiness.services[0];
  const demoDraft = createMarketingDraft(demoBusiness, "moments", demoService.name, "本周预约");

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main>
        <section className="relative min-h-[78vh] overflow-hidden">
          <Image
            src="/images/hero-ai-growth-link.jpg"
            alt="美容美发门店客户咨询场景"
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 object-cover"
          />
          <div className="absolute inset-0 bg-[#14211f]/66" />
          <div className="relative mx-auto flex min-h-[78vh] max-w-7xl items-center px-4 py-16 sm:px-6">
            <div className="max-w-3xl text-white">
              <Badge tone="amber" className="border-white/30 bg-white/15 text-white">
                给中国小商家的AI咨询增长链接
              </Badge>
              <h1 className="mt-5 text-5xl font-semibold leading-[1.12] sm:text-6xl">AI商家增长链接</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/86">
                客户扫码就能咨询，AI自动回答、收集线索、处理价格异议、生成营销内容。让门店少漏消息，多留联系方式，多把咨询变成到店机会。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/demo" className={buttonClasses({ variant: "secondary", size: "lg" })}>
                  查看完整Demo
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                  href={chatPath(demoSlug)}
                  className={buttonClasses({
                    variant: "outline",
                    size: "lg",
                    className: "border-white/30 bg-white/12 text-white hover:bg-white/20"
                  })}
                >
                  体验扫码咨询
                </Link>
              </div>
              <div className="mt-8 grid max-w-2xl gap-3 text-sm text-white/82 sm:grid-cols-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-secondary" aria-hidden="true" />
                  适合服务型门店
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-secondary" aria-hidden="true" />
                  先用Demo跑通
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-secondary" aria-hidden="true" />
                  后续可接真实AI
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
            {["扫码即咨询", "自动答常见问题", "线索集中沉淀", "文案一键生成"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="max-w-2xl">
            <Badge tone="rose">老板真实痛点</Badge>
            <h2 className="mt-4 text-3xl font-semibold">不是没客户，是很多咨询没有被接住</h2>
            <p className="mt-4 text-muted-foreground">
              小商家最可惜的地方，是顾客已经有兴趣了，却因为回复慢、解释不清、没有记录，最后变成流失。
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {painPoints.map((item, index) => (
              <Card key={item.title}>
                <CardContent className="p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent/10 font-mono text-sm font-semibold text-accent">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-muted">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <Badge tone="teal">系统能做什么</Badge>
                <h2 className="mt-4 text-3xl font-semibold">一个链接，把咨询、线索、跟进和营销串起来</h2>
                <p className="mt-4 text-muted-foreground">
                  不需要先做复杂系统。先给门店一个能发出去、能被扫码、能接住咨询的增长入口。
                </p>
              </div>
              <Link href={publicBusinessPath(demoSlug)} className={buttonClasses({ variant: "outline" })}>
                查看商家主页样例
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {systemActions.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title}>
                    <CardContent className="p-5">
                      <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-5 font-semibold">{item.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="max-w-2xl">
            <Badge tone="amber">客户路径</Badge>
            <h2 className="mt-4 text-3xl font-semibold">扫码、咨询、留资、跟进，四步跑通</h2>
            <p className="mt-4 text-muted-foreground">把过去散落在不同聊天窗口里的咨询，变成老板能看见、能处理的线索。</p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {journey.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="relative">
                  <Card className="h-full">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <span className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary/25 text-[#72500d]">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="font-mono text-sm text-muted-foreground">0{index + 1}</span>
                      </div>
                      <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                  {index < journey.length - 1 ? (
                    <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-muted-foreground lg:block" aria-hidden="true" />
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-card">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <Badge tone="teal">老板看板预览</Badge>
              <h2 className="mt-4 text-3xl font-semibold">老板打开后台，就知道今天该跟进谁</h2>
              <p className="mt-4 text-muted-foreground">
                看访问、看会话、看线索、看预约状态。重点不是报表好看，而是让老板少漏掉能成交的人。
              </p>
              <Link href={dashboardPath(demoSlug)} className={buttonClasses({ variant: "primary", className: "mt-6" })}>
                打开老板看板
                <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="rounded-lg border border-border bg-background p-4 shadow-sm">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["今日咨询", "46"],
                  ["新线索", "12"],
                  ["待跟进", "5"]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-md border border-border bg-card p-4">
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="mt-2 text-3xl font-semibold">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-md border border-border bg-card">
                {demoLeads.map((lead) => (
                  <div key={lead.id} className="grid gap-2 border-b border-border px-4 py-3 last:border-b-0 sm:grid-cols-[90px_1fr_90px] sm:items-center">
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-muted-foreground">{lead.intent}</p>
                    <p className="text-sm text-primary">{lead.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary/25 text-[#72500d]">
                <WandSparkles className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold">营销内容生成器</p>
                <p className="text-sm text-muted-foreground">朋友圈 / 小红书 / 社群通知</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[`主推服务：${demoService.name}`, "目标：本周预约", "渠道：朋友圈"].map((item) => (
                <div key={item} className="rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-md border border-border bg-background p-4">
              <p className="font-semibold">{demoDraft.title}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {demoDraft.body}
              </p>
              <p className="mt-3 text-sm font-medium text-primary">{demoDraft.cta}</p>
            </div>
          </div>
          <div>
            <Badge tone="rose">营销预览</Badge>
            <h2 className="mt-4 text-3xl font-semibold">不用每次从零写文案，按项目直接生成</h2>
            <p className="mt-4 text-muted-foreground">
              老板只要选择服务项目和推广目标，就能快速拿到一版可修改、可发布的中文内容。
            </p>
            <Link href={dashboardRoute(demoSlug, "marketing")} className={buttonClasses({ variant: "outline", className: "mt-6" })}>
              查看营销生成器
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="bg-muted">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <div className="max-w-2xl">
              <Badge tone="teal">适合行业</Badge>
              <h2 className="mt-4 text-3xl font-semibold">越依赖咨询和预约的门店，越适合先用起来</h2>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry) => (
                <div key={industry} className="flex items-center gap-3 rounded-md border border-border bg-card px-4 py-3">
                  <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span className="font-medium">{industry}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Badge tone="amber">价格占位</Badge>
              <h2 className="mt-4 text-3xl font-semibold">先看Demo，后续按门店阶段选择套餐</h2>
              <p className="mt-4 text-muted-foreground">当前不做支付，只展示未来商业化包装方向。</p>
            </div>
            <Link href="/demo" className={buttonClasses({ variant: "primary" })}>
              预约看Demo
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {pricing.map((plan) => (
              <Card key={plan.name}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">{plan.name}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{plan.audience}</p>
                    </div>
                    <Badge tone={plan.note === "Demo推荐" ? "teal" : "neutral"}>{plan.note}</Badge>
                  </div>
                  <div className="mt-5 space-y-3">
                    {plan.items.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-card">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[360px_1fr]">
            <div>
              <Badge tone="rose">常见问题</Badge>
              <h2 className="mt-4 text-3xl font-semibold">老板最关心的几个问题</h2>
              <p className="mt-4 text-muted-foreground">这个版本先证明业务链路，真实上线前再接入更完整的数据、模型和渠道。</p>
            </div>
            <div className="grid gap-3">
              {faqs.map((faq) => (
                <Card key={faq.question}>
                  <CardContent className="p-5">
                    <h3 className="font-semibold">{faq.question}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="rounded-lg bg-[#14211f] px-5 py-10 text-white sm:px-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-secondary">
                <Clock3 className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium">先跑通一个美容美发Demo</span>
              </div>
              <h2 className="mt-4 text-3xl font-semibold">想看客户扫码到老板跟进的完整流程？</h2>
              <p className="mt-4 text-white/75">打开Demo后，可以从商家主页、AI客服、线索看板和营销生成器一路体验。</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 lg:mt-0">
              <Link href="/demo" className={buttonClasses({ variant: "secondary", size: "lg" })}>
                查看完整Demo
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href={chatPath(demoSlug)}
                className={buttonClasses({
                  variant: "outline",
                  size: "lg",
                  className: "border-white/30 bg-white/10 text-white hover:bg-white/20"
                })}
              >
                先试AI咨询
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
