import Link from "next/link";
import { notFound } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Code2, MessageCircle, QrCode, Store } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBusiness } from "@/lib/businesses";
import { chatPath, publicBusinessPath } from "@/lib/routes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const qrActiveCells = new Set([
  0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 13, 16, 18, 20, 22, 24, 26, 27, 28, 31, 34, 36, 37, 38, 39, 40, 42, 44, 45, 48, 49, 51,
  53, 55, 56, 58, 60, 61, 63, 64, 65, 67, 69, 72, 73, 74, 76, 78, 79, 80
]);

export default async function DeploymentPage({ params }: PageProps) {
  const { slug } = await params;
  const business = getBusiness(slug);

  if (!business) {
    notFound();
  }

  const publicLink = publicBusinessPath(slug);
  const aiChatLink = chatPath(slug);
  const widgetScript = `<script src="/widget.js" data-business="${slug}" defer></script>`;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">部署与分享</h2>
        <p className="mt-1 text-sm text-muted-foreground">链接、二维码占位和Widget脚本占位，便于后续接入真实部署域名。</p>
      </div>

      <div className="grid min-w-0 gap-4 xl:grid-cols-[1fr_360px]">
        <div className="min-w-0 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>可分享链接</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <LinkRow icon={Store} label="公共主页" href={publicLink} />
              <LinkRow icon={MessageCircle} label="AI客服页" href={aiChatLink} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-primary" aria-hidden="true" />
                  <CardTitle>Widget脚本占位</CardTitle>
                </div>
                <CopyButton text={widgetScript} label="复制脚本" />
              </div>
            </CardHeader>
            <CardContent className="min-w-0">
              <pre className="max-w-full overflow-x-auto rounded-md border border-border bg-[#14211f] p-4 text-sm text-white">
                <code className="whitespace-pre-wrap break-all">{widgetScript}</code>
              </pre>
              <p className="mt-3 text-sm text-muted-foreground">真实上线时可替换为部署域名、签名参数和渠道来源参数。</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle>二维码占位</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">门店海报、桌牌和朋友圈可使用</p>
              </div>
              <Badge tone="teal">
                <QrCode className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
                QR
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mx-auto grid aspect-square w-full max-w-[260px] grid-cols-9 gap-1 rounded-lg border border-border bg-white p-4">
              {Array.from({ length: 81 }).map((_, index) => (
                <span key={index} className={qrActiveCells.has(index) ? "rounded-[2px] bg-foreground" : "rounded-[2px] bg-white"} />
              ))}
            </div>
            <div className="mt-5 rounded-md bg-muted p-4 text-sm">
              <p className="font-medium">{business.name}</p>
              <p className="mt-1 break-all text-muted-foreground">{aiChatLink}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function LinkRow({
  icon: Icon,
  label,
  href
}: {
  icon: LucideIcon;
  label: string;
  href: string;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-3 rounded-md border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="font-medium">{label}</p>
          <p className="break-all text-sm text-muted-foreground sm:truncate">{href}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <CopyButton text={href} label="复制链接" iconOnly />
        <Link href={href} className={buttonClasses({ variant: "primary", size: "icon" })} title="打开链接">
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
