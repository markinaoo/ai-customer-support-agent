import { notFound } from "next/navigation";
import { Download, Filter, Search } from "lucide-react";
import { DemoLabel } from "@/components/demo-label";
import { LeadStatusSelect } from "@/components/dashboard/lead-status-select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, Td, Th } from "@/components/ui/table";
import { getBusinessProfile, getDashboardLeads } from "@/lib/business-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function LeadsPage({ params }: PageProps) {
  const { slug } = await params;
  const business = await getBusinessProfile(slug);

  if (!business) {
    notFound();
  }

  const leads = await getDashboardLeads(slug);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-semibold">线索管理</h2>
            <DemoLabel />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {business.name} 的 AI 咨询线索会从 Supabase 实时读取，状态可在这里更新。
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" aria-hidden="true" />
            筛选
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" aria-hidden="true" />
            导出
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle>全部线索</CardTitle>
          <div className="relative w-full lg:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input className="pl-9" placeholder="搜索姓名、手机、微信、服务" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-[1180px]">
              <thead>
                <tr>
                  <Th>Date</Th>
                  <Th>Name</Th>
                  <Th>Phone</Th>
                  <Th>WeChat</Th>
                  <Th>Service needed</Th>
                  <Th>Preferred time</Th>
                  <Th>Customer message</Th>
                  <Th>AI summary</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <Td className="text-muted-foreground">{lead.createdAt}</Td>
                    <Td>{lead.name}</Td>
                    <Td>{lead.phone || "-"}</Td>
                    <Td>{lead.wechat || "-"}</Td>
                    <Td>{lead.serviceNeeded || "-"}</Td>
                    <Td>{lead.preferredTime || "-"}</Td>
                    <Td className="max-w-[240px] text-muted-foreground">{lead.customerMessage || "-"}</Td>
                    <Td className="max-w-[260px] text-muted-foreground">{lead.aiSummary || "-"}</Td>
                    <Td>
                      <LeadStatusSelect slug={slug} leadId={lead.id} initialStatus={lead.status} />
                    </Td>
                  </tr>
                ))}
                {leads.length === 0 ? (
                  <tr>
                    <Td colSpan={9} className="py-8 text-center text-muted-foreground">
                      暂无线索。到 AI 客服页留下姓名、电话/微信和预约时间后会出现在这里。
                    </Td>
                  </tr>
                ) : null}
              </tbody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
