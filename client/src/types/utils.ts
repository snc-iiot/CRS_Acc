export type TResponseAction = {
  status: "success" | "error";
  message: string;
  data?: any;
};

export type TBusinessTypeList = {
  business_type_id: number;
  business_type_th: string;
  business_type_en: string;
  value: string;
};

export type TDocumentKeyList = {
  [key: string]: string;
  anti_corruption_policy: string;
  vat_license: string;
  business_registration: string;
  fi_statement: string;
  invoice: string;
  organization_chart: string;
  sale_contract: string;
  factory_visit: string;
  machine_condition: string;
  company_map: string;
  other_document1: string;
  other_document2: string;
  other_document3: string;
  iso_14064_1_2018: string;
  iso_14001_2015: string;
  iso_26000: string;
  iso_iec_17025_2017: string;
  iso_9001: string;
  ohsas_18001_2007: string;
  iaft_16949_2016: string;
  tls_8001_2003: string;
  tis_18001_1999: string;
  cbam_certificates: string;
  energy_saving_label_number_5: string;
  green_industry_symbol: string;
  fsc_symbol: string;
  carbon_reduction_label: string;
  green_industry_certification: string;
  green_label: string;
  certification_other: string;
  boi: string;
  free_zone: string;
  jtepa: string;
  benefits_others: string;
  bom_process: string;
  cost_break_down: string;
  quotation: string;
  internal_other1: string;
  internal_other2: string;
  internal_other3: string;
};

export type TCertificatedList = {
  cer_id: number;
  cer_name_th: string;
  cer_name_en: string;
  is_checked: boolean;
  value: string;
  exp: string;
};

export type TBenefitsList = {
  cer_id: number;
  cer_name_th: string;
  cer_name_en: string;
  is_checked: boolean;
  value: string;
  exp: string;
};

export type TDeliveryTermsList = {
  cer_id: string;
  cer_name_th: string;
  cer_name_en: string;
  is_checked: boolean;
};

export type TCompanyPolicyList = {
  cer_id: number;
  cer_name_th: string;
  cer_name_en: string;
  is_checked: boolean | null;
  value: string;
  exp: string;
};

export type TCompanyList = {
  [key: string]: string;
  company: string;
  company_full_name_th: string;
  company_full_name_en: string;
  province: string;
};

export type TCountryCodeList = {
  [key: string]: string;
  country: string;
  alpha2: string;
  alpha3: string;
  numeric: string;
};
