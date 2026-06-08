"use client";

import { useState } from "react";
import { Copy, Loader2, Megaphone, WandSparkles } from "lucide-react";
import type { BusinessProfile } from "@/lib/businesses";
import type { GeneratedMarketingDraft } from "@/lib/deepseek";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";

type MarketingResponse = {
  drafts?: GeneratedMarketingDraft[];
  savedCount?: number;
  source?: string;
};

export function MarketingGenerator({ business }: { business: BusinessProfile }) {
  const [serviceName, setServiceName] = useState(business.services[1]?.name ?? business.services[0]?.name ?? "");
  const [campaignGoal, setCampaignGoal] = useState("提升本周体验课咨询和晚上预约");
  const [drafts, setDrafts] = useState<GeneratedMarketingDraft[]>([]);
  const [source, setSource] = useState("");
  const [savedCount, setSavedCount] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedChannel, setCopiedChannel] = useState("");

  async function generate() {
    setLoading(true);
    setCopiedChannel("");
    setError("");

    try {
      const response = await fetch(`/api/dashboard/${business.slug}/marketing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          serviceName,
          campaignGoal
        })
      });

      if (!response.ok) {
        throw new Error("Marketing API request failed");
      }

      const data = (await response.json()) as MarketingResponse;
      setDrafts(data.drafts ?? []);
      setSource(data.source ?? "");
      setSavedCount(data.savedCount ?? 0);
    } catch {
      setError("生成失败。请确认 DeepSeek 与 Supabase 环境变量已配置，或稍后重试。");
    } finally {
      setLoading(false);
    }
  }

  async function copyDraft(draft: GeneratedMarketingDraft) {
    const text = `${draft.channel}\n${draft.title}\n\n${draft.body}\n\n${draft.cta}`;
    await navigator.clipboard?.writeText(text);
    setCopiedChannel(draft.channel);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[380px_1fr]">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle>营销内容生成器</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">生成小红书、抖音和朋友圈文案，并保存到 Supabase</p>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary/25 text-[#72500d]">
              <Megaphone className="h-5 w-5" aria-hidden="true" />
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="block space-y-2 text-sm font-medium">
            主推服务
            <Select value={serviceName} onChange={(event) => setServiceName(event.target.value)}>
              {business.services.map((service) => (
                <option key={service.name} value={service.name}>
                  {service.name} {service.price}
                </option>
              ))}
            </Select>
          </label>
          <label className="block space-y-2 text-sm font-medium">
            本次目标
            <Input value={campaignGoal} onChange={(event) => setCampaignGoal(event.target.value)} />
          </label>
          <Button onClick={generate} disabled={loading} className="w-full">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <WandSparkles className="h-4 w-4" aria-hidden="true" />}
            生成三类文案
          </Button>
          {source ? <p className="text-sm text-muted-foreground">来源：{source}，已保存 {savedCount} 条草稿</p> : null}
          {error ? <p className="text-sm text-accent">{error}</p> : null}
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {drafts.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>生成结果</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">点击生成后会显示小红书笔记、抖音短视频脚本和微信朋友圈文案。</CardContent>
          </Card>
        ) : null}
        {drafts.map((draft) => (
          <Card key={draft.channel}>
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>{draft.channel}</CardTitle>
                  <p className="mt-1 text-sm font-medium">{draft.title}</p>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={() => void copyDraft(draft)}>
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  {copiedChannel === draft.channel ? "已复制" : "复制"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6">
              <p className="whitespace-pre-wrap text-muted-foreground">{draft.body}</p>
              <p className="font-medium">{draft.cta}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
