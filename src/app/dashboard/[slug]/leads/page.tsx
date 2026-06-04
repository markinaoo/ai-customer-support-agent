import { notFound } from "next/navigation";
import { Download, Filter, Search } from "lucide-react";
import { LeadStatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, Td, Th } from "@/components/ui/table";
import { getBusiness, getBusinessLeads } from "@/lib/businesses";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function LeadsPage({ params }: PageProps) {
  const { slug } = await params;
  const business = getBusiness(slug);

  if (!business) {
    notFound();
  }

  const scopedLeads = getBusinessLeads(slug);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">线索管理</h2>
          <p className="mt-1 text-sm text-muted-foreground">当前为Mock线索，后续可接入Supabase表。</p>
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
            <Input className="pl-9" placeholder="搜索姓名、手机号、意向" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <thead>
                <tr>
                  <Th>线索ID</Th>
                  <Th>顾客</Th>
                  <Th>来源</Th>
                  <Th>意向</Th>
                  <Th>状态</Th>
                  <Th>估算价值</Th>
                  <Th>创建时间</Th>
                </tr>
              </thead>
              <tbody>
                {scopedLeads.map((lead) => (
                  <tr key={lead.id}>
                    <Td className="font-mono text-xs text-muted-foreground">{lead.id}</Td>
                    <Td>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.phone}</p>
                    </Td>
                    <Td>{lead.source}</Td>
                    <Td>
                      <p>{lead.intent}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{lead.lastMessage}</p>
                    </Td>
                    <Td>
                      <LeadStatusBadge status={lead.status} />
                    </Td>
                    <Td>{lead.value}</Td>
                    <Td className="text-muted-foreground">{lead.createdAt}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
