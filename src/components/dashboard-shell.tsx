import Link from "next/link";
import { ArrowUpRight, Store } from "lucide-react";
import type { BusinessProfile } from "@/lib/businesses";
import { DashboardNav } from "@/components/dashboard-nav";
import { DemoLabel } from "@/components/demo-label";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { chatPath, publicBusinessPath } from "@/lib/routes";

export function DashboardShell({
  business,
  children
}: {
  business: BusinessProfile;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 md:grid-cols-[240px_1fr]">
        <aside className="border-b border-border bg-card px-4 py-4 md:border-b-0 md:border-r md:px-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Store className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-semibold">{business.name}</span>
              <span className="block text-xs text-muted-foreground">AI增长工作台</span>
            </span>
          </Link>
          <div className="mt-5">
            <DashboardNav slug={business.slug} />
          </div>
        </aside>
        <main className="min-w-0">
          <header className="border-b border-border bg-card px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="teal">{business.industry}</Badge>
                  <DemoLabel />
                </div>
                <h1 className="mt-2 text-2xl font-semibold">商家增长链接控制台</h1>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href={publicBusinessPath(business.slug)} className={buttonClasses({ variant: "outline", size: "sm" })}>
                  公共主页
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href={chatPath(business.slug)} className={buttonClasses({ variant: "primary", size: "sm" })}>
                  AI客服页
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </header>
          <div className="px-4 py-6 sm:px-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
