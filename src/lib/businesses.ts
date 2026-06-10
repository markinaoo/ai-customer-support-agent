import { lunaFitBusiness } from "@/lib/luna-fit-demo";

export type Business = {
  slug: string;
  name: string;
  industry: string;
  address: string;
  openingHours: string;
  phone: string;
  wechat: string;
  tagline: string;
  description: string;
  brandTone: string;
  handoffMessage: string;
  heroImage: string;
  coverImage: string;
  assistantLabel?: string;
  assistantIntro?: string;
  landing?: BusinessLandingContent;
};

export type BusinessLandingContent = {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  trustPoints: string[];
  painPoints: string[];
  highlights: Array<{
    title: string;
    description: string;
  }>;
  journey: string[];
  proofMetrics: Array<{
    label: string;
    value: string;
  }>;
  finalCta: string;
};

export type Service = {
  id: string;
  businessSlug: string;
  name: string;
  price: string;
  description: string;
  duration: string;
  sortOrder: number;
};

export type FAQ = {
  id: string;
  businessSlug: string;
  question: string;
  answer: string;
  sortOrder: number;
};

export type BusinessProfile = Business & {
  services: Service[];
  faqs: FAQ[];
};

export type Lead = {
  id: string;
  businessSlug: string;
  name: string;
  phone: string;
  source: string;
  intent: string;
  status: "待跟进" | "已预约" | "已到店" | "已关闭";
  value: string;
  createdAt: string;
  lastMessage: string;
};

export type ConversationMessage = {
  role: "customer" | "ai" | "owner";
  text: string;
  time: string;
};

export type Conversation = {
  id: string;
  businessSlug: string;
  customer: string;
  channel: string;
  intent: string;
  status: "AI处理中" | "待人工跟进" | "已预约" | "已结束";
  updatedAt: string;
  summary: string;
  messages: ConversationMessage[];
};

export type MarketingTemplate = {
  id: string;
  name: string;
  channel: string;
  description: string;
};

export type MarketingDraft = {
  id: string;
  businessSlug: string;
  templateId: string;
  serviceName: string;
  campaignGoal: string;
  title: string;
  body: string;
  cta: string;
  createdAt: string;
};

type SeedService = Omit<Service, "id" | "businessSlug" | "sortOrder">;
type SeedFAQ = Omit<FAQ, "id" | "businessSlug" | "sortOrder">;
type SeedBusinessProfile = Business & {
  services: SeedService[];
  faqs: SeedFAQ[];
};

export const defaultDemoBusinessSlug = "luna-fit";

