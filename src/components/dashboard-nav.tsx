"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BotMessageSquare,
  ChartNoAxesColumnIncreasing,
  ClipboardList,
  Megaphone,
  Rocket,
  Settings,
  UsersRound
} from "lucide-react";
import { cn } from "@/lib/utils";
import { dashboardPath, dashboardRoute } from "@/lib/routes";

const navItems = [
  {
    label: "总览",
    href: (slug: string) => dashboardPath(slug),
    icon: ChartNoAxesColumnIncreasing
  },
  {
    label: "线索",
    href: (slug: string) => dashboardRoute(slug, "leads"),
    icon: UsersRound
  },
  {
    label: "会话",
    href: (slug: string) => dashboardRoute(slug, "conversations"),
    icon: BotMessageSquare
  },
  {
    label: "营销",
    href: (slug: string) => dashboardRoute(slug, "marketing"),
    icon: Megaphone
  },
  {
    label: "设置",
    href: (slug: string) => dashboardRoute(slug, "settings"),
    icon: Settings
  },
  {
    label: "部署",
    href: (slug: string) => dashboardRoute(slug, "deployment"),
    icon: Rocket
  }
];

export function DashboardNav({ slug }: { slug: string }) {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 overflow-x-auto md:grid">
      {navItems.map((item) => {
        const href = item.href(slug);
        const Icon = item.icon;
        const active = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex h-10 shrink-0 items-center gap-3 rounded-md px-3 text-sm font-medium transition",
              active ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
      <Link
        href="/demo"
        className="flex h-10 shrink-0 items-center gap-3 rounded-md px-3 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
      >
        <ClipboardList className="h-4 w-4" aria-hidden="true" />
        Demo
      </Link>
    </nav>
  );
}
