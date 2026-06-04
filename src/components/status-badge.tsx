import { Badge } from "@/components/ui/badge";

export function LeadStatusBadge({ status }: { status: string }) {
  if (status === "已预约" || status === "已到店") {
    return <Badge tone="green">{status}</Badge>;
  }

  if (status === "待跟进" || status === "待人工跟进") {
    return <Badge tone="amber">{status}</Badge>;
  }

  if (status === "AI处理中") {
    return <Badge tone="teal">{status}</Badge>;
  }

  return <Badge>{status}</Badge>;
}