const seedBusinessProfiles: Record<string, SeedBusinessProfile> = {
  "bella-hair": {
    slug: "bella-hair",
    name: "贝拉造型美学",
    industry: "美容美发",
    address: "北京市朝阳区望京某某街道88号",
    openingHours: "周一至周六 10:00-21:00，周日休息",
    phone: "13800000000",
    wechat: "bella-hair-demo",
    tagline: "先帮顾客确认风格、价格边界和到店时间，再把高意向咨询交给门店跟进。",
    description:
      "贝拉造型美学是一家面向都市白领与社区客群的精品美容美发门店，主打显白染发、法式烫发、发质修护和日常造型。顾客到店前可以先说明发长、发质、预算和想要的风格，再由门店老师确认最终方案。",
    brandTone: "专业、温柔、有审美建议；像资深发型顾问一样先确认发长、发质、预算、风格偏好和到店时间，再推荐项目。",
    handoffMessage:
      "我已经帮你记录项目、时间和预算，稍后门店老师会通过电话或微信确认排班和最终方案。",
    heroImage: "/images/hero-bella-hair.jpg",
    coverImage: "/images/hero-bella-hair.jpg",
    assistantLabel: "发型预约咨询",
    assistantIntro:
      "你好，这里是贝拉造型美学预约咨询。你可以直接问剪发、染烫、护理价格，也可以先说发长、发量、想要的风格和到店时间，我帮你判断适合先咨询哪个项目。",
    landing: {
      eyebrow: "北京美容美发预约门店",
      headline: "先确认适合你的发型，再预约到店做方案",
      subheadline:
        "贝拉造型美学提供显白染发、法式烫发、洗剪吹、头皮护理和活动造型。顾客扫码后先把发长、发质、预算和想来的时间说清楚，再由门店老师确认档期和最终价格。",
      primaryCta: "先问发型顾问",
      secondaryCta: "查看项目价格",
      trustPoints: ["先看发长发质", "起步价清楚", "老师确认最终方案"],
      painPoints: ["不知道自己适合什么发色或发型", "担心到店后价格超出预期", "想先确认老师档期和大概耗时"],
      highlights: [
        {
          title: "先判断风格",
          description: "顾客可以先说明发长、发量、脸型、历史染烫和想要的风格，减少到店前反复沟通。"
        },
        {
          title: "价格有边界",
          description: "剪发、染烫、护理项目先展示起步价，最终价格再根据发量、长度和方案确认。"
        },
        {
          title: "线索可跟进",
          description: "顾客留下项目、到店时间和联系方式后，门店老师再确认排班、时长和最终方案。"
        }
      ],
      journey: ["扫码进入落地页", "说明发型需求", "咨询价格和耗时", "门店老师跟进确认"],
      proofMetrics: [
        { label: "营业时间", value: "10:00-21:00" },
        { label: "洗剪吹", value: "¥88起" },
        { label: "热门项目", value: "剪发/染烫/护理" }
      ],
      finalCta: "先说说你的发长、预算和想换的风格，门店老师会再确认适合的方案。"
    },
    services: [
      {
        name: "女士剪发",
        price: "¥68起",
        description: "根据脸型、发量和日常打理习惯给出修剪建议。",
        duration: "45-60分钟"
      },
      {
        name: "男士剪发",
        price: "¥48起",
        description: "清爽短发、商务发型与基础造型整理。",
        duration: "30-45分钟"
      },
      {
        name: "洗剪吹",
        price: "¥88起",
        description: "洗护、修剪、吹整一次完成，适合日常快速打理。",
        duration: "60分钟"
      },
      {
        name: "显白染发",
        price: "¥299起",
        description: "推荐通勤自然色、冷棕色、奶茶色等显白发色。",
        duration: "2-4小时"
      },
      {
        name: "法式烫发",
        price: "¥399起",
        description: "适合中长发蓬松卷度、纹理感和氛围感造型。",
        duration: "3-4小时"
      },
      {
        name: "头皮清洁护理",
        price: "¥199起",
        description: "清洁头皮油脂，搭配舒缓护理，适合头皮容易出油人群。",
        duration: "60-90分钟"
      },
      {
        name: "发质修护护理",
        price: "¥268起",
        description: "针对染烫后干枯、毛躁、打结做基础修护。",
        duration: "90分钟"
      },
      {
        name: "活动造型设计",
        price: "¥168起",
        description: "适合约会、拍摄、年会和日常精致造型。",
        duration: "45-90分钟"
      }
    ],
    faqs: [
      {
        question: "是否需要预约？",
        answer: "建议提前预约，尤其是染烫和护理项目需要预留较长时间。"
      },
      {
        question: "可以当天到店吗？",
        answer: "可以，但需要看当天发型师排班和空档时间。"
      },
      {
        question: "染发一般需要多久？",
        answer: "一般2-4小时，具体取决于发长、发量、是否漂发和颜色复杂度。"
      },
      {
        question: "可以指定发型师吗？",
        answer: "可以，建议先联系客服确认老师排班。"
      },
      {
        question: "价格是否固定？",
        answer: "标价为起步价，最终价格会根据头发长度、发量和具体方案确认。"
      },
      {
        question: "染发前需要洗头吗？",
        answer: "一般不需要特意洗头，具体可到店后由发型师判断。"
      },
      {
        question: "烫发会不会很伤头发？",
        answer: "会根据发质评估方案，也会建议搭配护理减少毛躁和干枯。"
      },
      {
        question: "男士剪发可以晚上来吗？",
        answer: "营业到21:00，建议提前确认晚间空档。"
      },
      {
        question: "儿童可以剪发吗？",
        answer: "可以，建议提前说明儿童年龄和希望到店时间。"
      },
      {
        question: "可以先咨询适合什么发型吗？",
        answer: "可以，建议描述脸型、发长、发量和想要的风格，AI会先帮你整理需求。"
      }
    ]
  },
  "lily-nail": {
    slug: "lily-nail",
    name: "Lily Nail Studio",
    industry: "美甲美睫",
    address: "上海市徐汇区衡山路某某弄18号2层",
    openingHours: "周一至周日 11:00-22:00",
    phone: "13900001111",
    wechat: "lily-nail-demo",
    tagline: "用AI先接住款式、预算和档期咨询，让美甲美睫预约更顺畅。",
    description:
      "Lily Nail Studio 是一家社区精品美甲美睫工作室，主打通勤显白美甲、手绘设计、延长甲、睫毛嫁接和眉眼管理服务，适合重视细节和款式沟通的顾客。",
    brandTone: "亲切、精致、懂流行；先问场景、肤色、款式图片和预算，再推荐合适项目。",
    handoffMessage:
      "我先帮你记录款式、预算和想来的时间，稍后美甲师会确认档期，并提醒是否需要预留卸甲或修补时间。",
    heroImage: "/images/hero-lily-nail.jpg",
    coverImage: "/images/hero-lily-nail.jpg",
    services: [
      {
        name: "纯色美甲",
        price: "¥98起",
        description: "适合通勤、显白、低调精致款式，可选热门色号。",
        duration: "60-90分钟"
      },
      {
        name: "法式美甲",
        price: "¥138起",
        description: "经典法式、微笑线、细闪法式等款式。",
        duration: "90分钟"
      },
      {
        name: "猫眼美甲",
        price: "¥168起",
        description: "磁吸猫眼、冰透猫眼和显白氛围感款式。",
        duration: "90-120分钟"
      },
      {
        name: "手绘设计款",
        price: "¥238起",
        description: "根据图片或主题定制图案，适合拍照和节日款。",
        duration: "2-3小时"
      },
      {
        name: "延长甲",
        price: "¥298起",
        description: "适合想改善甲型、增加长度和精致度的顾客。",
        duration: "2.5-3.5小时"
      },
      {
        name: "卸甲护理",
        price: "¥48起",
        description: "温和卸甲，搭配基础甲面护理。",
        duration: "30-45分钟"
      },
      {
        name: "单根睫毛嫁接",
        price: "¥198起",
        description: "自然放大双眼，适合日常通勤妆感。",
        duration: "90-120分钟"
      },
      {
        name: "开花睫毛嫁接",
        price: "¥298起",
        description: "更浓密、更有存在感，适合拍摄或精致妆容。",
        duration: "120分钟"
      },
      {
        name: "眉形修整",
        price: "¥68起",
        description: "基础修眉、眉形调整和眉周清洁。",
        duration: "30分钟"
      }
    ],
    faqs: [
      {
        question: "做美甲需要提前预约吗？",
        answer: "建议提前预约，设计款和延长甲需要预留更长时间。"
      },
      {
        question: "可以带图来做吗？",
        answer: "可以，建议先发图片，老师会判断相似度、价格和所需时间。"
      },
      {
        question: "卸甲是否收费？",
        answer: "本店作品复做可按活动规则减免，外店卸甲一般¥48起。"
      },
      {
        question: "美甲能维持多久？",
        answer: "正常可维持3-5周，具体和甲面状态、生活习惯有关。"
      },
      {
        question: "睫毛嫁接会不会不舒服？",
        answer: "操作过程会尽量保持轻柔，如眼部敏感建议提前说明。"
      },
      {
        question: "可以当天到店吗？",
        answer: "可以看当天档期，热门时段建议提前预约。"
      },
      {
        question: "价格为什么会有区间？",
        answer: "最终价格会根据款式复杂度、钻饰、手绘和是否延长确认。"
      },
      {
        question: "短甲可以做款式吗？",
        answer: "可以，短甲也能做显白纯色、法式和简单设计款。"
      },
      {
        question: "孕期可以做美甲吗？",
        answer: "建议根据个人情况谨慎选择，如有顾虑可先咨询医生意见。"
      },
      {
        question: "可以指定美甲师吗？",
        answer: "可以，建议提前确认老师档期。"
      }
    ]
  },
  "glow-skin": {
    slug: "glow-skin",
    name: "Glow Skin Care",
    industry: "皮肤管理",
    address: "深圳市南山区科技园某某路66号A座1203",
    openingHours: "周二至周日 10:30-20:30，周一店休",
    phone: "13700002222",
    wechat: "glow-skin-demo",
    tagline: "用AI先完成肤质咨询和项目说明，让皮肤管理线索更清晰。",
    description:
      "Glow Skin Care 是一家城市皮肤管理工作室，提供清洁补水、舒缓修护、淡痘印、光电养护和敏感肌护理咨询，适合希望先了解项目适配度和护理周期的顾客。",
    brandTone: "可信、克制、专业；不夸大效果，先了解肤质、诉求、禁忌和护理周期。",
    handoffMessage:
      "我已经帮你记录肤质、主要困扰和想预约的时间，稍后皮肤管理师会进一步确认是否适合该项目。",
    heroImage: "/images/hero-glow-skin.jpg",
    coverImage: "/images/hero-glow-skin.jpg",
    services: [
      {
        name: "深层清洁管理",
        price: "¥198起",
        description: "适合油脂分泌旺盛、黑头白头和毛孔粗大困扰。",
        duration: "75分钟"
      },
      {
        name: "补水亮肤护理",
        price: "¥268起",
        description: "基础补水、提亮暗沉，适合换季干燥和熬夜肤色。",
        duration: "90分钟"
      },
      {
        name: "敏感肌舒缓修护",
        price: "¥328起",
        description: "针对泛红、紧绷、屏障脆弱做温和舒缓护理。",
        duration: "90分钟"
      },
      {
        name: "痘肌净肤管理",
        price: "¥368起",
        description: "针对痘痘、闭口和出油问题做阶段性管理建议。",
        duration: "90-120分钟"
      },
      {
        name: "淡印焕亮管理",
        price: "¥398起",
        description: "适合痘印、肤色不均和暗沉人群，需按周期评估。",
        duration: "90分钟"
      },
      {
        name: "小气泡清洁",
        price: "¥168起",
        description: "温和清洁毛孔，适合首次体验和日常保养。",
        duration: "60分钟"
      },
      {
        name: "光电基础养护",
        price: "¥599起",
        description: "根据肤质和需求评估适合的基础光电项目。",
        duration: "60-90分钟"
      },
      {
        name: "面部轮廓护理",
        price: "¥458起",
        description: "放松面部肌肉，搭配基础提升和紧致护理。",
        duration: "90分钟"
      },
      {
        name: "新客肤质评估",
        price: "¥49起",
        description: "了解肤质、作息和护理目标，给出项目建议。",
        duration: "30分钟"
      }
    ],
    faqs: [
      {
        question: "第一次来适合做什么？",
        answer: "建议先做肤质评估，再根据清洁、补水、敏感或痘肌需求选择项目。"
      },
      {
        question: "皮肤敏感可以做护理吗？",
        answer: "可以先咨询，但需要说明敏感情况、过敏史和近期护肤/医美项目。"
      },
      {
        question: "做完护理会泛红吗？",
        answer: "部分清洁或修护项目后可能短暂泛红，具体会根据肤质提前说明。"
      },
      {
        question: "多久做一次比较合适？",
        answer: "基础清洁和补水一般2-4周一次，具体频率需根据肤质和项目决定。"
      },
      {
        question: "可以当天化妆吗？",
        answer: "多数护理后建议当天减少浓妆，具体以项目后注意事项为准。"
      },
      {
        question: "痘肌护理一次有效吗？",
        answer: "痘肌通常需要周期管理，不建议承诺一次解决。"
      },
      {
        question: "光电项目需要预约吗？",
        answer: "需要提前预约，并先确认肤质、禁忌和近期护理史。"
      },
      {
        question: "孕期或哺乳期可以做吗？",
        answer: "建议先说明情况，部分项目不建议操作，必要时咨询医生意见。"
      },
      {
        question: "价格为什么是起步价？",
        answer: "不同肤质、护理组合和耗材会影响最终价格，到店评估后确认。"
      },
      {
        question: "可以指定皮肤管理师吗？",
        answer: "可以，建议提前确认老师排班。"
      },
      {
        question: "做完需要注意什么？",
        answer: "通常需要注意防晒、保湿、少熬夜，具体会按项目给到提醒。"
      }
    ]
  }
};

