"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Eye, Image as ImageIcon, Rocket, Save, Upload } from "lucide-react";
import { LandingPageView } from "@/components/landing/landing-page-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Select, Textarea } from "@/components/ui/input";
import type { BusinessProfile } from "@/lib/businesses";
import {
  landingTemplateKeys,
  landingTemplates,
  landingThemeKeys,
  landingThemes,
  type LandingContent,
  type LandingPageConfig,
  type LandingSectionKey
} from "@/lib/landing-config";

type SaveMode = "draft" | "publish";

const sectionOptions: Array<{ key: LandingSectionKey; label: string; description: string }> = [
  { key: "proofMetrics", label: "顶部证明信息", description: "营业时间、主推项目、微信等快速信任点。" },
  { key: "painPoints", label: "客户痛点", description: "解释客户为什么需要先咨询。" },
  { key: "highlights", label: "服务亮点", description: "展示门店或系统承接能力。" },
  { key: "services", label: "服务项目", description: "展示可选择的主推项目和价格。" },
  { key: "journey", label: "咨询流程", description: "说明扫码、咨询、留资、跟进步骤。" },
  { key: "faqs", label: "FAQ", description: "提前回答客户常见问题。" }
];

export function LandingEditor({
  business,
  initialConfig
}: {
  business: BusinessProfile;
  initialConfig: LandingPageConfig;
}) {
  const [form, setForm] = useState<LandingPageConfig>(initialConfig);
  const [status, setStatus] = useState<string>(
    initialConfig.publishedAt ? `已发布：${formatDate(initialConfig.publishedAt)}` : "当前为自动生成草稿，发布后会写入 Supabase。"
  );
  const [saving, setSaving] = useState<SaveMode | null>(null);

  const selectedTemplate = landingTemplates[form.templateKey];
  const selectedTheme = landingThemes[form.themeKey];
  const previewConfig = useMemo(() => form, [form]);

  function updateField<K extends keyof LandingPageConfig>(key: K, value: LandingPageConfig[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateContent<K extends keyof LandingContent>(key: K, value: LandingContent[K]) {
    setForm((current) => ({
      ...current,
      content: {
        ...current.content,
        [key]: value
      }
    }));
  }

  function updateSection(key: LandingSectionKey, checked: boolean) {
    setForm((current) => ({
      ...current,
      content: {
        ...current.content,
        sectionVisibility: {
          ...current.content.sectionVisibility,
          [key]: checked
        }
      }
    }));
  }

  function toggleId(key: "featuredServiceIds" | "featuredFaqIds", id: string, checked: boolean) {
    setForm((current) => {
      const existing = current.content[key];
      const next = checked ? Array.from(new Set([...existing, id])) : existing.filter((item) => item !== id);

      return {
        ...current,
        content: {
          ...current.content,
          [key]: next
        }
      };
    });
  }

  async function handleSave(mode: SaveMode) {
    setSaving(mode);
    setStatus(mode === "publish" ? "正在发布落地页..." : "正在保存草稿...");

    try {
      const response = await fetch(`/api/dashboard/${business.slug}/landing`, {
        method: mode === "publish" ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
      const data = (await response.json().catch(() => ({}))) as { landing?: LandingPageConfig; error?: string };

      if (!response.ok || !data.landing) {
        throw new Error(data.error ?? "保存失败");
      }

      setForm(data.landing);
      setStatus(mode === "publish" ? "已发布，公共落地页和二维码会使用这版内容。" : "草稿已保存，发布前不会影响公共页面。");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "保存失败，请稍后重试。");
    } finally {
      setSaving(null);
    }
  }

  function handleImageUpload(file: File | undefined) {
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setStatus("请选择图片文件。");
      return;
    }

    if (file.size > 900 * 1024) {
      setStatus("图片超过 900KB。Demo 阶段请先压缩图片，正式版建议接入 Supabase Storage。");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateField("heroImage", reader.result);
        setStatus("图片已载入预览。保存草稿或发布后才会写入数据库。");
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="grid gap-4 2xl:grid-cols-[minmax(0,1fr)_minmax(420px,0.95fr)]">
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>页面模板</CardTitle>
            <CardDescription>先选结构和风格，再调整具体文案。模板只控制布局方向，不会让客户改坏页面。</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium">
              模板
              <Select
                value={form.templateKey}
                onChange={(event) => {
                  const templateKey = event.target.value as LandingPageConfig["templateKey"];
                  updateField("templateKey", templateKey);
                  updateField("themeKey", landingTemplates[templateKey].defaultThemeKey);
                }}
              >
                {landingTemplateKeys.map((key) => (
                  <option key={key} value={key}>
                    {landingTemplates[key].name}
                  </option>
                ))}
              </Select>
            </label>
            <label className="space-y-2 text-sm font-medium">
              风格
              <Select value={form.themeKey} onChange={(event) => updateField("themeKey", event.target.value as LandingPageConfig["themeKey"])}>
                {landingThemeKeys.map((key) => (
                  <option key={key} value={key}>
                    {landingThemes[key].name}
                  </option>
                ))}
              </Select>
            </label>
            <div className="rounded-md bg-muted p-4 text-sm text-muted-foreground md:col-span-2">
              <p className="font-medium text-foreground">{selectedTemplate.bestFor}</p>
              <p className="mt-1">{selectedTemplate.description}</p>
              <p className="mt-2">当前风格：{selectedTheme.description}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>首屏内容</CardTitle>
            <CardDescription>这是客户扫码后第一眼看到的内容，建议直接说明价值和行动按钮。</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <label className="space-y-2 text-sm font-medium">
              小标签
              <Input value={form.content.eyebrow} onChange={(event) => updateContent("eyebrow", event.target.value)} />
            </label>
            <label className="space-y-2 text-sm font-medium">
              主标题
              <Input value={form.content.headline} onChange={(event) => updateContent("headline", event.target.value)} />
            </label>
            <label className="space-y-2 text-sm font-medium">
              副标题
              <Textarea value={form.content.subheadline} onChange={(event) => updateContent("subheadline", event.target.value)} />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium">
                主按钮
                <Input value={form.content.primaryCta} onChange={(event) => updateContent("primaryCta", event.target.value)} />
              </label>
              <label className="space-y-2 text-sm font-medium">
                次按钮
                <Input value={form.content.secondaryCta} onChange={(event) => updateContent("secondaryCta", event.target.value)} />
              </label>
            </div>
            <label className="space-y-2 text-sm font-medium">
              Hero 图片路径 / URL
              <Input value={form.heroImage} onChange={(event) => updateField("heroImage", event.target.value)} placeholder="/images/hero-luna-fit.jpg" />
            </label>
            <label className="flex cursor-pointer flex-col gap-2 rounded-md border border-dashed border-border bg-muted/40 p-4 text-sm">
              <span className="flex items-center gap-2 font-medium">
                <Upload className="h-4 w-4" aria-hidden="true" />
                上传一张小图用于Demo预览
              </span>
              <span className="text-muted-foreground">限制 900KB；正式商业版建议接入 Supabase Storage。</span>
              <input type="file" accept="image/*" className="sr-only" onChange={(event) => handleImageUpload(event.target.files?.[0])} />
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>卖点和流程</CardTitle>
            <CardDescription>每行一条；亮点和证明信息使用“标题｜说明”的格式。</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <label className="space-y-2 text-sm font-medium">
              信任点
              <Textarea value={form.content.trustPoints.join("\n")} onChange={(event) => updateContent("trustPoints", linesToArray(event.target.value))} />
            </label>
            <label className="space-y-2 text-sm font-medium">
              客户痛点
              <Textarea value={form.content.painPoints.join("\n")} onChange={(event) => updateContent("painPoints", linesToArray(event.target.value))} />
            </label>
            <label className="space-y-2 text-sm font-medium">
              服务亮点
              <Textarea value={highlightsToText(form.content.highlights)} onChange={(event) => updateContent("highlights", textToHighlights(event.target.value))} />
            </label>
            <label className="space-y-2 text-sm font-medium">
              咨询流程
              <Textarea value={form.content.journey.join("\n")} onChange={(event) => updateContent("journey", linesToArray(event.target.value))} />
            </label>
            <label className="space-y-2 text-sm font-medium">
              顶部证明信息
              <Textarea value={metricsToText(form.content.proofMetrics)} onChange={(event) => updateContent("proofMetrics", textToMetrics(event.target.value))} />
            </label>
            <label className="space-y-2 text-sm font-medium">
              底部CTA
              <Textarea value={form.content.finalCta} onChange={(event) => updateContent("finalCta", event.target.value)} />
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>区块开关</CardTitle>
            <CardDescription>关闭不适合该客户的区块，保持页面短而清楚。</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {sectionOptions.map((section) => (
              <label key={section.key} className="flex gap-3 rounded-md border border-border p-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.content.sectionVisibility[section.key]}
                  onChange={(event) => updateSection(section.key, event.target.checked)}
                  className="mt-1 h-4 w-4 accent-primary"
                />
                <span>
                  <span className="block font-medium">{section.label}</span>
                  <span className="mt-1 block text-muted-foreground">{section.description}</span>
                </span>
              </label>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>展示服务和FAQ</CardTitle>
            <CardDescription>选择落地页优先展示的项目。客户仍可在咨询页继续问更多问题。</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium">服务项目</p>
              <div className="mt-3 grid gap-2">
                {business.services.map((service) => (
                  <label key={service.id} className="flex items-start gap-3 rounded-md border border-border px-3 py-2 text-sm">
                    <input
                      type="checkbox"
                      checked={form.content.featuredServiceIds.includes(service.id)}
                      onChange={(event) => toggleId("featuredServiceIds", service.id, event.target.checked)}
                      className="mt-1 h-4 w-4 accent-primary"
                    />
                    <span>
                      <span className="block font-medium">{service.name}</span>
                      <span className="text-muted-foreground">{service.price}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">FAQ</p>
              <div className="mt-3 grid gap-2">
                {business.faqs.map((faq) => (
                  <label key={faq.id} className="flex items-start gap-3 rounded-md border border-border px-3 py-2 text-sm">
                    <input
                      type="checkbox"
                      checked={form.content.featuredFaqIds.includes(faq.id)}
                      onChange={(event) => toggleId("featuredFaqIds", faq.id, event.target.checked)}
                      className="mt-1 h-4 w-4 accent-primary"
                    />
                    <span>{faq.question}</span>
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="sticky bottom-0 z-10 rounded-lg border border-border bg-card/95 p-4 shadow-lg backdrop-blur">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm text-muted-foreground">{status}</p>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" onClick={() => handleSave("draft")} disabled={Boolean(saving)}>
                <Save className="h-4 w-4" aria-hidden="true" />
                {saving === "draft" ? "保存中..." : "保存草稿"}
              </Button>
              <Button type="button" onClick={() => handleSave("publish")} disabled={Boolean(saving)}>
                <Rocket className="h-4 w-4" aria-hidden="true" />
                {saving === "publish" ? "发布中..." : "发布到落地页"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-0 space-y-3 2xl:sticky 2xl:top-4 2xl:self-start">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="flex items-center gap-2 font-semibold">
              <Eye className="h-4 w-4" aria-hidden="true" />
              实时预览
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">预览不会跳转，发布后客户看到同样的页面结构。</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {selectedTemplate.name}
          </span>
        </div>
        <div className="max-h-[calc(100vh-120px)] overflow-y-auto rounded-lg bg-background">
          <LandingPageView business={business} config={previewConfig} preview />
        </div>
        <div className="flex items-start gap-2 rounded-md bg-muted p-3 text-sm text-muted-foreground">
          <ImageIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>如果客户要更高级的页面，优先更换模板、主题、图片和文案；不要为每个客户单独写页面代码。</p>
        </div>
      </div>
    </div>
  );
}

function linesToArray(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function highlightsToText(items: LandingContent["highlights"]) {
  return items.map((item) => `${item.title}｜${item.description}`).join("\n");
}

function textToHighlights(value: string): LandingContent["highlights"] {
  return linesToArray(value)
    .map((line) => {
      const [title, ...descriptionParts] = line.split(/[｜|]/);
      return {
        title: title?.trim() ?? "",
        description: descriptionParts.join("｜").trim()
      };
    })
    .filter((item) => item.title && item.description);
}

function metricsToText(items: LandingContent["proofMetrics"]) {
  return items.map((item) => `${item.label}｜${item.value}`).join("\n");
}

function textToMetrics(value: string): LandingContent["proofMetrics"] {
  return linesToArray(value)
    .map((line) => {
      const [label, ...valueParts] = line.split(/[｜|]/);
      return {
        label: label?.trim() ?? "",
        value: valueParts.join("｜").trim()
      };
    })
    .filter((item) => item.label && item.value);
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}
