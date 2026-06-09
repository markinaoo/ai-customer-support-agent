import type { BusinessLandingContent, BusinessProfile } from "@/lib/businesses";

export const landingTemplateKeys = ["fitness_offer", "beauty_premium", "local_service_direct"] as const;
export const landingThemeKeys = ["clean_pro", "warm_premium", "bold_action"] as const;
export const landingQrTargetKeys = ["landing", "chat"] as const;

export type LandingTemplateKey = (typeof landingTemplateKeys)[number];
export type LandingThemeKey = (typeof landingThemeKeys)[number];
export type LandingQrTarget = (typeof landingQrTargetKeys)[number];

export type LandingSectionKey = "proofMetrics" | "painPoints" | "highlights" | "services" | "journey" | "faqs";

export type LandingSectionVisibility = Record<LandingSectionKey, boolean>;

export type LandingHighlight = {
  title: string;
  description: string;
};

export type LandingMetric = {
  label: string;
  value: string;
};

export type LandingContent = BusinessLandingContent & {
  sectionVisibility: LandingSectionVisibility;
  featuredServiceIds: string[];
  featuredFaqIds: string[];
};

export type LandingPageConfig = {
  templateKey: LandingTemplateKey;
  themeKey: LandingThemeKey;
  heroImage: string;
  qrTarget: LandingQrTarget;
  content: LandingContent;
  source: "generated" | "database";
  updatedAt?: string | null;
  publishedAt?: string | null;
};

export type LandingTemplate = {
  key: LandingTemplateKey;
  name: string;
  description: string;
  bestFor: string;
  defaultThemeKey: LandingThemeKey;
  labels: {
    pain: string;
    painTitle: string;
    highlights: string;
    services: string;
    journey: string;
    journeyTitle: string;
    faqs: string;
  };
  defaultSectionVisibility: LandingSectionVisibility;
};

export type LandingTheme = {
  key: LandingThemeKey;
  name: string;
  description: string;
  heroOverlayClass: string;
  heroAccentClass: string;
  statsBandClass: string;
  mutedBandClass: string;
  iconClass: string;
  finalBandClass: string;
};

export const landingTemplates: Record<LandingTemplateKey, LandingTemplate> = {
  fitness_offer: {
    key: "fitness_offer",
    name: "健身体验课转化页",
    description: "适合私教、健身房、普拉提、瑜伽等需要先咨询再预约的门店。",
    bestFor: "健身 / 私教 / 体态改善",
    defaultThemeKey: "bold_action",
    labels: {
      pain: "客户训练前在意什么",
      painTitle: "先把顾虑说清楚",
      highlights: "工作室怎么承接",
      services: "主推课程",
      journey: "咨询流程",
      journeyTitle: "从扫码到约课",
      faqs: "常见问题"
    },
    defaultSectionVisibility: {
      proofMetrics: true,
      painPoints: true,
      highlights: true,
      services: true,
      journey: true,
      faqs: true
    }
  },
  beauty_premium: {
    key: "beauty_premium",
    name: "美业高级预约页",
    description: "适合美容美发、美甲美睫、皮肤管理等强调审美和信任感的门店。",
    bestFor: "美业 / 皮肤管理 / 美甲美睫",
    defaultThemeKey: "warm_premium",
    labels: {
      pain: "顾客到店前关心什么",
      painTitle: "先确认项目、预算和风格",
      highlights: "门店服务亮点",
      services: "热门项目",
      journey: "预约流程",
      journeyTitle: "从扫码到到店",
      faqs: "常见问题"
    },
    defaultSectionVisibility: {
      proofMetrics: true,
      painPoints: true,
      highlights: true,
      services: true,
      journey: true,
      faqs: true
    }
  },
  local_service_direct: {
    key: "local_service_direct",
    name: "本地服务直接咨询页",
    description: "适合多数本地商家，用清楚的服务、价格和联系方式推动客户咨询。",
    bestFor: "通用本地生活服务",
    defaultThemeKey: "clean_pro",
    labels: {
      pain: "客户关心什么",
      painTitle: "先把关键问题说清楚",
      highlights: "系统如何帮门店承接",
      services: "服务项目",
      journey: "咨询流程",
      journeyTitle: "从扫码到跟进",
      faqs: "常见问题"
    },
    defaultSectionVisibility: {
      proofMetrics: true,
      painPoints: true,
      highlights: true,
      services: true,
      journey: true,
      faqs: true
    }
  }
};

