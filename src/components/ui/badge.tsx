import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "teal" | "amber" | "rose" | "neutral" | "green";

const tones: Record<BadgeTone, string> = {
  teal: "border-primary/20 bg-primary/10 text-primary",
  amber: "border-secondary/30 bg-secondary/20 text-[#72500d]",
  rose: "border-accent/20 bg-accent/10 text-accent",
  neutral: "border-border bg-muted text-muted-foreground",
  green: "border-emerald-200 bg-emerald-50 text-emerald-700"
};

export function Badge({
  className,
  tone = "neutral",
  ...props
}: HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
}) {
  return (
    <span
      className={cn("inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium", tones[tone], className)}
      {...props}
    />
  );
}