export const businesses: Business[] = Object.values(seedBusinessProfiles).map((profile) => ({
  slug: profile.slug,
  name: profile.name,
  industry: profile.industry,
  address: profile.address,
  openingHours: profile.openingHours,
  phone: profile.phone,
  wechat: profile.wechat,
  tagline: profile.tagline,
  description: profile.description,
  brandTone: profile.brandTone,
  handoffMessage: profile.handoffMessage,
  heroImage: profile.heroImage,
  coverImage: profile.coverImage,
  assistantLabel: profile.assistantLabel,
  assistantIntro: profile.assistantIntro,
  landing: profile.landing
}));

export const services: Service[] = Object.values(seedBusinessProfiles).flatMap((business) =>
  business.services.map((service, index) => ({
    id: `${business.slug}-service-${index + 1}`,
    businessSlug: business.slug,
    sortOrder: index + 1,
    ...service
  }))
);

export const faqs: FAQ[] = Object.values(seedBusinessProfiles).flatMap((business) =>
  business.faqs.map((faq, index) => ({
    id: `${business.slug}-faq-${index + 1}`,
    businessSlug: business.slug,
    sortOrder: index + 1,
    ...faq
  }))
);

export const leads: Lead[] = [
  {
    id: "L-1008",
    businessSlug: "bella-hair",
    name: "张女士",
    phone: "139****2688",
    source: "AI聊天页",
    intent: "想咨询显白染发",
    status: "待跟进",
    value: "¥399",
    createdAt: "今天 15:24",
    lastMessage: "周六下午还有发型师吗？"
  },
  {
    id: "L-1007",
    businessSlug: "bella-hair",
    name: "陈先生",
    phone: "186****7301",
    source: "商家主页",
    intent: "男士剪发，附近到店",
    status: "已预约",
    value: "¥48",
    createdAt: "今天 12:18",
    lastMessage: "我大概晚上7点到。"
  },
  {
    id: "L-1006",
    businessSlug: "bella-hair",
    name: "Lily",
    phone: "158****9102",
    source: "二维码",
    intent: "头皮护理和洗剪吹",
    status: "已到店",
    value: "¥287",
    createdAt: "昨天 19:42",
    lastMessage: "护理做完很舒服。"
  },
  {
    id: "L-1005",
    businessSlug: "bella-hair",
    name: "王女士",
    phone: "137****4520",
    source: "朋友圈文案",
    intent: "烫发价格比较",
    status: "待跟进",
    value: "¥499",
    createdAt: "昨天 16:05",
    lastMessage: "我想看看中长发大概多少钱。"
  },
  {
    id: "L-2104",
    businessSlug: "lily-nail",
    name: "许小姐",
    phone: "136****5118",
    source: "小红书笔记",
    intent: "猫眼美甲，想看显白款",
    status: "待跟进",
    value: "¥168",
    createdAt: "今天 14:10",
    lastMessage: "我有一张图，能做类似的吗？"
  },
  {
    id: "L-2103",
    businessSlug: "lily-nail",
    name: "Mia",
    phone: "188****2409",
    source: "二维码",
    intent: "睫毛嫁接，下班后到店",
    status: "已预约",
    value: "¥298",
    createdAt: "今天 11:36",
    lastMessage: "今晚8点还有位置吗？"
  },
  {
    id: "L-2102",
    businessSlug: "lily-nail",
    name: "周女士",
    phone: "159****6207",
    source: "社群活动",
    intent: "卸甲后重做法式",
    status: "已到店",
    value: "¥186",
    createdAt: "昨天 18:02",
    lastMessage: "我想做短甲法式。"
  },
  {
    id: "L-3104",
    businessSlug: "glow-skin",
    name: "林女士",
    phone: "135****9088",
    source: "AI聊天页",
    intent: "敏感肌舒缓修护",
    status: "待跟进",
    value: "¥328",
    createdAt: "今天 16:32",
    lastMessage: "我最近泛红，能先咨询吗？"
  },
  {
    id: "L-3103",
    businessSlug: "glow-skin",
    name: "赵小姐",
    phone: "182****7310",
    source: "商家主页",
    intent: "小气泡清洁首次体验",
    status: "已预约",
    value: "¥168",
    createdAt: "今天 10:48",
    lastMessage: "周日下午可以做小气泡吗？"
  },
  {
    id: "L-3102",
    businessSlug: "glow-skin",
    name: "Amy",
    phone: "157****0196",
    source: "朋友圈文案",
    intent: "痘肌净肤管理",
    status: "待跟进",
    value: "¥368",
    createdAt: "昨天 20:17",
    lastMessage: "痘痘反复，想知道要做几次。"
  }
];

