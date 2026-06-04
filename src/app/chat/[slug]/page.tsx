import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Store } from "lucide-react";
import { AIChat } from "@/components/chat/ai-chat";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import { getBusiness, getBusinessSlugs } from "@/lib/businesses";
import { publicBusinessPath } from "@/lib/routes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBusinessSlugs().map((slug) => ({ slug }));
}

export default async function ChatPage({ params }: PageProps) {
  const { slug } = await params;
  const business = getBusiness(slug);

  if (!business) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="teal">{business.industry}</Badge>
              <Badge tone="amber">AI客服Demo</Badge>
            </div>
            <h1 className="mt-2 text-2xl font-semibold">{business.name} AI客服</h1>
          </div>
          <Link href={publicBusinessPath(business.slug)} className={buttonClasses({ variant: "outline", size: "sm" })}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            返回商家主页
            <Store className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <AIChat business={business} />
      </section>
    </main>
  );
}
