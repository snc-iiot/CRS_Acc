export const CertificationStandards = [
  {
    id: 1,
    label: "ISO 9001",
    isOption: false,
    options: [],
  },
  {
    id: 2,
    label: "IATF 16949:2016",
    isOption: false,
    options: [],
  },
  {
    id: 3,
    label: "OHSAS 18001:2007",
    isOption: false,
    options: [],
  },
  {
    id: 4,
    label: "มรท. 8001-2546",
    isOption: false,
    options: [],
  },
  {
    id: 5,
    label: "ฉลากประหยัดไฟ เบอร์ 5",
    isOption: true,
    options: [
      {
        id: 1,
        label: "ฉลากประหยัดไฟ เบอร์ 5",
      },
      {
        id: 2,
        label: "ฉลากประหยัดไฟ เบอร์ 6",
      },
      {
        id: 3,
        label: "ฉลากประหยัดไฟ เบอร์ 7",
      },
    ],
  },
  {
    id: 6,
    label: "ฉลากเขียว",
    isOption: false,
    options: [],
  },
  {
    id: 7,
    label: "สัญลักษณ์ Green Industry",
    isOption: true,
    options: [
      {
        id: 1,
        label: "สัญลักษณ์ Green Industry",
      },
      {
        id: 2,
        label: "สัญลักษณ์ Green Industry",
      },
      {
        id: 3,
        label: "สัญลักษณ์ Green Industry",
      },
    ],
  },
  {
    id: 8,
    label: "ISO 14001:2015",
    isOption: false,
    options: [],
  },
  {
    id: 9,
    label: "TIS 18001:1999",
    isOption: false,
    options: [],
  },
  {
    id: 10,
    label: "ISO 26000",
    isOption: false,
    options: [],
  },
  {
    id: 11,
    label: "ISO/IEC 17025:2017",
    isOption: false,
    options: [],
  },
  {
    id: 12,
    label: "สัญลักษณ์ FSC",
    isOptions: true,
    options: [],
  },
  {
    id: 13,
    label: "ฉลาก Carbon Reduction",
    isOption: false,
    options: [],
  },
  {
    id: 14,
    label: "การรับรองอุตสาหกรรมสีเขียว (GI)",
    isOption: true,
    options: [{ id: 1, label: "ระดับที่ื 1" }],
  },
  {
    id: 15,
    label: "ไม่มี",
    isOption: false,
    options: [],
  },
];

export const BenefitsStandards = [
  {
    id: "boi",
    label: "BOI",
    isOption: false,
    options: [],
  },
  {
    id: "freezone",
    label: "Free Zone",
    isOption: false,
    options: [],
  },
  {
    id: "jtepa",
    label: "JTEPA",
    isOption: false,
    options: [],
  },
  {
    id: "fta",
    label: "ไม่ได้รับสิทธิประโยชน์ใดๆ",
    isOption: false,
    options: [],
  },
];

export const CompanyPolicies = [
  "มีนโยบายการต่อต้านทุจริตคอร์รัปชั่น",
  "มีนโยบายไม่รับแรงงานต่ำกวา 18 ปี",
  "มีนโยบายการประเมินผลกระทบต่อสื่งแวดล้อมต่อตนเอง และชุมชนโดยรอบ",
  "มีนโยบายการเปิดเผยช่องทางให้ติดต่อร้องเรียน",
  "มีนโยบายประเมินความปลอดภัย อาชีวอนามัยและสภาพแวดล้อมในการทำงาน",
  "มีนโยบายสวัสดิการแรงงานตามกฎหมายกำหนด",
];

export const ObjectivePurchasing = [
  {
    label: "ซื้อมาขายไป",
    name: "buyAndSell",
  },
  {
    label: "ผลิตงาน",
    name: "produce",
  },
  {
    label: "อื่นๆ",
    name: "other",
  },
];

export const MainCustomerOfCompany = [
  {
    label: "ลูกค้าในประเทศไทย",
    name: "local",
  },
  {
    label: "ต่างประเทศ",
    name: "foreign",
  },
];