export const conversations: Conversation[] = [
  {
    id: "C-2031",
    businessSlug: "bella-hair",
    customer: "张女士",
    channel: "AI聊天页",
    intent: "染发预约",
    status: "待人工跟进",
    updatedAt: "今天 15:26",
    summary: "顾客想做显白发色，倾向周六下午到店，预算约300-500元。",
    messages: [
      {
        role: "customer",
        text: "我想染个显白一点的颜色，周六下午可以吗？",
        time: "15:21"
      },
      {
        role: "ai",
        text: "可以先看周六排班。显白染发¥299起，一般2-4小时，最终会根据发长和颜色方案确认。",
        time: "15:22"
      },
      {
        role: "customer",
        text: "我头发到锁骨，能不能安排一个有经验的老师？",
        time: "15:24"
      }
    ]
  },
  {
    id: "C-2030",
    businessSlug: "bella-hair",
    customer: "陈先生",
    channel: "商家主页",
    intent: "男士剪发",
    status: "已预约",
    updatedAt: "今天 12:22",
    summary: "顾客住在附近，已确认今晚19:00到店男士剪发。",
    messages: [
      {
        role: "customer",
        text: "男士剪发多少钱？今晚能剪吗？",
        time: "12:17"
      },
      {
        role: "ai",
        text: "男士剪发¥48起，今晚可以先帮你登记，具体排班建议到店前确认。",
        time: "12:18"
      },
      {
        role: "owner",
        text: "已帮你预约19:00，到店报手机号即可。",
        time: "12:22"
      }
    ]
  },
  {
    id: "C-2029",
    businessSlug: "bella-hair",
    customer: "王女士",
    channel: "朋友圈文案",
    intent: "烫发咨询",
    status: "AI处理中",
    updatedAt: "昨天 16:09",
    summary: "顾客正在比较烫发价格，AI已解释价格与发长、发量和造型复杂度相关。",
    messages: [
      {
        role: "customer",
        text: "中长发烫发大概要多少钱？",
        time: "16:05"
      },
      {
        role: "ai",
        text: "法式烫发¥399起，中长发通常会根据卷度、发量和护理组合确认最终价格。",
        time: "16:06"
      }
    ]
  },
  {
    id: "C-2121",
    businessSlug: "lily-nail",
    customer: "许小姐",
    channel: "小红书笔记",
    intent: "猫眼美甲",
    status: "待人工跟进",
    updatedAt: "今天 14:15",
    summary: "顾客想做显白猫眼款，已准备图片，关心相似度和周末档期。",
    messages: [
      {
        role: "customer",
        text: "我想做一个显白猫眼，有图可以发你们看吗？",
        time: "14:10"
      },
      {
        role: "ai",
        text: "可以的。猫眼美甲¥168起，你可以先发款式图，老师会判断相似度、价格和所需时间。",
        time: "14:11"
      },
      {
        role: "customer",
        text: "周六下午还有美甲师吗？",
        time: "14:13"
      }
    ]
  },
  {
    id: "C-2120",
    businessSlug: "lily-nail",
    customer: "Mia",
    channel: "二维码",
    intent: "睫毛嫁接",
    status: "已预约",
    updatedAt: "今天 11:42",
    summary: "顾客下班后想做开花睫毛，已确认今晚20:00到店。",
    messages: [
      {
        role: "customer",
        text: "开花睫毛大概要多久？今晚8点能做吗？",
        time: "11:36"
      },
      {
        role: "ai",
        text: "开花睫毛嫁接¥298起，一般需要120分钟左右。我先帮你记录今晚20:00的需求。",
        time: "11:37"
      },
      {
        role: "owner",
        text: "今晚20:00可以安排，到店前不要夹睫毛或刷睫毛膏。",
        time: "11:42"
      }
    ]
  },
  {
    id: "C-3121",
    businessSlug: "glow-skin",
    customer: "林女士",
    channel: "AI聊天页",
    intent: "敏感肌修护",
    status: "待人工跟进",
    updatedAt: "今天 16:36",
    summary: "顾客近期泛红，想先确认敏感肌是否适合做舒缓修护。",
    messages: [
      {
        role: "customer",
        text: "我最近脸泛红，敏感肌可以做护理吗？",
        time: "16:32"
      },
      {
        role: "ai",
        text: "可以先咨询。敏感肌舒缓修护¥328起，需要先了解过敏史、近期护肤和医美项目。",
        time: "16:33"
      },
      {
        role: "customer",
        text: "我想周日来，能先帮我登记吗？",
        time: "16:35"
      }
    ]
  },
  {
    id: "C-3120",
    businessSlug: "glow-skin",
    customer: "赵小姐",
    channel: "商家主页",
    intent: "小气泡清洁",
    status: "已预约",
    updatedAt: "今天 10:54",
    summary: "顾客首次体验小气泡清洁，已预约周日下午。",
    messages: [
      {
        role: "customer",
        text: "第一次来，想做小气泡可以吗？",
        time: "10:48"
      },
      {
        role: "ai",
        text: "可以。小气泡清洁¥168起，适合首次体验和日常毛孔清洁。",
        time: "10:49"
      },
      {
        role: "owner",
        text: "已帮你预约周日下午，建议到店前少化浓妆。",
        time: "10:54"
      }
    ]
  }
];

