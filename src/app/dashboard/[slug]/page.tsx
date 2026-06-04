import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BotMessageSquare, CalendarCheck, Clock3, Eye, UsersRound } from "lucide-react";
import { MetricCard } from "@/components/metric-card";
import { LeadStatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, Td, Th } from "@/components/ui/table";
import { getBusiness, getBusinessConversations, getBusinessLeads, getBusinessMetrics } from "@/lib/businesses";
import { dashboardRoute } from "@/lib/routes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DashboardOverviewPage({ params }: PageProps) {
  const { slug } = await params;
  const business = getBusiness(slug);

  if (!business) {
    notFound();
  }

  const metrics = getBusinessMetrics(slug);
  const scopedLeads = getBusinessLeads(slug);
  const scopedConversations = getBusinessConversations(slug);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="主页访问" value={metrics.profileViews} helper="近30天公共主页访问量" icon={Eye} />
        <MetricCard label="AI会话" value={metrics.chatSessions} helper="包含聊天页和嵌入Widget" icon={BotMessageSquare} />
        <MetricCard label="新线索" value={metrics.newLeads} helper="Demo中已识别的高意向客户" icon={UsersRound} />
        <MetricCard label="预约/到店" value={metrics.booked} helper={`转化率 ${metrics.conversionRate}`} icon={CalendarCheck} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <div>
              <CardTitle>最新线索</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">按创建时间排序</p>
            </div>
            <Link href={dashboardRoute(slug, "leads")} className={buttonClasses({ variant: "outline", size: "sm" })}>
              查看全部
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <thead>
                  <tr>
                    <Th>顾客</Th>
                    <Th>意向</Th>
                    <Th>状态</Th>
                    <Th>时间</Th>
                  </tr>
                </thead>
                <tbody>
                  {scopedLeads.slice(0, 3).map((lead) => (
                    <tr key={lead.id}>
                      <Td>
                        <p className="font-medium">{lead.name}</p>
                        <p className="text-xs text-muted-foreground">{lead.phone}</p>
                      </Td>
                      <Td>{lead.intent}</Td>
                      <Td>
                        <LeadStatusBadge status={lead.status} />
                      </Td>
                      <Td className="text-muted-foreground">{lead.createdAt}</Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>今日待办</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">根据Mock会话生成</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "联系张女士确认周六染发排班",
              "给王女士发送中长发烫发价格区间",
              "把本周空档发到老客微信群"
            ].map((task, index) => (
              <div key={task} className="flex gap-3 rounded-md border border-border p-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted font-mono text-xs">
                  {index + 1}
                </span>
                <p className="text-sm">{task}</p>
              </div>
            ))}
            <div className="rounded-md bg-primary/10 p-4 text-sm text-primary">
              平均AI回复时间：{metrics.avgReplyTime}。真实上线后可接入模型、消息渠道和CRM跟进状态。
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-3">
          <div>
            <CardTitle>最新会话摘要</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">AI先接待，老板接管高意向咨询</p>
          </div>
          <Badge tone="teal">{scopedConversations.length} 条</Badge>
        </CardHeader>
        <CardContent className="grid gap-3 lg:grid-cols-3">
          {scopedConversations.map((conversation) => (
            <div key={conversation.id} className="rounded-md border border-border p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{conversation.customer}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{conversation.intent}</p>
                </div>
                <Clock3 className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{conversation.summary}</p>
              <p className="mt-4 text-xs text-muted-foreground">{conversation.updatedAt}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
