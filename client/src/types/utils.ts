export type TBusinessTypeList = {
  business_id: string;
  business_type: string;
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
  [key: string]: string;
  cer_id: string;
  cer_name_th: string;
  cer_name_en: string;
};

export type TBenefitsList = {
  [key: string]: string;
  cer_id: string;
  cer_name_th: string;
  cer_name_en: string;
};

export type TDeliveryTermsList = {
  [key: string]: string;
  cer_id: string;
  cer_name_th: string;
  cer_name_en: string;
};

export type TCompanyPolicyList = {
  [key: string]: string;
  cer_id: string;
  cer_name_th: string;
  cer_name_en: string;
};

export type TCompanyList = {
  [key: string]: string;
  company: string;
  company_full_name_th: string;
  company_full_name_en: string;
};
