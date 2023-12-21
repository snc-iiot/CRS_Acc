import { TRegistrationForm } from "@/types";

export const DocumentUpload = [
  {
    id: 1,
    label: "นโยบายต่อต้านทุจริตคอร์ปชั่น",
    name: "anti_corruption_policy",
  },
  {
    id: 2,
    label: "ภพ.20",
    name: "vat_license",
  },

  {
    id: 3,
    label: "หนังสือรับรองบริษัท",
    name: "business_registration",
  },
  {
    id: 4,
    label: "งบการเงิน 5 ปี",
    name: "fi_statement",
  },
  {
    id: 5,
    label: "ระเบียบการวางบิล รับเช็ค/โอนเงิน/เงินสด",
    name: "invoice",
  },
  {
    id: 6,
    label: "แผนผังองค์กร",
    name: "organization_chart",
  },
  {
    id: 7,
    label: "สัญญาขาย",
    name: "sale_contract",
  },
  {
    id: 8,
    label: "การเยี่ยมชมโรงงาน",
    name: "factory_visit",
  },
  {
    id: 9,
    label: "สภาพเครื่องจักร",
    name: "machine_condition",
  },
  {
    id: 10,
    label: "แผนที่บริษัท",
    name: "company_map",
  },
  {
    id: 11,
    label: "เอกสารอื่นๆ 1",
    name: "other_document1",
  },
  {
    id: 12,
    label: "เอกสารอื่นๆ 2",
    name: "other_document2",
  },
  {
    id: 13,
    label: "เอกสารอื่นๆ 3",
    name: "other_document3",
  },
  {
    id: 14,
    label: "ISO 14064-1:2018",
    name: "iso_14064_1_2018",
  },
  {
    id: 15,
    label: "ISO 14001:2015",
    name: "iso_14001_2015",
  },
  {
    id: 16,
    label: "ISO 26000",
    name: "iso_26000",
  },
  {
    id: 17,
    label: "ISO/IEC 17025:2017",
    name: "iso_iec_17025_2017",
  },
  {
    id: 18,
    label: "ISO 9001",
    name: "iso_9001",
  },
  {
    id: 19,
    label: "OHSAS 18001:2007",
    name: "ohsas_18001_2007",
  },
  {
    id: 20,
    label: "IAFT 16949:2016",
    name: "iaft_16949_2016",
  },
  {
    id: 21,
    label: "TLS 8001:2003",
    name: "tls_8001_2003",
  },
  {
    id: 22,
    label: "TIS 18001:1999",
    name: "tis_18001_1999",
  },
  {
    id: 23,
    label: "CBAM Certificates",
    name: "cbam_certificates",
  },
  {
    id: 24,
    label: "Energy Saving Label Number 5",
    name: "energy_saving_label_number_5",
  },
  {
    id: 25,
    label: "Green Industry Symbol",
    name: "green_industry_symbol",
  },
  {
    id: 26,
    label: "FSC Symbol",
    name: "fsc_symbol",
  },
  {
    id: 27,
    label: "Carbon Reduction Label",
    name: "carbon_reduction_label",
  },
  {
    id: 28,
    label: "Green Industry Certification",
    name: "green_industry_certification",
  },
  {
    id: 29,
    label: "Green Label",
    name: "green_label",
  },
  {
    id: 30,
    label: "Certification Other",
    name: "certification_other",
  },
  {
    id: 31,
    label: "BOI",
    name: "boi",
  },
  {
    id: 32,
    label: "Free Zone",
    name: "free_zone",
  },
  {
    id: 33,
    label: "JTEPA",
    name: "jtepa",
  },
  {
    id: 34,
    label: "Benefits Others",
    name: "benefits_others",
  },
  {
    id: 35,
    label: "BOM Process",
    name: "bom_process",
  },
  {
    id: 36,
    label: "Cost Break Down",
    name: "cost_break_down",
  },
  {
    id: 37,
    label: "Quotation",
    name: "quotation",
  },
  {
    id: 38,
    label: "Internal Other 1",
    name: "internal_other1",
  },
  {
    id: 39,
    label: "Internal Other 2",
    name: "internal_other2",
  },
  {
    id: 40,
    label: "Internal Other 3",
    name: "internal_other3",
  },
];

export const UploadDocument = (regisForm: TRegistrationForm) => {
  const { standard, payment_term } = regisForm;
  const { certificate, benefit } = standard;
  const { company_policy } = payment_term;

  const certificateList = certificate.filter(
    (item) => item.is_checked === true,
  );
  const benefitList = benefit.filter((item) => item.is_checked === true);

  const companyPolicy = company_policy.filter(
    (item) => item.is_checked === true,
  );

  return DocumentUpload?.filter((item) => {
    const isCertificate = certificateList.find(
      (certificate) => certificate.cer_name_en === item.label,
    );
    const isBenefit = benefitList.find(
      (benefit) => benefit.cer_name_en === item.label,
    );
    const isCompanyPolicy = companyPolicy.find(
      (policy) => policy.cer_id === item.id,
    );
    return (
      isCertificate ||
      isBenefit ||
      (item.id === 1 && isCompanyPolicy?.is_checked) ||
      item.name === "vat_license" ||
      item.name === "business_registration" ||
      item.name === "fi_statement" ||
      item.name === "invoice" ||
      item.name === "organization_chart" ||
      item.name === "sale_contract" ||
      item.name === "factory_visit" ||
      item.name === "machine_condition" ||
      item.name === "company_map"
    );
  }).map((item) => {
    return item;
  });
};
