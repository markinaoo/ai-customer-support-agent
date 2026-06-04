import Link from "next/link";
import { Home } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-sm font-medium text-primary">404</p>
        <h1 className="mt-3 text-3xl font-semibold">没有找到这个商家页面</h1>
        <p className="mt-3 text-muted-foreground">当前Demo已预置 bella-hair，后续可在数据层继续添加更多商家slug。</p>
        <Link href="/demo" className={buttonClasses({ className: "mt-6" })}>
          <Home className="h-4 w-4" aria-hidden="true" />
          返回Demo
        </Link>
      </div>
    </main>
  );
}
