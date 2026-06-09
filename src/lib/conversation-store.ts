import type { BusinessProfile } from "@/lib/businesses";
import type { GeneratedMarketingDraft } from "@/lib/deepseek";
import { getBusinessIdBySlug } from "@/lib/business-data";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export type StoredMessage = {
  role: "user" | "assistant";
  content: string;
};

type ConversationRow = {
  id: string;
  business_id: string;
  session_id: string;
};

type ConversationMessageRow = {
  role: "customer" | "ai" | "owner";
  content: string;
  created_at: string;
};

export type LeadCandidate = {
  name: string;
  phone: string;
  wechat: string;
  serviceNeeded: string;
  preferredTime: string;
  customerMessage: string;
  aiSummary: string;
};

export async function getOrCreateConversation(slug: string, sessionId: string) {
  const supabase = getSupabaseAdmin();
  const businessId = await getBusinessIdBySlug(slug);

  if (!supabase || !businessId) {
    return null;
  }

  const { data: existing } = await supabase
    .from("conversations")
    .select("id,business_id,session_id")
    .eq("business_id", businessId)
    .eq("session_id", sessionId)
    .maybeSingle<ConversationRow>();

  if (existing) {
    return existing;
  }

  const { data, error } = await supabase
    .from("conversations")
    .insert({
      business_id: businessId,
      session_id: sessionId,
      channel: "web_chat",
      status: "AI Active",
      summary: ""
    })
    .select("id,business_id,session_id")
    .single<ConversationRow>();

  if (error) {
    throw error;
  }

  return data;
}

export async function saveConversationMessage(
  conversation: ConversationRow | null,
  role: "customer" | "ai",
  content: string
) {
  const supabase = getSupabaseAdmin();

  if (!supabase || !conversation) {
    return;
  }

  await supabase.from("conversation_messages").insert({
    conversation_id: conversation.id,
    business_id: conversation.business_id,
    role,
    content
  });

  await supabase
    .from("conversations")
    .update({
      updated_at: new Date().toISOString(),
      summary: content.slice(0, 220)
    })
    .eq("id", conversation.id);
}

export async function getRecentStoredMessages(conversation: ConversationRow | null): Promise<StoredMessage[]> {
  const supabase = getSupabaseAdmin();

  if (!supabase || !conversation) {
    return [];
  }

  const { data } = await supabase
    .from("conversation_messages")
    .select("role,content,created_at")
    .eq("conversation_id", conversation.id)
    .order("created_at", { ascending: true })
    .limit(12)
    .returns<ConversationMessageRow[]>();

  return (data ?? []).map((message) => ({
    role: message.role === "customer" ? "user" : "assistant",
    content: message.content
  }));
}

export function extractLeadCandidate(
  business: BusinessProfile,
  customerMessages: string[],
  aiReply: string
): LeadCandidate | null {
  const combined = customerMessages.join("\n");
  const latest = customerMessages.at(-1) ?? combined;
  const phone = normalizePhone(combined.match(/(?:\+?86[-\s]?)?(1[3-9]\d[-\s]?\d{4}[-\s]?\d{4})/)?.[1] ?? "");
  const wechat = extractWechat(combined);
  const name = extractName(combined);
  const serviceNeeded = extractServiceNeeded(business, combined);
  const preferredTime = extractPreferredTime(combined);
  const hasContact = Boolean(phone || wechat || name);
  const hasExplicitBookingIntent = /预约|想来|到店|报名|联系我|加微信|留个|留一下|电话是|微信是|想体验|体验一下|约课|试课/.test(combined);
  const isPureInfoQuestion = /包含什么|多少钱|价格|有什么|区别|适合|可以吗|会不会|怎么|几次|多久|在哪|地址/.test(latest);

  if (!hasContact && !preferredTime && !hasExplicitBookingIntent) {
    return null;
  }

  if (isPureInfoQuestion && !hasContact && !preferredTime && !hasExplicitBookingIntent) {
    return null;
  }

  if (!phone && !wechat && !preferredTime && !serviceNeeded) {
    return null;
  }

  return {
    name,
    phone,
    wechat,
    serviceNeeded,
    preferredTime,
    customerMessage: latest,
    aiSummary: buildAiSummary(name, phone, wechat, serviceNeeded, preferredTime, aiReply)
  };
}

