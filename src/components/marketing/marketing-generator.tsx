"use client";

import { useState } from "react";
import { Copy, Loader2, Megaphone, WandSparkles } from "lucide-react";
import type { BusinessProfile } from "@/lib/businesses";
import { createMarketingDraft, marketingTemplates } from "@/lib/businesses";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Select, Textarea } from "@/components/ui/input";

type MarketingResult = {
  title: string;
  body: string;
  cta: string;
};

export function MarketingGenerator({ business }: { business: BusinessProfile }) {
  const [templateId, setTemplateId] = useState(marketingTemplates[0].id);
  const [serviceName, setServiceName] = useState(business.services[3]?.name ?? business.services[0].name);
  const [campaignGoal, setCampaignGoal] = useState("本周染烫护理预约");
  const [result, setResult] = useState<MarketingResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generate() {
    setLoading(true);
    setCopied(false);
    setError("");

    try {
      const response = await fetch(`/api/marketing/${business.slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          templateId,
          serviceName,
          campaignGoal
        })
      });

      if (!response.ok) {
        throw new Error("Marketing API request failed");
      }

      const data = (await response.json()) as { draft?: MarketingResult };
      setResult(data.draft ?? null);
    } catch {
      setResult(createMarketingDraft(business, templateId, serviceName, campaignGoal));
      setError("网络请求失败，已使用本地Demo模板生成。");
    } finally {
      setLoading(false);
    }
  }

  async function copyResult() {
    if (!result) return;
    const text = `${result.title}\n\n${result.body}\n\n${result.cta}`;
    await navigator.clipboard?.writeText(text);
    setCopied(true);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[380px_1fr]">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle>营销内容生成器</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">Demo模式使用本地模板生成</p>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary/25 text-[#72500d]">
              <Megaphone className="h-5 w-5" aria-hidden="true" />
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="block space-y-2 text-sm font-medium">
            内容类型
            <Select value={templateId} onChange={(event) => setTemplateId(event.target.value)}>
              {marketingTemplates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </Select>
          </label>
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
            生成文案
          </Button>
          {error ? <p className="text-sm text-accent">{error}</p> : null}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>生成结果</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">标题、正文和行动引导可直接编辑</p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={copyResult} disabled={!result}>
              <Copy className="h-4 w-4" aria-hidden="true" />
              {copied ? "已复制" : "复制"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input value={result?.title ?? ""} readOnly placeholder="生成后显示标题" />
          <Textarea value={result?.body ?? ""} readOnly placeholder="生成后显示正文" className="min-h-[320px]" />
          <Input value={result?.cta ?? ""} readOnly placeholder="生成后显示行动引导" />
        </CardContent>
      </Card>
    </div>
  );
}
