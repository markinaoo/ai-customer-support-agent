import type { BusinessLandingContent, BusinessProfile } from "@/lib/businesses";
import { getGeneratedLandingConfig } from "@/lib/landing-config";

export function getClientLandingContent(business: BusinessProfile): BusinessLandingContent {
  return getGeneratedLandingConfig(business).content;
}
