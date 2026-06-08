import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BotMessageSquare, LayoutDashboard, Megaphone, QrCode, Store, UsersRound } from "lucide-react";
import { DemoLabel } from "@/components/demo-label";
import { PublicHeader } from "@/components/public-header";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { defaultDemoBusinessSlug, getBusiness } from "@/lib/businesses";
import { chatPath, dashboardPath, dashboardRoute, publicBusinessPath } from "@/lib/routes";

const slug = defaultDemoBusinessSlug;

const journey = [
  {
    title: "顾客看到商家主页",
    description: "服务、价格、营业时间、地址和FAQ集中展示。",
    href: publicBusinessPath(slug),
    icon: Store
  },
  {
    title: "顾客进入在线咨询",
    description: "先回答预约、价格、项目和到店问题。",
    href: chatPath(slug),
    icon: BotMessageSquare
  },
  {
    title: "老板查看总览",
    description: "查看访问、会话、线索和预约转化。",
    href: dashboardPath(slug),
    icon: LayoutDashboard
  },
  {
    title: "线索沉淀",
    description: "高意向用户进入可跟进列表。",
    href: dashboardRoute(slug, "leads"),
    icon: UsersRound
  },
  {
    title: "生成营销内容",
    description: "按服务项目生成朋友圈、小红书和社群文案。",
    href: dashboardRoute(slug, "marketing"),
    icon: Megaphone
  },
  {
    title: "部署到门店触点",
    description: "复制链接、二维码占位和Widget脚本占位。",
    href: dashboardRoute(slug, "deployment"),
    icon: QrCode
  }
];

export default function DemoPage() {
  const business = getBusiness(slug);

  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main>
        <section className="border-b border-border bg-card">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="teal">完整客户旅程</Badge>
                <DemoLabel />
              </div>
              <h1 className="mt-4 text-4xl font-semibold leading-tight">从一个AI商家链接，到线索、会话和营销闭环</h1>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                当前演示商家是 {business?.name}，行业为{business?.industry}。所有页面都通过 slug 路由组织，后续可以继续添加更多商家数据。
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={publicBusinessPath(slug)} className={buttonClasses({ variant: "primary" })}>
                  从顾客视角开始
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href={dashboardPath(slug)} className={buttonClasses({ variant: "outline" })}>
                  进入老板后台
                </Link>
              </div>
            </div>
            <Image
              src={business?.heroImage ?? "/images/hero-bella-hair.jpg"}
              alt={`${business?.name ?? "Demo商家"}门店内景`}
              width={1000}
              height={750}
              priority
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {journey.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link href={item.href} key={item.title} className="group">
                  <Card className="h-full transition group-hover:-translate-y-1 group-hover:shadow-md">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="font-mono text-sm text-muted-foreground">0{index + 1}</span>
                      </div>
                      <h2 className="mt-5 text-xl font-semibold">{item.title}</h2>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                      <div className="mt-5 flex items-center gap-2 text-sm font-medium text-primary">
                        打开页面
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
