const NAME_BLOCKLIST =
  /^(新手|小白|零基础|学生|上班族|女生|男生|会员|顾客|客户|第一次|健身|减脂|塑形|体验|预约|电话|微信|手机|老师|教练|发型师|想|想要|想来|咨询|了解|看看)$/;

export function extractPhoneNumber(text: string) {
  return text.match(/(?:\+?86[-\s]?)?(1[3-9]\d[-\s]?\d{4}[-\s]?\d{4})/)?.[1]?.replace(/\D/g, "") ?? "";
}

export function extractWechatId(text: string) {
  const explicit = text.match(/(?:微信号?|微号|v信|vx|wechat|WeChat|WX|wx)[:：号是叫\s]*([A-Za-z0-9_-]{4,32})/);

  if (explicit?.[1]) {
    return explicit[1];
  }

  return "";
}

export function extractCustomerName(text: string) {
  const patterns = [
    /(?:我的)?(?:姓名|名字|称呼|联系人)[:：是叫\s]*([\u4e00-\u9fa5A-Za-z]{1,16})/,
    /(?:我叫|我是|叫我)[:：\s]*([\u4e00-\u9fa5A-Za-z]{1,16})/,
    /(?:姓)[:：\s]*([\u4e00-\u9fa5]{1,4})/
  ];

  for (const pattern of patterns) {
    const candidate = cleanNameCandidate(text.match(pattern)?.[1] ?? "");

    if (candidate) {
      return candidate;
    }
  }

  return "";
}

function cleanNameCandidate(value: string) {
  const cleaned = value
    .replace(/^(是|叫)/, "")
    .replace(/(电话|手机|微信|预约|想|要|来|做|问|咨询).*$/, "")
    .trim();

  if (!cleaned || NAME_BLOCKLIST.test(cleaned)) {
    return "";
  }

  return cleaned;
}
