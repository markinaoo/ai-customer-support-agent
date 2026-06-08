import type { BusinessProfile } from "@/lib/businesses";

export const lunaFitBusiness: BusinessProfile = {
  slug: "luna-fit",
  name: "LUNA FIT 私教健身工作室",
  industry: "健身房 / 私教工作室",
  address: "上海市徐汇区XX路88号",
  openingHours: "周一至周日 09:00-22:00",
  phone: "138-0000-8888",
  wechat: "LUNAFIT888",
  tagline: "先了解目标和身体情况，再由工作人员确认合适的体验课安排。",
  description:
    "LUNA FIT 是一家精品私教健身工作室，专注减脂、塑形、体态改善和一对一训练，适合上班族、健身新手和想要长期改善身体状态的人群。",
  brandTone: "专业、亲切、有行动力",
  handoffMessage: "我已经记录你的训练目标和联系方式，稍后门店工作人员会联系你确认体验课或训练安排。",
  heroImage: "/images/hero-luna-fit.jpg",
  coverImage: "/images/hero-luna-fit.jpg",
  assistantLabel: "在线预约助理",
  assistantIntro: "你好，我是 LUNA FIT 的在线预约助理。可以先帮你了解课程价格、是否适合新手、晚上档期和到店准备。",
  landing: {
    eyebrow: "上海精品私教工作室",
    headline: "想开始训练，先做一次适合你的评估和体验课",
    subheadline:
      "LUNA FIT 专注减脂、塑形、体态改善和一对一训练。留下目标和时间后，工作人员会联系你确认合适的课程安排。",
    primaryCta: "咨询体验课",
    secondaryCta: "查看课程价格",
    trustPoints: ["适合健身新手", "一对一动作指导", "工作人员确认预约"],
    painPoints: ["不知道自己适合什么训练", "担心没有基础跟不上", "晚上想约课但不确定档期"],
    highlights: [
      {
        title: "先评估再训练",
        description: "通过体测、目标和基础情况判断训练方向，避免盲目开始。"
      },
      {
        title: "价格先讲清楚",
        description: "体验课、体测、私教课和小团体训练价格公开展示，到店前先了解。"
      },
      {
        title: "预约不自动确认",
        description: "客户留下时间和联系方式后，由工作人员跟进确认具体档期。"
      }
    ],
    journey: ["扫码进入咨询页", "说明目标和基础", "留下电话或微信", "工作人员确认体验课"],
    proofMetrics: [
      { label: "营业时间", value: "09:00-22:00" },
      { label: "体验课", value: "¥199/次" },
      { label: "适合人群", value: "新手/上班族" }
    ],
    finalCta: "先说说你的训练目标，工作人员会确认适合你的体验课时间。"
  },
  services: [
    {
      id: "luna-service-1",
      businessSlug: "luna-fit",
      name: "体测评估",
      price: "¥99/次",
      description: "基础身体数据、体态和训练目标评估，帮助教练判断适合的训练方向。",
      duration: "45-60分钟",
      sortOrder: 1
    },
    {
      id: "luna-service-2",
      businessSlug: "luna-fit",
      name: "一对一私教体验课",
      price: "¥199/次",
      description: "适合首次到店体验，教练会根据目标安排基础训练和动作指导。",
      duration: "60分钟",
      sortOrder: 2
    },
    {
      id: "luna-service-3",
      businessSlug: "luna-fit",
      name: "减脂私教课",
      price: "¥399/节",
      description: "围绕减脂目标进行力量训练、有氧安排和训练节奏管理。",
      duration: "60分钟",
      sortOrder: 3
    },
    {
      id: "luna-service-4",
      businessSlug: "luna-fit",
      name: "塑形私教课",
      price: "¥399/节",
      description: "针对线条、臀腿、核心和上肢塑形目标进行一对一训练。",
      duration: "60分钟",
      sortOrder: 4
    },
    {
      id: "luna-service-5",
      businessSlug: "luna-fit",
      name: "小团体训练",
      price: "¥99/次",
      description: "适合朋友结伴训练或入门阶段建立运动习惯。",
      duration: "45-60分钟",
      sortOrder: 5
    },
    {
      id: "luna-service-6",
      businessSlug: "luna-fit",
      name: "月度训练计划",
      price: "¥599/月",
      description: "根据训练目标提供阶段性计划，适合想长期改善身体状态的人群。",
      duration: "按月执行",
      sortOrder: 6
    }
  ],
  faqs: [
    {
      id: "luna-faq-1",
      businessSlug: "luna-fit",
      question: "第一次来需要准备什么？",
      answer: "穿运动服和运动鞋即可，建议提前10分钟到店做基础体测。",
      sortOrder: 1
    },
    {
      id: "luna-faq-2",
      businessSlug: "luna-fit",
      question: "可以先体验吗？",
      answer: "可以，门店提供一对一私教体验课和基础体测评估。",
      sortOrder: 2
    },
    {
      id: "luna-faq-3",
      businessSlug: "luna-fit",
      question: "适合没有运动基础的人吗？",
      answer: "适合，教练会根据你的身体情况和目标安排训练强度。",
      sortOrder: 3
    },
    {
      id: "luna-faq-4",
      businessSlug: "luna-fit",
      question: "可以预约晚上吗？",
      answer: "可以，晚上是预约高峰，建议提前一天预约。",
      sortOrder: 4
    },
    {
      id: "luna-faq-5",
      businessSlug: "luna-fit",
      question: "主要适合哪些人？",
      answer: "适合想减脂、塑形、改善体态、提升体能的上班族和健身新手。",
      sortOrder: 5
    }
  ]
};