export const marketingTemplates: MarketingTemplate[] = [
  {
    id: "moments",
    name: "朋友圈种草文案",
    channel: "微信朋友圈",
    description: "适合门店日常促销、服务介绍和顾客案例分享。"
  },
  {
    id: "xiaohongshu",
    name: "小红书笔记",
    channel: "小红书",
    description: "突出场景、体验、价格锚点和预约行动。"
  },
  {
    id: "group",
    name: "社群活动通知",
    channel: "微信群",
    description: "适合限时活动、空档排班和老客召回。"
  }
];

export const marketing_drafts: MarketingDraft[] = [
  {
    id: "MD-1001",
    businessSlug: "bella-hair",
    templateId: "moments",
    serviceName: "显白染发",
    campaignGoal: "提升本周染发预约",
    title: "贝拉造型美学｜显白染发 ¥299起",
    body:
      "想换一个更显白、更适合通勤的发色，可以先通过AI客服说明发长、预算和想来的时间。系统会先回答常见问题，再帮门店记录高意向咨询。",
    cta: "点击AI商家链接，先咨询再预约。",
    createdAt: "今天 09:30"
  },
  {
    id: "MD-2101",
    businessSlug: "lily-nail",
    templateId: "xiaohongshu",
    serviceName: "猫眼美甲",
    campaignGoal: "吸引周末美甲预约",
    title: "猫眼美甲体验｜显白又有氛围感",
    body:
      "想做显白猫眼款，可以先把图片、预算和想来的时间发给AI客服。系统会先说明价格区间和所需时间，再同步给美甲师确认档期。",
    cta: "点开AI商家链接，先发图咨询。",
    createdAt: "今天 10:20"
  },
  {
    id: "MD-3101",
    businessSlug: "glow-skin",
    templateId: "group",
    serviceName: "敏感肌舒缓修护",
    campaignGoal: "预约敏感肌咨询",
    title: "Glow Skin Care 本周敏感肌护理咨询",
    body:
      "近期脸部泛红、紧绷或屏障不稳定的顾客，可以先通过AI客服说明肤质、过敏史和想预约的时间，再由皮肤管理师确认是否适合项目。",
    cta: "回复肤质+时间，AI客服会先帮你登记。",
    createdAt: "昨天 18:00"
  }
];

