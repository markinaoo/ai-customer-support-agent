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
  handoffMessage: "我已经把你的训练目标和联系方式记录好了，预约不会自动确认，稍后门店工作人员会联系你核对具体档期。",
  heroImage: "/images/hero-luna-fit.jpg",
  coverImage: "/images/hero-luna-fit.jpg",
  assistantLabel: "预约咨询",
  assistantIntro: "你好，这里是 LUNA FIT 预约咨询。你可以直接问价格、体验课、晚上档期，也可以先说说训练目标，我帮你判断从哪类课开始更合适。",
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
    },
    {
      id: "luna-faq-6",
      businessSlug: "luna-fit",
      question: "体验课包含什么？",
      answer: "体验课通常会先沟通训练目标和基础情况，再做基础动作指导，让你了解教练风格和训练强度。具体安排由工作人员确认。",
      sortOrder: 6
    },
    {
      id: "luna-faq-7",
      businessSlug: "luna-fit",
      question: "体测评估会测什么？",
      answer: "体测评估会了解基础身体数据、体态情况、运动基础和训练目标，用来判断更适合减脂、塑形、体态改善还是基础体能提升。",
      sortOrder: 7
    },
    {
      id: "luna-faq-8",
      businessSlug: "luna-fit",
      question: "减脂课和塑形课有什么区别？",
      answer: "减脂课更关注消耗、力量基础和训练节奏管理；塑形课更关注线条、臀腿、核心和体态改善。具体选择会结合你的目标确认。",
      sortOrder: 8
    },
    {
      id: "luna-faq-9",
      businessSlug: "luna-fit",
      question: "一周练几次比较合适？",
      answer: "新手通常可以先从每周2-3次开始，具体频率要看身体基础、恢复情况和训练目标，工作人员会根据你的情况建议。",
      sortOrder: 9
    },
    {
      id: "luna-faq-10",
      businessSlug: "luna-fit",
      question: "会不会强制办卡？",
      answer: "可以先做体测评估或体验课，不需要一上来决定长期课程。我这边没有看到强制办卡要求，后续训练方案会结合你的目标再介绍。",
      sortOrder: 10
    },
    {
      id: "luna-faq-11",
      businessSlug: "luna-fit",
      question: "可以只买单次课吗？",
      answer: "页面展示的体验课、体测评估和小团体训练都有单次价格。长期私教安排和购买方式需要工作人员进一步确认。",
      sortOrder: 11
    },
    {
      id: "luna-faq-12",
      businessSlug: "luna-fit",
      question: "训练会不会受伤？",
      answer: "训练会根据身体情况和目标安排强度，教练会做动作指导。若有旧伤、疼痛或特殊情况，建议提前告诉工作人员再确认是否适合训练。",
      sortOrder: 12
    },
    {
      id: "luna-faq-13",
      businessSlug: "luna-fit",
      question: "可以帮我安排饮食吗？",
      answer: "可以围绕减脂或塑形目标给出训练配合建议。具体饮食方案是否提供，需要工作人员根据你的目标和服务安排确认。",
      sortOrder: 13
    },
    {
      id: "luna-faq-14",
      businessSlug: "luna-fit",
      question: "有女教练吗？",
      answer: "当前资料里没有明确教练性别排班。可以留下想预约的时间和偏好，工作人员会帮你确认是否能安排。",
      sortOrder: 14
    },
    {
      id: "luna-faq-15",
      businessSlug: "luna-fit",
      question: "可以指定教练吗？",
      answer: "可以先提出偏好，但是否能指定要看教练排班。工作人员会联系你确认具体安排。",
      sortOrder: 15
    },
    {
      id: "luna-faq-16",
      businessSlug: "luna-fit",
      question: "迟到或临时改时间怎么办？",
      answer: "如果需要改时间，建议尽早联系工作人员确认。具体取消和改约规则需要以工作人员确认为准。",
      sortOrder: 16
    },
    {
      id: "luna-faq-17",
      businessSlug: "luna-fit",
      question: "训练后可以洗澡吗？",
      answer: "当前资料里没有明确洗浴设施信息。工作人员会在确认预约时一并说明到店设施和注意事项。",
      sortOrder: 17
    },
    {
      id: "luna-faq-18",
      businessSlug: "luna-fit",
      question: "附近停车方便吗？",
      answer: "当前资料里没有明确停车信息。可以到店前联系工作人员确认附近停车或交通建议。",
      sortOrder: 18
    },
    {
      id: "luna-faq-19",
      businessSlug: "luna-fit",
      question: "多久能看到效果？",
      answer: "效果和训练频率、饮食、基础情况、执行程度有关，不能保证具体时间。建议先做评估，再制定更适合的阶段目标。",
      sortOrder: 19
    },
    {
      id: "luna-faq-20",
      businessSlug: "luna-fit",
      question: "怎么预约体验课？",
      answer: "留下姓名、电话或微信、想体验的服务和希望到店时间即可。工作人员会联系你确认档期，不会自动确认预约。",
      sortOrder: 20
    }
  ]
};
