import Link from "next/link";
import { ArrowRight, LayoutDashboard, Sparkles } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { defaultDemoBusinessSlug } from "@/lib/businesses";
import { chatPath, dashboardPath, publicBusinessPath } from "@/lib/routes";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2 font-semibold">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="truncate">AI商家增长链接</span>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          <Link href="/demo" className={buttonClasses({ variant: "ghost", size: "sm" })}>
            Demo路径
          </Link>
          <Link href={publicBusinessPath(defaultDemoBusinessSlug)} className={buttonClasses({ variant: "ghost", size: "sm" })}>
            商家主页
          </Link>
          <Link href={chatPath(defaultDemoBusinessSlug)} className={buttonClasses({ variant: "ghost", size: "sm" })}>
            AI客服
          </Link>
        </nav>
        <Link href={dashboardPath(defaultDemoBusinessSlug)} className={buttonClasses({ variant: "primary", size: "sm" })}>
          <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">老板看板</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
