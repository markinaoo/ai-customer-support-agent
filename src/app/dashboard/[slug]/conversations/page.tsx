import { notFound } from "next/navigation";
import { Bot, MessageSquareText, UserRound } from "lucide-react";
import { LeadStatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBusiness, getBusinessConversations } from "@/lib/businesses";
import { cn } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ConversationsPage({ params }: PageProps) {
  const { slug } = await params;
  const business = getBusiness(slug);

  if (!business) {
    notFound();
  }

  const scopedConversations = getBusinessConversations(slug);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">会话中心</h2>
        <p className="mt-1 text-sm text-muted-foreground">展示AI接待、顾客消息和老板接管的完整上下文。</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[360px_1fr]">
        <div className="space-y-3">
          {scopedConversations.map((conversation) => (
            <Card key={conversation.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{conversation.customer}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{conversation.channel}</p>
                  </div>
                  <LeadStatusBadge status={conversation.status} />
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{conversation.summary}</p>
                <p className="mt-3 text-xs text-muted-foreground">{conversation.updatedAt}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="border-b border-border">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>会话记录</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">默认展示最近一条高意向咨询</p>
              </div>
              <Badge tone="teal">
                <MessageSquareText className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
                待跟进
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 p-5">
            {scopedConversations[0]?.messages.map((message) => {
              const isCustomer = message.role === "customer";
              const Icon = message.role === "ai" ? Bot : UserRound;
              return (
                <div key={`${message.time}-${message.text}`} className={cn("flex gap-3", isCustomer ? "justify-end" : "justify-start")}>
                  {!isCustomer ? (
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  ) : null}
                  <div className={cn("max-w-[78%] rounded-lg px-4 py-3", isCustomer ? "bg-primary text-primary-foreground" : "bg-muted")}>
                    <p className="text-sm leading-6">{message.text}</p>
                    <p className={cn("mt-2 text-xs", isCustomer ? "text-primary-foreground/75" : "text-muted-foreground")}>{message.time}</p>
                  </div>
                  {isCustomer ? (
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  ) : null}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
