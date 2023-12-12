export type TRegistrationForm = {
  company_information: TCompanyInformation;
  share_holder: TShareHolder;
  contact_person: TContactPerson[];
  relationship: TRelationship;
  standard: TStandard;
  payment_term: TPaymentTerm;
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
  nature_of_business: string;
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
  is_relationship: boolean;
  relationship_name: string;
};

export type TStandard = {
  certificate: TCertificate[];
  benefit: TBenefit[];
};

export type TCertificate = {
  cer_id: string;
  label_th: string;
  label_en: string;
  is_checked: boolean;
  value: string;
  exp: string;
};

export type TBenefit = {
  cer_id: string;
  label_th: string;
  label_en: string;
  is_checked: boolean;
  value: string;
  exp: string;
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
  value: number;
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
  cer_id: string;
  label_th: string;
  label_en: string;
  is_checked: boolean;
};

export type TDepositTerm = {
  is_deposit: boolean;
  deposit_type: string;
};

export type TProductWarranty = {
  is_warranty: boolean;
  value: string;
};

export type TCompanyPolicy = {
  cer_id: string;
  label_th: string;
  label_en: string;
  is_checked: boolean;
};

export type TObjectivePurchasing = {
  name: string;
  value: string;
};

export type TMainCustomer = {
  name: string;
  value: string;
};
