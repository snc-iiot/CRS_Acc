export type TGeneralAssessmentForm = {
  regis_id: string;
  products: string;
  quantity_per_year: number;
  orders: number;
  lead_time: number;
  price_conditions: TPriceConditions;
  machine_produce: TMachineProduce[];
  mold_use: TMoldUse[];
  main_material: TMainMaterial[];
  transport_distance: TTransportDistance;
  main_supplier_credit_terms: TMainSupplierCreditTerm[];
  main_mat_ratio: TMainMatRatio;
  ratio_of_raw_mat: TRatioOfRawMat;
  inventory_day: TInventoryDay;
  approvals: TApproval[];
  is_acc_cf: boolean;
  acc_cf_at: string | null;
  customer_code: string | null;
  filled_customer_code_at: string | null;
  creator_id: string;
  created_at: string;
  updated_at: string;
  status_no: number;
  status_desc_th: string;
  is_approver: boolean;
};

export type TPriceConditions = {
  peroid: string;
  value: number;
};

export type TMachineProduce = {
  id: string;
  label_th: string;
  label_en: string;
  is_checked: boolean;
  value: TValue | null;
};

export type TValue = {
  amount: number;
  ROI: number;
  ROA: number;
  payback: number;
};

export type TMoldUse = {
  id: string;
  label_th: string;
  label_en: string;
  is_checked: boolean;
  value: TValue2 | null;
};

export type TValue2 = {
  amount: number;
  ROI: number;
  ROA: number;
  payback: number;
};

export type TMainMaterial = {
  id: string;
  label_th: string;
  label_en: string;
  is_checked: boolean;
  value: string;
};

export type TTransportDistance = {
  transport: string;
  origin: string;
  destination: string;
  distance: number;
  car_type: string;
  fuel_type: string;
  shipping_cost: number;
};

export type TMainSupplierCreditTerm = {
  supplier_name: string;
  ratio: number;
  credit_terms: number;
  country: TCountry;
};

export type TCountry = {
  label: string;
  value: string;
};

export type TMainMatRatio = {
  thailand: number;
  foreign: number;
};

export type TRatioOfRawMat = {
  RM: number;
  COGS: number;
  GP: number;
};

export type TInventoryDay = {
  RM: number;
  PRD: number;
  FG: number;
  inventory: number;
};

export type TApproval = {
  order_no: number;
  position: string;
  issued_at: any;
  issued_by: string;
  is_approved: boolean | null;
  issued_by_id: string;
};

export type TApprovalList = {
  approvals_set_id: string;
  company_group: string;
  business_unit: string;
  approvals: TApproval[];
};

export type TCompanyProfile = {
  regis_id: string;
  company_name: string;
  company_admin: string;
  company_full_name_th: string;
  company_full_name_en: string;
  products: string;
  business_type_id: number;
  business_type_th: string;
};
