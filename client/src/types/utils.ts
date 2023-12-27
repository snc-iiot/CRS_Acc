export type TBusinessTypeList = {
  business_type_id: number;
  business_type_th: string;
  business_type_en: string;
  value: string;
};

export type TResponseAction = {
  status: "success" | "error";
  message: string;
  data?: any;
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
  cer_id: number;
  cer_name_th: string;
  cer_name_en: string;
  is_checked: boolean;
  value: string;
  exp: string;
};

export type TCompanyPolicyList = {
  cer_id: number;
  cer_name_th: string;
  cer_name_en: string;
  is_checked: boolean;
  value: string;
  exp: string;
};

export type TCompanyList = {
  company: string;
  company_full_name_th: string;
  company_full_name_en: string;
};

export type TCountryCodeList = {
  country: string;
  alpha2: string;
  alpha3: string;
  numeric: string;
};
