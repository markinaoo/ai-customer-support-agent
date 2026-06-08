import type { Business, BusinessProfile, FAQ, Lead, Service } from "@/lib/businesses";
import { getBusiness, getBusinessLeads } from "@/lib/businesses";
import { lunaFitBusiness } from "@/lib/luna-fit-demo";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export type LeadStatus = "New" | "Contacted" | "Booked" | "Not interested";

export type DashboardLead = {
  id: string;
  businessId: string;
  name: string;
  phone: string;
  wechat: string;
  serviceNeeded: string;
  preferredTime: string;
  customerMessage: string;
  aiSummary: string;
  status: LeadStatus;
  createdAt: string;
};

type BusinessRow = {
  id: string;
  slug: string;
  name: string;
  industry: string;
  city: string | null;
  address: string;
  opening_hours: string;
  phone: string;
  wechat: string;
  brand_tone: string;
  tagline: string | null;
  description: string;
  handoff_message: string | null;
  hero_image: string | null;
  cover_image: string | null;
};

type ServiceRow = {
  id: string;
  business_id: string;
  name: string;
  price: string;
  description: string | null;
  duration: string | null;
  sort_order: number | null;
};

type FaqRow = {
  id: string;
  business_id: string;
  question: string;
  answer: string;
  sort_order: number | null;
};

type LeadRow = {
  id: string;
  business_id: string;
  name: string | null;
  phone: string | null;
  wechat: string | null;
  service_needed: string | null;
  preferred_time: string | null;
  customer_message: string | null;
  ai_summary: string | null;
  status: LeadStatus | null;
  created_at: string;
};

export function getLocalBusinessProfile(slug: string) {
  if (slug === lunaFitBusiness.slug) {
    return lunaFitBusiness;
  }

  return getBusiness(slug);
}

export async function getBusinessProfile(slug: string): Promise<BusinessProfile | null> {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { data: business } = await supabase
      .from("businesses")
      .select("*")
      .eq("slug", slug)
      .maybeSingle<BusinessRow>();

    if (business) {
      const [{ data: services }, { data: faqs }] = await Promise.all([
        supabase
          .from("services")
          .select("*")
          .eq("business_id", business.id)
          .order("sort_order", { ascending: true })
          .returns<ServiceRow[]>(),
        supabase
          .from("faqs")
          .select("*")
          .eq("business_id", business.id)
          .order("sort_order", { ascending: true })
          .returns<FaqRow[]>()
      ]);

      return mapBusinessProfile(business, services ?? [], faqs ?? []);
    }
  }

  return getLocalBusinessProfile(slug) ?? null;
}

export async function getBusinessIdBySlug(slug: string) {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return null;
  }

  const { data } = await supabase.from("businesses").select("id").eq("slug", slug).maybeSingle<{ id: string }>();
  return data?.id ?? null;
}

export async function getDashboardLeads(slug: string): Promise<DashboardLead[]> {
  const supabase = getSupabaseAdmin();
  const businessId = await getBusinessIdBySlug(slug);

  if (supabase && businessId) {
    const { data } = await supabase
      .from("leads")
      .select("*")
      .eq("business_id", businessId)
      .order("created_at", { ascending: false })
      .returns<LeadRow[]>();

    return (data ?? []).map(mapLeadRow);
  }

  return getBusinessLeads(slug).map(mapMockLead);
}

export async function updateLeadStatus(leadId: string, status: LeadStatus) {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase
    .from("leads")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", leadId)
    .select("*")
    .single<LeadRow>();

  if (error) {
    throw error;
  }

  return mapLeadRow(data);
}

export function isLeadStatus(status: unknown): status is LeadStatus {
  return status === "New" || status === "Contacted" || status === "Booked" || status === "Not interested";
}

function mapBusinessProfile(business: BusinessRow, services: ServiceRow[], faqs: FaqRow[]): BusinessProfile {
  const mappedBusiness: Business = {
    slug: business.slug,
    name: business.name,
    industry: business.industry,
    address: business.address,
    openingHours: business.opening_hours,
    phone: business.phone,
    wechat: business.wechat,
    tagline: business.tagline ?? "",
    description: business.description,
    brandTone: business.brand_tone,
    handoffMessage: business.handoff_message ?? "",
    heroImage: business.hero_image ?? "/images/hero-ai-growth-link.jpg",
    coverImage: business.cover_image ?? "/images/hero-ai-growth-link.jpg"
  };

  return {
    ...mappedBusiness,
    services: services.map((service): Service => ({
      id: service.id,
      businessSlug: business.slug,
      name: service.name,
      price: service.price,
      description: service.description ?? "",
      duration: service.duration ?? "",
      sortOrder: service.sort_order ?? 0
    })),
    faqs: faqs.map((faq): FAQ => ({
      id: faq.id,
      businessSlug: business.slug,
      question: faq.question,
      answer: faq.answer,
      sortOrder: faq.sort_order ?? 0
    }))
  };
}

function mapLeadRow(lead: LeadRow): DashboardLead {
  return {
    id: lead.id,
    businessId: lead.business_id,
    name: lead.name ?? "未留姓名",
    phone: lead.phone ?? "",
    wechat: lead.wechat ?? "",
    serviceNeeded: lead.service_needed ?? "",
    preferredTime: lead.preferred_time ?? "",
    customerMessage: lead.customer_message ?? "",
    aiSummary: lead.ai_summary ?? "",
    status: lead.status ?? "New",
    createdAt: formatDateTime(lead.created_at)
  };
}

function mapMockLead(lead: Lead): DashboardLead {
  return {
    id: lead.id,
    businessId: lead.businessSlug,
    name: lead.name,
    phone: lead.phone,
    wechat: "",
    serviceNeeded: lead.intent,
    preferredTime: "",
    customerMessage: lead.lastMessage,
    aiSummary: lead.intent,
    status: "New",
    createdAt: lead.createdAt
  };
}

function formatDateTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}
