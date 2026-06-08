import { Badge } from "@/components/ui/badge";
import { demoStoreLabel } from "@/lib/demo";

export function DemoLabel() {
  return <Badge tone="amber">{demoStoreLabel}</Badge>;
}