export const landingThemes: Record<LandingThemeKey, LandingTheme> = {
  clean_pro: {
    key: "clean_pro",
    name: "清爽专业",
    description: "适合多数服务门店，信息清楚、转化路径直接。",
    heroOverlayClass: "bg-[#10201d]/68",
    heroAccentClass: "border-white/30 bg-white/15 text-white",
    statsBandClass: "border-b border-border bg-card",
    mutedBandClass: "bg-muted",
    iconClass: "text-primary",
    finalBandClass: "border-t border-border bg-card"
  },
  warm_premium: {
    key: "warm_premium",
    name: "温暖高级",
    description: "适合美业、皮肤管理、形象类门店，更柔和、更有质感。",
    heroOverlayClass: "bg-[#2a1b17]/62",
    heroAccentClass: "border-white/30 bg-white/15 text-white",
    statsBandClass: "border-b border-[#eadfd7] bg-[#fffaf6]",
    mutedBandClass: "bg-[#f8eee8]",
    iconClass: "text-accent",
    finalBandClass: "border-t border-[#eadfd7] bg-[#fffaf6]"
  },
  bold_action: {
    key: "bold_action",
    name: "行动转化",
    description: "适合体验课、预约制项目和活动投放，按钮更突出。",
    heroOverlayClass: "bg-[#111f1c]/72",
    heroAccentClass: "border-secondary/50 bg-secondary/20 text-white",
    statsBandClass: "border-b border-border bg-[#f7fbf7]",
    mutedBandClass: "bg-[#edf5f1]",
    iconClass: "text-secondary",
    finalBandClass: "border-t border-border bg-[#f7fbf7]"
  }
};

const sectionKeys: LandingSectionKey[] = ["proofMetrics", "painPoints", "highlights", "services", "journey", "faqs"];

export function getGeneratedLandingConfig(business: BusinessProfile): LandingPageConfig {
  const templateKey = inferLandingTemplateKey(business);
  const template = landingTemplates[templateKey];

  return {
    templateKey,
    themeKey: template.defaultThemeKey,
    heroImage: business.coverImage || business.heroImage || "/images/hero-ai-growth-link.jpg",
    qrTarget: "landing",
    content: normalizeLandingContent(createDefaultContent(business, templateKey), business, templateKey),
    source: "generated",
    updatedAt: null,
    publishedAt: null
  };
}

export function normalizeLandingConfig(
  business: BusinessProfile,
  input: {
    templateKey?: unknown;
    themeKey?: unknown;
    heroImage?: unknown;
    qrTarget?: unknown;
    content?: unknown;
    source?: LandingPageConfig["source"];
    updatedAt?: string | null;
    publishedAt?: string | null;
  }
): LandingPageConfig {
  const generated = getGeneratedLandingConfig(business);
  const templateKey = resolveLandingTemplateKey(input.templateKey, generated.templateKey);
  const template = landingTemplates[templateKey];
  const themeKey = resolveLandingThemeKey(input.themeKey, template.defaultThemeKey);

  return {
    templateKey,
    themeKey,
    heroImage: cleanString(input.heroImage, generated.heroImage),
    qrTarget: resolveQrTarget(input.qrTarget, "landing"),
    content: normalizeLandingContent(input.content ?? generated.content, business, templateKey),
    source: input.source ?? "generated",
    updatedAt: input.updatedAt ?? null,
    publishedAt: input.publishedAt ?? null
  };
}