export function getBusiness(slug: string): BusinessProfile | undefined {
  if (slug === lunaFitBusiness.slug) {
    return lunaFitBusiness;
  }

  const business = businesses.find((item) => item.slug === slug);

  if (!business) {
    return undefined;
  }

  return {
    ...business,
    services: getBusinessServices(slug),
    faqs: getBusinessFaqs(slug)
  };
}

export function getBusinessSlugs(): string[] {
  return [lunaFitBusiness.slug, ...businesses.map((business) => business.slug)];
}

export function getBusinessServices(slug: string): Service[] {
  return services
    .filter((service) => service.businessSlug === slug)
    .sort((left, right) => left.sortOrder - right.sortOrder);
}

export function getBusinessFaqs(slug: string): FAQ[] {
  return faqs.filter((faq) => faq.businessSlug === slug).sort((left, right) => left.sortOrder - right.sortOrder);
}

export function getBusinessLeads(slug: string): Lead[] {
  return leads.filter((lead) => lead.businessSlug === slug);
}

export function getBusinessConversations(slug: string): Conversation[] {
  return conversations.filter((conversation) => conversation.businessSlug === slug);
}

export function getBusinessMarketingDrafts(slug: string): MarketingDraft[] {
  return marketing_drafts.filter((draft) => draft.businessSlug === slug);
}

