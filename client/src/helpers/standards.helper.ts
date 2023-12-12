export const CertificationStandards = [
  {
    id: 1,
    name: "iso-14064-1-2018",
    label: "ISO 14064-1:2018",
    isOption: false,
    options: [],
  },
  {
    id: 2,
    name: "tif-18001-1999",
    label: "TIS 18001:1999",
    isOption: false,
    options: [],
  },
  {
    id: 3,
    name: "iso-14001-2015",
    label: "ISO 14001:2015",
    isOption: false,
    options: [],
  },
  {
    id: 4,
    name: "iso-26000",
    label: "ISO 26000",
    isOption: false,
    options: [],
  },
  {
    id: 5,
    name: "iso-iec-17025-2017",
    label: "ISO/IEC 17025:2017",
    isOption: false,
    options: [],
  },
  {
    id: 6,
    name: "iso-9001",
    label: "ISO 9001",
    isOption: false,
    options: [],
  },
  {
    id: 7,
    name: "iso-14001",
    label: "OHSAS 18001:2007",
    isOption: false,
    options: [],
  },
  {
    id: 8,
    name: "cbam-certificates",
    label: "CBAM-Certificates",
    isOption: false,
    options: [],
  },
  {
    id: 9,
    name: "iatf-16949",
    label: "IATF 16949:2016",
    isOption: false,
    options: [],
  },
  {
    id: 10,
    name: "8001-2546",
    label: "มรท. 8001-2546",
    isOption: false,
    options: [],
  },
  {
    id: 11,
    name: "energy-saving-products-have-a-number-5-labe",
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
    id: 12,
    name: "green-label",
    label: "ฉลากเขียว",
    isOption: false,
    options: [],
  },
  {
    id: 13,
    name: "green-industry",
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
    id: 14,
    name: "fsc",
    label: "สัญลักษณ์ FSC",
    isOptions: true,
    options: [],
  },
  {
    id: 15,
    name: "carbon-reduction-label",
    label: "ฉลาก Carbon Reduction",
    isOption: false,
    options: [],
  },
  {
    id: 16,
    name: "gi",
    label: "การรับรองอุตสาหกรรมสีเขียว (GI)",
    isOption: true,
    options: [{ id: 1, label: "ระดับที่ื 1" }],
  },
  {
    id: 17,
    name: "none-certification",
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
    id: "free_zone",
    label: "Free Zone",
    isOption: false,
    options: [],
  },
  {
    id: "j_tepa",
    label: "JTEPA",
    isOption: false,
    options: [],
  },
  {
    id: "none-benefit",
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
  "มีนโยบายให้พนักงานต้องมีการตรวจประวัติอาชญากรรมก่อนเริ่มงาน",
  "อื่นๆ",
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
    name: "other-objective-purchasing",
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
