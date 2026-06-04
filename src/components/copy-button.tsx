"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CopyButton({
  text,
  label = "复制",
  iconOnly = false
}: {
  text: string;
  label?: string;
  iconOnly?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard?.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  const Icon = copied ? Check : Copy;

  return (
    <Button type="button" variant="outline" size={iconOnly ? "icon" : "sm"} onClick={handleCopy} title={label}>
      <Icon className="h-4 w-4" aria-hidden="true" />
      {iconOnly ? null : copied ? "已复制" : label}
    </Button>
  );
}