export function getBusinessMetrics(slug: string) {
  const scopedLeads = getBusinessLeads(slug);
  const scopedConversations = getBusinessConversations(slug);
  const profileViewBase: Record<string, number> = {
    "bella-hair": 1286,
    "lily-nail": 964,
    "glow-skin": 1118
  };

  return {
    profileViews: profileViewBase[slug] ?? 680,
    chatSessions: scopedConversations.length + 42,
    newLeads: scopedLeads.length,
    booked: scopedLeads.filter((lead) => lead.status === "已预约" || lead.status === "已到店").length,
    conversionRate: scopedLeads.length ? `${Math.round((scopedLeads.filter((lead) => lead.status === "已预约" || lead.status === "已到店").length / scopedLeads.length) * 100)}%` : "0%",
    avgReplyTime: "8秒"
  };
}

export function createMockChatReply(business: BusinessProfile, message: string) {
  const content = message.toLowerCase();
  const matchedService = business.services.find((service) => content.includes(service.name.toLowerCase().slice(0, 2)));

  if (matchedService) {
    return `${matchedService.name}是${matchedService.price}，预计需要${matchedService.duration}。${matchedService.description} 最终价格和档期建议到店前由老师确认。${business.handoffMessage}`;
  }

  if (content.includes("预约") || content.includes("今天") || content.includes("明天") || content.includes("周") || content.includes("下午") || content.includes("晚上")) {
    return `建议提前预约。门店营业时间是${business.openingHours}。如果你告诉我想做的项目、到店日期、时间段和联系方式，我可以先帮你记录为待跟进线索。`;
  }

  if (content.includes("地址") || content.includes("在哪") || content.includes("位置")) {
    return `门店地址是${business.address}。你也可以添加微信 ${business.wechat} 确认路线和排班。`;
  }

  if (content.includes("价格") || content.includes("多少钱") || content.includes("预算") || content.includes("贵")) {
    const serviceSummary = business.services
      .slice(0, 4)
      .map((service) => `${service.name}${service.price}`)
      .join("、");
    return `目前热门项目包括${serviceSummary}。最终价格会根据项目复杂度、耗材和现场评估确认，我可以继续帮你匹配合适服务。`;
  }

  return `已收到。${business.name} 可以提供${business.services
    .slice(0, 5)
    .map((service) => service.name)
    .join("、")}等服务。你可以告诉我想做的项目、预算和到店时间，我会先根据门店FAQ回答，并把高意向咨询同步到老板看板。`;
}