export function inferLandingTemplateKey(business: BusinessProfile): LandingTemplateKey {
  const text = `${business.industry} ${business.name}`.toLowerCase();

  if (text.includes("健身") || text.includes("私教") || text.includes("瑜伽") || text.includes("普拉提")) {
    return "fitness_offer";
  }

  if (
    text.includes("美容") ||
    text.includes("美发") ||
    text.includes("皮肤") ||
    text.includes("美甲") ||
    text.includes("美睫")
  ) {
    return "beauty_premium";
  }

  return "local_service_direct";
}

export function resolveLandingTemplateKey(value: unknown, fallback: LandingTemplateKey = "local_service_direct"): LandingTemplateKey {
  return typeof value === "string" && landingTemplateKeys.includes(value as LandingTemplateKey)
    ? (value as LandingTemplateKey)
    : fallback;
}

export function resolveLandingThemeKey(value: unknown, fallback: LandingThemeKey = "clean_pro"): LandingThemeKey {
  return typeof value === "string" && landingThemeKeys.includes(value as LandingThemeKey) ? (value as LandingThemeKey) : fallback;
}

export function resolveQrTarget(value: unknown, fallback: LandingQrTarget = "landing"): LandingQrTarget {
  return typeof value === "string" && landingQrTargetKeys.includes(value as LandingQrTarget) ? (value as LandingQrTarget) : fallback;
}

function normalizeLandingContent(
  content: Partial<LandingContent> | Partial<BusinessLandingContent>,
  business: BusinessProfile,
  templateKey: LandingTemplateKey
): LandingContent {
  const defaults = createDefaultContent(business, templateKey);
  const incoming: Record<string, unknown> = isPlainObject(content) ? content : {};

  return {
    eyebrow: cleanString(incoming.eyebrow, defaults.eyebrow),
    headline: cleanString(incoming.headline, defaults.headline),
    subheadline: cleanString(incoming.subheadline, defaults.subheadline),
    primaryCta: cleanString(incoming.primaryCta, defaults.primaryCta),
    secondaryCta: cleanString(incoming.secondaryCta, defaults.secondaryCta),
    trustPoints: cleanStringArray(incoming.trustPoints, defaults.trustPoints),
    painPoints: cleanStringArray(incoming.painPoints, defaults.painPoints),
    highlights: cleanHighlights(incoming.highlights, defaults.highlights),
    journey: cleanStringArray(incoming.journey, defaults.journey),
    proofMetrics: cleanMetrics(incoming.proofMetrics, defaults.proofMetrics),
    finalCta: cleanString(incoming.finalCta, defaults.finalCta),
    sectionVisibility: cleanSectionVisibility(incoming.sectionVisibility, defaults.sectionVisibility),
    featuredServiceIds: cleanIdArray(incoming.featuredServiceIds, business.services.map((service) => service.id).slice(0, 4)),
    featuredFaqIds: cleanIdArray(incoming.featuredFaqIds, business.faqs.map((faq) => faq.id).slice(0, 4))
  };
}

