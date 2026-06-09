import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import QRCode from "qrcode";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, CheckCircle2, Code2, MessageCircle, PlugZap, QrCode, Sparkles, Store } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { DemoLabel } from "@/components/demo-label";
import { SeedDemoButton } from "@/components/dashboard/seed-demo-button";
import { DownloadQrButton } from "@/components/download-qr-button";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBusinessProfile } from "@/lib/business-data";
import { getPublicLandingConfig } from "@/lib/landing-pages";
import { chatPath, landingPagePath, publicBusinessPath } from "@/lib/routes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const usagePlaces = ["微信朋友圈", "微信群", "小红书主页", "抖音主页", "美团/大众点评介绍", "高德地图商家介绍", "线下海报", "前台桌牌"];
const futureChannels = ["企业微信", "飞书", "钉钉", "微信客服"];

export const dynamic = "force-dynamic";

export default async function DeploymentPage({ params }: PageProps) {
  const { slug } = await params;
  const business = await getBusinessProfile(slug);

  if (!business) {
    notFound();
  }

  const landingConfig = await getPublicLandingConfig(business);
  const baseUrl = await getAppBaseUrl();
  const publicPath = publicBusinessPath(slug);
  const aiChatPath = chatPath(slug);
  const lpPath = landingPagePath(slug);
  const publicLink = `${baseUrl}${publicPath}`;
  const aiChatLink = `${baseUrl}${aiChatPath}`;
  const landingLink = `${baseUrl}${lpPath}`;
  const mainQrLink = landingConfig.qrTarget === "chat" ? aiChatLink : landingLink;
  const mainQrLabel = landingConfig.qrTarget === "chat" ? "在线咨询页" : "客户落地页";
  const widgetScript = `<script src="${baseUrl}/widget.js" data-business-slug="${slug}"></script>`;
  const qrSvg = await QRCode.toString(mainQrLink, {
    type: "svg",
    width: 260,
    margin: 2,
    color: {
      dark: "#14211f",
      light: "#ffffff"
    }
  });

  return (
    <div className="space-y-4">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-2xl font-semibold">部署与分享</h2>
          <DemoLabel />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          为 {business.name} 生成落地页、在线咨询、二维码和网站挂件占位。当前二维码仅用于功能演示。
        </p>
      </div>

      <div className="grid min-w-0 gap-4 xl:grid-cols-[1fr_360px]">
        <div className="min-w-0 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>可分享链接</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <LinkRow icon={Sparkles} label="客户落地页（主二维码）" href={lpPath} copyText={landingLink} />
              <LinkRow icon={MessageCircle} label="在线咨询页" href={aiChatPath} copyText={aiChatLink} />
              <LinkRow icon={Store} label="公共商家主页" href={publicPath} copyText={publicLink} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-primary" aria-hidden="true" />
                  <CardTitle>Website widget script 占位</CardTitle>
                </div>
                <CopyButton text={widgetScript} label="复制脚本" />
              </div>
            </CardHeader>
            <CardContent className="min-w-0">
              <pre className="max-w-full overflow-x-auto rounded-md border border-border bg-[#14211f] p-4 text-sm text-white">
                <code className="whitespace-pre-wrap break-all">{widgetScript}</code>
              </pre>
              <p className="mt-3 text-sm text-muted-foreground">当前仅展示嵌入脚本格式，后续接入真实 widget.js 后可放到门店官网或活动页。</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>建议投放位置</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2">
                {usagePlaces.map((place) => (
                  <div key={place} className="flex items-center gap-2 rounded-md border border-border bg-muted/40 px-3 py-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>{place}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {slug === "luna-fit" ? (
            <Card>
              <CardHeader>
                <CardTitle>Supabase 示例数据初始化</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  用于演示环境初始化 LUNA FIT 的 business、services、FAQs 和 landing_pages 数据。请先在 Supabase 执行 `supabase/schema.sql`。
                </p>
                <SeedDemoButton />
              </CardContent>
            </Card>
          ) : null}

          <Card>
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <PlugZap className="h-5 w-5 text-primary" aria-hidden="true" />
                  <CardTitle>高级渠道接入（后续版本）</CardTitle>
                </div>
                <Badge tone="neutral">占位展示</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2">
                {futureChannels.map((channel) => (
                  <div key={channel} className="rounded-md border border-dashed border-border p-3">
                    <p className="font-medium">{channel}</p>
                    <p className="mt-1 text-sm text-muted-foreground">后续接入真实消息通道与线索同步。</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle>主二维码</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">扫码进入{mainQrLabel}</p>
              </div>
              <Badge tone="teal">
                <QrCode className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
                演示用
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div
              className="mx-auto aspect-square w-full max-w-[260px] overflow-hidden rounded-lg border border-border bg-white p-3 [&_svg]:h-full [&_svg]:w-full"
              aria-label={`${business.name} ${mainQrLabel}二维码`}
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />
            <div className="mt-5 rounded-md bg-muted p-4 text-sm">
              <p className="font-medium">{business.name}</p>
              <p className="mt-1 break-all text-muted-foreground">{mainQrLink}</p>
              <p className="mt-2 text-xs text-muted-foreground">示例门店，仅用于功能演示</p>
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <DownloadQrButton svg={qrSvg} fileName={`${slug}-landing-demo-qr.svg`} />
              <CopyButton text={mainQrLink} label="复制二维码链接" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

async function getAppBaseUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, "");
  }

  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host");
  const host = (forwardedHost ?? requestHeaders.get("host") ?? "").split(",")[0].trim();

  if (!host) {
    return "https://yourdomain.com";
  }

  const forwardedProto = requestHeaders.get("x-forwarded-proto")?.split(",")[0].trim();
  const protocol = forwardedProto || (host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https");

  return `${protocol}://${host}`;
}

function LinkRow({
  icon: Icon,
  label,
  href,
  copyText
}: {
  icon: LucideIcon;
  label: string;
  href: string;
  copyText: string;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-3 rounded-md border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="font-medium">{label}</p>
          <p className="break-all text-sm text-muted-foreground sm:truncate">{copyText}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <CopyButton text={copyText} label="复制链接" iconOnly />
        <Link href={href} className={buttonClasses({ variant: "primary", size: "icon" })} title="打开链接">
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
