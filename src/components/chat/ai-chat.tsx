"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { Loader2, MessageCircle, Send, UserRound } from "lucide-react";
import { DemoLabel } from "@/components/demo-label";
import type { BusinessProfile } from "@/lib/businesses";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "user" | "ai";
  content: string;
};

export function AIChat({ business }: { business: BusinessProfile }) {
  const idCounter = useRef(0);
  const sessionId = useRef("");
  const assistantLabel = business.assistantLabel ?? "在线咨询顾问";
  const assistantIntro =
    business.assistantIntro ?? `你好，我是 ${business.name} 的在线咨询顾问。可以先帮你了解价格、预约、营业时间、地址和到店准备。`;
  const quickPrompts = [
    business.slug === "luna-fit" ? "你们私教多少钱？" : `今天可以预约${business.services[0]?.name ?? "服务"}吗？`,
    business.slug === "luna-fit" ? "我没有基础可以吗？" : `${business.services[1]?.name ?? "热门项目"}多少钱？`,
    business.slug === "luna-fit" ? "晚上可以预约吗？" : "可以指定老师吗？",
    "门店地址在哪里？"
  ];
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "ai",
      content: assistantIntro
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);

  const leadSignals = useMemo(() => {
    const joined = messages.map((message) => message.content).join(" ");
    return {
      hasBudget: /¥|价格|多少钱|预算/.test(joined),
      hasTime: /今天|明天|周|下午|晚上|预约/.test(joined),
      hasService: /剪发|染发|烫发|护理|造型|美甲|美睫|睫毛|卸甲|皮肤|清洁|补水|修护|私教|体测|减脂|塑形|训练|体验课/.test(joined)
    };
  }, [messages]);

  function nextMessageId(prefix: string) {
    idCounter.current += 1;
    return `${prefix}-${idCounter.current}`;
  }

  function getSessionId() {
    if (!sessionId.current) {
      sessionId.current = createSessionId(business.slug);
    }

    return sessionId.current;
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMessage: ChatMessage = {
      id: nextMessageId("user"),
      role: "user",
      content: trimmed
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`/api/chat/${business.slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: trimmed,
          sessionId: getSessionId(),
          history: [...messages, userMessage].slice(-10)
        })
      });

      const data = (await response.json()) as { reply?: string; leadCaptured?: boolean; sessionId?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "AI request failed");
      }

      if (data.sessionId) {
        sessionId.current = data.sessionId;
      }
      setLeadCaptured(Boolean(data.leadCaptured));
      setMessages((current) => [
        ...current,
        {
          id: nextMessageId("ai"),
          role: "ai",
          content: data.reply ?? "已收到，我会先记录你的需求。"
        }
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: nextMessageId("ai-error"),
          role: "ai",
          content: `现在咨询人数较多，我先帮你记录下来。也可以直接加微信 ${business.wechat}，工作人员会尽快确认。`
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <Card className="min-h-[620px]">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle>{assistantLabel}</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">可咨询价格、预约时间、到店准备和项目选择</p>
              <div className="mt-2">
                <DemoLabel />
              </div>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </span>
          </div>
        </CardHeader>
        <CardContent className="flex h-[540px] flex-col p-0">
          <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex gap-3", message.role === "user" ? "justify-end" : "justify-start")}
              >
                {message.role === "ai" ? (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  </span>
                ) : null}
                <div
                  className={cn(
                    "max-w-[78%] rounded-lg px-4 py-3 text-sm leading-6",
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  )}
                >
                  {message.content}
                </div>
                {message.role === "user" ? (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
                    <UserRound className="h-4 w-4" aria-hidden="true" />
                  </span>
                ) : null}
              </div>
            ))}
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                正在输入...
              </div>
            ) : null}
          </div>
          <div className="border-t border-border p-4 sm:p-5">
            <div className="mb-3 flex gap-2 overflow-x-auto">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => void sendMessage(prompt)}
                  className="h-9 shrink-0 rounded-md border border-border bg-card px-3 text-sm transition hover:bg-muted"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={`输入顾客问题，例如：周六下午可以预约${business.services[0]?.name ?? "服务"}吗？`}
              />
              <Button type="submit" size="icon" disabled={loading} title="发送">
                <Send className="h-4 w-4" aria-hidden="true" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>咨询进度</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Signal label="项目意向" active={leadSignals.hasService} />
            <Signal label="到店时间" active={leadSignals.hasTime} />
            <Signal label="价格预算" active={leadSignals.hasBudget} />
            <Signal label="已记录需求" active={leadCaptured} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>门店信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>{business.address}</p>
            <p>{business.openingHours}</p>
            <p>电话：{business.phone}</p>
            <p>微信：{business.wechat}</p>
            <p>品牌语气：{business.brandTone}</p>
            <p>跟进说明：{business.handoffMessage}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function createSessionId(slug: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `chat-${slug}-${crypto.randomUUID()}`;
  }

  return `chat-${slug}-${String(Date.now())}`;
}

function Signal({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-border px-3 py-2">
      <span className="text-sm">{label}</span>
      <span className={cn("h-2.5 w-2.5 rounded-full", active ? "bg-primary" : "bg-border")} />
    </div>
  );
}
