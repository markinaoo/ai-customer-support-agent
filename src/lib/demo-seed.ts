import { lunaFitBusiness } from "@/lib/luna-fit-demo";
import { getGeneratedLandingConfig } from "@/lib/landing-config";
import { requireSupabaseAdmin } from "@/lib/supabase-server";

export async function seedLunaFitDemo() {
  const supabase = requireSupabaseAdmin();

  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .upsert(
      {
        slug: lunaFitBusiness.slug,
        name: lunaFitBusiness.name,
        industry: lunaFitBusiness.industry,
        city: "上海",
        address: lunaFitBusiness.address,
        opening_hours: lunaFitBusiness.openingHours,
        phone: lunaFitBusiness.phone,
        wechat: lunaFitBusiness.wechat,
        brand_tone: lunaFitBusiness.brandTone,
        tagline: lunaFitBusiness.tagline,
        description: lunaFitBusiness.description,
        handoff_message: lunaFitBusiness.handoffMessage,
        hero_image: lunaFitBusiness.heroImage,
        cover_image: lunaFitBusiness.coverImage,
        demo_label: "示例门店，仅用于功能演示",
        updated_at: new Date().toISOString()
      },
      { onConflict: "slug" }
    )
    .select("id")
    .single<{ id: string }>();

  if (businessError) {
    throw businessError;
  }

  await Promise.all([
    supabase.from("services").delete().eq("business_id", business.id),
    supabase.from("faqs").delete().eq("business_id", business.id)
  ]);

  const { error: servicesError } = await supabase.from("services").insert(
    lunaFitBusiness.services.map((service) => ({
      business_id: business.id,
      name: service.name,
      price: service.price,
      description: service.description,
      duration: service.duration,
      sort_order: service.sortOrder
    }))
  );

  if (servicesError) {
    throw servicesError;
  }

  const { error: faqsError } = await supabase.from("faqs").insert(
    lunaFitBusiness.faqs.map((faq) => ({
      business_id: business.id,
      question: faq.question,
      answer: faq.answer,
      sort_order: faq.sortOrder
    }))
  );

  if (faqsError) {
    throw faqsError;
  }

  const landing = getGeneratedLandingConfig(lunaFitBusiness);
  const now = new Date().toISOString();
  const { error: landingError } = await supabase.from("landing_pages").upsert(
    {
      business_id: business.id,
      template_key: landing.templateKey,
      theme_key: landing.themeKey,
      hero_image: landing.heroImage,
      draft_content: landing.content,
      published_content: landing.content,
      qr_target: "landing",
      updated_at: now,
      published_at: now
    },
    { onConflict: "business_id" }
  );

  if (landingError) {
    throw landingError;
  }

  return {
    businessId: business.id,
    slug: lunaFitBusiness.slug,
    services: lunaFitBusiness.services.length,
    faqs: lunaFitBusiness.faqs.length,
    landingPage: true
  };
}
