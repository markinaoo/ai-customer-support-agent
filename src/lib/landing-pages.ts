import type { BusinessProfile } from "@/lib/businesses";
import {
  getGeneratedLandingConfig,
  normalizeLandingConfig,
  type LandingContent,
  type LandingPageConfig,
  type LandingQrTarget,
  type LandingTemplateKey,
  type LandingThemeKey
} from "@/lib/landing-config";
import { getBusinessIdBySlug } from "@/lib/business-data";
import { getSupabaseAdmin } from "@/lib/supabase-server";

type LandingPageRow = {
  id: string;
  business_id: string;
  template_key: string;
  theme_key: string;
  hero_image: string | null;
  draft_content: unknown;
  published_content: unknown;
  qr_target: string | null;
  updated_at: string | null;
  published_at: string | null;
};

const LANDING_READ_TIMEOUT_MS = 2500;

export type LandingPageInput = {
  templateKey: LandingTemplateKey;
  themeKey: LandingThemeKey;
  heroImage: string;
  qrTarget: LandingQrTarget;
  content: LandingContent;
};

export async function getPublicLandingConfig(business: BusinessProfile): Promise<LandingPageConfig> {
  const generated = getGeneratedLandingConfig(business);
  const row = await getLandingRowWithTimeout(business.slug);

  if (!row || !hasObjectContent(row.published_content)) {
    return generated;
  }

  return normalizeLandingConfig(business, {
    templateKey: row.template_key,
    themeKey: row.theme_key,
    heroImage: row.hero_image ?? generated.heroImage,
    qrTarget: row.qr_target,
    content: row.published_content as Partial<LandingContent>,
    source: "database",
    updatedAt: row.updated_at,
    publishedAt: row.published_at
  });
}

export async function getEditorLandingConfig(business: BusinessProfile): Promise<LandingPageConfig> {
  const generated = getGeneratedLandingConfig(business);
  const row = await getLandingRowWithTimeout(business.slug);

  if (!row) {
    return generated;
  }

  const editableContent = hasObjectContent(row.draft_content)
    ? row.draft_content
    : hasObjectContent(row.published_content)
      ? row.published_content
      : generated.content;

  return normalizeLandingConfig(business, {
    templateKey: row.template_key,
    themeKey: row.theme_key,
    heroImage: row.hero_image ?? generated.heroImage,
    qrTarget: row.qr_target,
    content: editableContent as Partial<LandingContent>,
    source: "database",
    updatedAt: row.updated_at,
    publishedAt: row.published_at
  });
}

export async function saveLandingDraft(business: BusinessProfile, input: LandingPageInput) {
  const supabase = getSupabaseAdmin();
  const businessId = await getBusinessIdBySlug(business.slug);

  if (!supabase || !businessId) {
    throw new Error("Supabase is not configured or business was not seeded.");
  }

  const normalized = normalizeLandingConfig(business, { ...input, source: "database" });
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("landing_pages")
    .upsert(
      {
        business_id: businessId,
        template_key: normalized.templateKey,
        theme_key: normalized.themeKey,
        hero_image: normalized.heroImage,
        draft_content: normalized.content,
        qr_target: normalized.qrTarget,
        updated_at: now
      },
      { onConflict: "business_id" }
    )
    .select("*")
    .single<LandingPageRow>();

  if (error) {
    throw error;
  }

  return normalizeLandingConfig(business, {
    templateKey: data.template_key,
    themeKey: data.theme_key,
    heroImage: data.hero_image ?? normalized.heroImage,
    qrTarget: data.qr_target,
    content: data.draft_content as Partial<LandingContent>,
    source: "database",
    updatedAt: data.updated_at,
    publishedAt: data.published_at
  });
}

export async function publishLandingPage(business: BusinessProfile, input: LandingPageInput) {
  const supabase = getSupabaseAdmin();
  const businessId = await getBusinessIdBySlug(business.slug);

  if (!supabase || !businessId) {
    throw new Error("Supabase is not configured or business was not seeded.");
  }

  const normalized = normalizeLandingConfig(business, { ...input, source: "database" });
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("landing_pages")
    .upsert(
      {
        business_id: businessId,
        template_key: normalized.templateKey,
        theme_key: normalized.themeKey,
        hero_image: normalized.heroImage,
        draft_content: normalized.content,
        published_content: normalized.content,
        qr_target: normalized.qrTarget,
        updated_at: now,
        published_at: now
      },
      { onConflict: "business_id" }
    )
    .select("*")
    .single<LandingPageRow>();

  if (error) {
    throw error;
  }

  return normalizeLandingConfig(business, {
    templateKey: data.template_key,
    themeKey: data.theme_key,
    heroImage: data.hero_image ?? normalized.heroImage,
    qrTarget: data.qr_target,
    content: data.published_content as Partial<LandingContent>,
    source: "database",
    updatedAt: data.updated_at,
    publishedAt: data.published_at
  });
}

async function getLandingRow(slug: string) {
  const supabase = getSupabaseAdmin();
  const businessId = await getBusinessIdBySlug(slug);

  if (!supabase || !businessId) {
    return null;
  }

  const { data, error } = await supabase
    .from("landing_pages")
    .select("*")
    .eq("business_id", businessId)
    .maybeSingle<LandingPageRow>();

  if (error) {
    return null;
  }

  return data;
}

async function getLandingRowWithTimeout(slug: string) {
  return withTimeout(getLandingRow(slug), LANDING_READ_TIMEOUT_MS, null);
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, fallback: T) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const timeout = new Promise<T>((resolve) => {
    timeoutId = setTimeout(() => resolve(fallback), timeoutMs);
  });

  return Promise.race([promise, timeout]).finally(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  });
}

function hasObjectContent(value: unknown) {
  return Boolean(value && typeof value === "object" && !Array.isArray(value) && Object.keys(value).length > 0);
}