function createDefaultContent(business: BusinessProfile, templateKey: LandingTemplateKey): LandingContent {
  const firstService = business.services[0];
  const landing = business.landing;
  const serviceValue = firstService ? `${firstService.name} ${firstService.price}` : business.industry;
  const proofMetrics = landing?.proofMetrics ?? [
    { label: "主推服务", value: serviceValue },
    { label: "营业时间", value: business.openingHours },
    { label: "联系微信", value: business.wechat }
  ];

  const base: Record<LandingTemplateKey, Omit<LandingContent, "sectionVisibility" | "featuredServiceIds" | "featuredFaqIds">> = {
    fitness_offer: {
      eyebrow: business.industry,
      headline: `想开始训练，先了解${business.name}是否适合你`,
      subheadline: business.description,
      primaryCta: "咨询体验课",
      secondaryCta: "查看课程价格",
      trustPoints: ["适合新手咨询", "价格先了解", "工作人员确认预约"],
      painPoints: ["不知道自己适合什么训练", "担心没有基础跟不上", "想约晚上但不确定档期"],
      highlights: [
        { title: "先了解目标", description: "客户先说明训练目标、基础情况和期望时间，减少无效沟通。" },
        { title: "价格讲清楚", description: "常见课程和体验项目提前展示，到店前先建立信任。" },
        { title: "线索可跟进", description: "客户留下联系方式后，门店再确认具体档期和安排。" }
      ],
      journey: ["扫码进入落地页", "了解课程和FAQ", "点击在线咨询", "工作人员跟进确认"],
      proofMetrics,
      finalCta: `想了解${firstService?.name ?? "体验课"}，可以先在线咨询。`
    },
    beauty_premium: {
      eyebrow: business.industry,
      headline: `先了解${business.name}的项目、价格和预约时间`,
      subheadline: business.description,
      primaryCta: "咨询项目",
      secondaryCta: "查看门店主页",
      trustPoints: ["价格先沟通", "时间先确认", "适合到店前咨询"],
      painPoints: ["不确定项目是否适合自己", "担心价格和实际情况不一致", "想先确认老师和到店时间"],
      highlights: [
        { title: "先沟通需求", description: "根据顾客预算、风格和到店时间，先完成基础咨询。" },
        { title: "减少漏消息", description: "常见问题自动承接，留下高意向客户线索。" },
        { title: "适合多平台投放", description: "二维码可放到朋友圈、小红书、点评和线下桌牌。" }
      ],
      journey: ["扫码查看页面", "了解项目和价格", "咨询到店时间", "门店跟进确认"],
      proofMetrics,
      finalCta: "想先确认项目和时间，可以直接在线咨询。"
    },
    local_service_direct: {
      eyebrow: business.industry,
      headline: `扫码先了解${business.name}，再预约到店服务`,
      subheadline: business.description,
      primaryCta: "在线咨询",
      secondaryCta: "查看服务",
      trustPoints: ["信息清楚", "咨询更快", "门店再确认"],
      painPoints: ["客户反复问价格", "到店前需求不清楚", "消息容易漏回"],
      highlights: [
        { title: "先回答常见问题", description: "客户可以先了解价格、地址、营业时间和服务适合度。" },
        { title: "再记录预约意向", description: "客户留下联系方式、项目和期望时间后，门店再跟进确认。" },
        { title: "内容可按门店调整", description: "不同商家可以替换文案、主推项目、图片和按钮。" }
      ],
      journey: ["进入门店链接", "说明需求", "留下联系方式", "门店跟进确认"],
      proofMetrics,
      finalCta: `想了解${firstService?.name ?? "门店服务"}，可以先在线咨询。`
    }
  };

  return {
    ...base[templateKey],
    ...landing,
    sectionVisibility: landingTemplates[templateKey].defaultSectionVisibility,
    featuredServiceIds: business.services.map((service) => service.id).slice(0, 4),
    featuredFaqIds: business.faqs.map((faq) => faq.id).slice(0, 4)
  };
}

function cleanString(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function cleanStringArray(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const cleaned = value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean);
  return cleaned.length > 0 ? cleaned : fallback;
}

function cleanIdArray(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0).map((item) => item.trim());
}

function cleanHighlights(value: unknown, fallback: LandingHighlight[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const cleaned = value
    .filter(isPlainObject)
    .map((item) => ({
      title: cleanString(item.title, ""),
      description: cleanString(item.description, "")
    }))
    .filter((item) => item.title && item.description);

  return cleaned.length > 0 ? cleaned : fallback;
}

function cleanMetrics(value: unknown, fallback: LandingMetric[]) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const cleaned = value
    .filter(isPlainObject)
    .map((item) => ({
      label: cleanString(item.label, ""),
      value: cleanString(item.value, "")
    }))
    .filter((item) => item.label && item.value);

  return cleaned.length > 0 ? cleaned : fallback;
}

function cleanSectionVisibility(value: unknown, fallback: LandingSectionVisibility) {
  if (!isPlainObject(value)) {
    return fallback;
  }

  return sectionKeys.reduce<LandingSectionVisibility>((result, key) => {
    result[key] = typeof value[key] === "boolean" ? value[key] : fallback[key];
    return result;
  }, { ...fallback });
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}