export async function saveLead(slug: string, conversationId: string | null, candidate: LeadCandidate) {
  const supabase = getSupabaseAdmin();
  const businessId = await getBusinessIdBySlug(slug);

  if (!supabase || !businessId) {
    return null;
  }

  const { data, error } = await supabase
    .from("leads")
    .insert({
      business_id: businessId,
      conversation_id: conversationId,
      name: candidate.name || null,
      phone: candidate.phone || null,
      wechat: candidate.wechat || null,
      service_needed: candidate.serviceNeeded || null,
      preferred_time: candidate.preferredTime || null,
      customer_message: candidate.customerMessage,
      ai_summary: candidate.aiSummary,
      status: "New"
    })
    .select("id,business_id,name,phone,wechat,service_needed,preferred_time,customer_message,ai_summary,status,created_at")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function saveMarketingDrafts(slug: string, drafts: GeneratedMarketingDraft[], serviceName: string, campaignGoal: string) {
  const supabase = getSupabaseAdmin();
  const businessId = await getBusinessIdBySlug(slug);

  if (!supabase || !businessId) {
    return [];
  }

  const { data, error } = await supabase
    .from("marketing_drafts")
    .insert(
      drafts.map((draft) => ({
        business_id: businessId,
        channel: draft.channel,
        service_name: serviceName,
        campaign_goal: campaignGoal,
        title: draft.title,
        body: draft.body,
        cta: draft.cta
      }))
    )
    .select("id");

  if (error) {
    throw error;
  }

  return data ?? [];
}

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

function extractWechat(text: string) {
  const explicit = text.match(/(?:微信|wechat|WeChat|wx|WX)[:：号是叫\s]*([A-Za-z0-9_-]{4,32})/);

  if (explicit?.[1]) {
    return explicit[1];
  }

  return "";
}

function extractName(text: string) {
  const rawName = text.match(/(?:我叫|我是|姓名[:：\s]*)([\u4e00-\u9fa5A-Za-z]{1,12})/)?.[1] ?? "";

  if (/新手|小白|零基础|学生|上班族|女生|男生|会员|顾客|客户|第一次|健身/.test(rawName)) {
    return "";
  }

  return rawName;
}

function extractServiceNeeded(business: BusinessProfile, text: string) {
  const service = business.services.find((item) => text.includes(item.name));

  if (service) {
    return service.name;
  }

  if (/减脂/.test(text)) return "减脂私教课";
  if (/塑形/.test(text)) return "塑形私教课";
  if (/体验/.test(text)) return "一对一私教体验课";
  if (/体测/.test(text)) return "体测评估";
  if (/小团体/.test(text)) return "小团体训练";

  return "";
}

function extractPreferredTime(text: string) {
  const timeMatch = text.match(/((今天|明天|后天|周[一二三四五六日天末]|星期[一二三四五六日天])[^，。；\n]{0,18}(上午|中午|下午|晚上|晚间|[0-2]?\d点半?|[0-2]?\d[:：][0-5]\d)?)/);
  return timeMatch?.[1]?.trim() ?? "";
}

function buildAiSummary(
  name: string,
  phone: string,
  wechat: string,
  serviceNeeded: string,
  preferredTime: string,
  aiReply: string
) {
  const parts = [
    name ? `姓名：${name}` : "",
    phone ? `电话：${phone}` : "",
    wechat ? `微信：${wechat}` : "",
    serviceNeeded ? `服务：${serviceNeeded}` : "",
    preferredTime ? `时间：${preferredTime}` : ""
  ].filter(Boolean);

  return `${parts.join("；") || "客户有预约/咨询意向"}。AI已说明不会自动确认预约，需要工作人员联系确认。${aiReply.slice(0, 80)}`;
}