export function createMarketingDraft(
  business: BusinessProfile,
  templateId: string,
  serviceName: string,
  campaignGoal: string
) {
  const service = business.services.find((item) => item.name === serviceName) ?? business.services[0];
  const template = marketingTemplates.find((item) => item.id === templateId) ?? marketingTemplates[0];
  const goal = campaignGoal || "提升本周预约咨询";

  if (template.id === "xiaohongshu") {
    return {
      title: `${service.name}体验｜想变美又怕踩雷，可以先问清楚`,
      body: `最近很多顾客来店前都会先问：我适合什么项目？大概要多久？价格是不是固定？\n\n在 ${business.name}，${service.name}${service.price}，到店前可以先通过AI客服说明需求、预算和想来的时间。系统会先回答常见问题，再把高意向需求同步给门店。\n\n适合：想提前了解项目、工作日没时间反复沟通、希望提前确认档期的人。\n\n地址：${business.address}\n预约微信：${business.wechat}\n\n#${business.industry} #门店体验 #变美预约 #${service.name}`,
      cta: "点击主页链接，先让AI客服帮你问清楚。"
    };
  }

  if (template.id === "group") {
    return {
      title: `${business.name} 本周档期提醒`,
      body: `本周想做${service.name}的朋友可以提前约档。\n\n项目：${service.name} ${service.price}\n目标：${goal}\n营业时间：${business.openingHours}\n\n当天到店可以接待，但要看档期。需要指定老师的朋友，建议先加微信 ${business.wechat} 确认。`,
      cta: "回复项目+时间，AI客服会先帮你登记。"
    };
  }

  return {
    title: `${business.name}｜${service.name} ${service.price}`,
    body: `想做一个更适合自己的变美项目，可以先从${service.name}开始。\n\n${business.name} 位于${business.address}，主营${business.services
      .slice(0, 4)
      .map((item) => item.name)
      .join("、")}等服务。${service.name}${service.price}，具体会根据项目方案和现场评估确认。\n\n现在通过AI客服可以先问价格、时间、是否需要预约、能否指定老师。高意向咨询会同步给门店，避免消息漏回。\n\n营业时间：${business.openingHours}\n微信：${business.wechat}`,
    cta: "点开AI商家链接，先咨询再预约。"
  };
}
