export type TRegistrationForm = {
  regis_id: string;
  informant_name: string;
  company_information: TCompanyInformation;
  share_holder: TShareHolder;
  contact_person: TContactPerson[];
  relationship: TRelationship;
  standard: TStandard;
  payment_term: TPaymentTerm;
  status_no?: number;
  created_at?: string;
  updated_at?: string;
};

export type TCompanyInformation = {
  company_admin: string;
  company_name: string;
  address: string;
  country: string;
  province: string;
  district: string;
  sub_district: string;
  zip_code: string;
  phone_number: string;
  juristic_id: string;
  website: string;
  nature_of_business: number;
  company_registration: {
    is_thai: boolean;
    country: string;
  };
};

export type TShareHolder = {
  hight_nationalities: THightNationalities;
  thai_nationalities: number;
  other_nationalities: number;
};

export type THightNationalities = {
  nationalities: string;
  percentage: number;
};

export type TContactPerson = {
  position_th: string;
  position_en: string;
  name: string;
  tel: string;
  email: string;
};

export type TRelationship = {
  is_relationship: boolean | null;
  relationship_name: string;
};

export type TStandard = {
  certificate: TCertificate[];
  benefit: TBenefit[];
};

export type TCertificate = {
  cer_id: number;
  cer_name_th: string;
  cer_name_en: string;
  is_checked: boolean;
  value: string;
  exp: string | null;
};

export type TBenefit = {
  cer_id: number;
  cer_name_th: string;
  cer_name_en: string;
  is_checked: boolean;
  value: string;
  exp: string | null;
};

export type TPaymentTerm = {
  credit_term: TCreditTerm;
  billing_term: TBillingTerm;
  currency: string;
  incoterm: string;
  lc_term: TLCTerm;
  delivery_term: TDeliveryTerm[];
  deposit_term: TDepositTerm;
  product_warranty: TProductWarranty;
  company_policy: TCompanyPolicy[];
  objective_purchasing: TObjectivePurchasing;
  main_customer: TMainCustomer;
};

export type TCreditTerm = {
  name: string;
  value: number | null;
};

export type TBillingTerm = {
  name: string;
  value: string;
};

export type TLCTerm = {
  is_lc: boolean;
  lc_type: string;
};

export type TDeliveryTerm = {
  cer_id: number;
  cer_name_th: string;
  cer_name_en: string;
  is_checked: boolean | null;
  value: string;
  exp: string;
};

export type TDepositTerm = {
  is_deposit: boolean;
  deposit_type: string;
};

export type TProductWarranty = {
  is_warranty: boolean;
  value: number | null;
};

export type TCompanyPolicy = {
  cer_id: number;
  cer_name_th: string;
  cer_name_en: string;
  is_checked: boolean | null;
  value: string;
  exp: string;
};

export type TObjectivePurchasing = {
  name: string;
  value: string;
};

export type TMainCustomer = {
  name: string;
  value: string;
  name_helper: string;
};

export type TUploadFile = {
  regis_id: string;
  doc_name: string;
  content: string;
};
