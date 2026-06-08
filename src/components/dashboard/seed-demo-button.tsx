"use client";

import { useState } from "react";
import { Database, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SeedDemoButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function seedDemo() {
    const confirmed = window.confirm("确认将 LUNA FIT 示例门店数据写入 Supabase？");

    if (!confirmed) {
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/seed-demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          confirm: "seed-luna-fit"
        })
      });

      const data = (await response.json().catch(() => ({}))) as { seeded?: boolean; error?: string };

      if (!response.ok || !data.seeded) {
        throw new Error(data.error ?? "Seed failed");
      }

      setMessage("已写入 LUNA FIT 示例数据。");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "写入失败，请检查 Supabase 环境变量。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button type="button" variant="outline" size="sm" onClick={() => void seedDemo()} disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Database className="h-4 w-4" aria-hidden="true" />}
        写入 LUNA FIT 示例数据
      </Button>
      {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
    </div>
  );
}
