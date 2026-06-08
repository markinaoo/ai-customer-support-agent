import type { BusinessLandingContent, BusinessProfile } from "@/lib/businesses";

export function getClientLandingContent(business: BusinessProfile): BusinessLandingContent {
  if (business.landing) {
    return business.landing;
  }

  const firstService = business.services[0];

  return {
    eyebrow: business.industry,
    headline: business.tagline || `先了解${business.name}，再预约到店服务`,
    subheadline: business.description,
    primaryCta: "在线咨询",
    secondaryCta: "查看服务",
    trustPoints: ["价格先了解", "到店时间先沟通", "工作人员确认"],
    painPoints: ["客户反复问价格", "到店前需求不清楚", "消息容易漏回"],
    highlights: [
      {
        title: "先回答常见问题",
        description: "客户可以先了解价格、地址、营业时间和项目适合度。"
      },
      {
        title: "再记录预约意向",
        description: "客户留下联系方式、项目和期望时间后，门店再跟进确认。"
      },
      {
        title: "内容可按门店调整",
        description: "不同行业可以替换文案、主推项目、图片和行动按钮。"
      }
    ],
    journey: ["进入门店链接", "说明需求", "留下联系方式", "门店跟进确认"],
    proofMetrics: [
      { label: "主推服务", value: firstService ? `${firstService.name} ${firstService.price}` : business.industry },
      { label: "营业时间", value: business.openingHours },
      { label: "联系微信", value: business.wechat }
    ],
    finalCta: `想了解${firstService?.name ?? "门店服务"}，可以先在线咨询。`
  };
}
