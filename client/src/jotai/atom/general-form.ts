import {
  TApprovalList,
  TCompanyProfile,
  TGeneralAssessmentForm,
} from "@/types";
import { atom } from "jotai";

export const generalAssessmentFormAtom = atom<TGeneralAssessmentForm>({
  regis_id: "",
  products: "",
  orders: 0,
  quantity_per_year: 0,
  lead_time: 0,
  price_conditions: {
    peroid: "",
    value: 0,
  },
  machine_produce: [],
  mold_use: [],
  main_material: [],
  transport_distance: {
    transport: "",
    origin: "",
    destination: "",
    distance: 0,
    car_type: "",
    fuel_type: "",
    shipping_cost: 0,
  },
  main_supplier_credit_terms: [],
  main_mat_ratio: {
    thailand: 0,
    foreign: 0,
  },
  ratio_of_raw_mat: {
    RM: 0,
    COGS: 0,
    GP: 0,
  },
  inventory_day: {
    RM: 0,
    PRD: 40,
    FG: 0,
    inventory: 0,
  },
  approvals: [],
  is_acc_cf: false,
  acc_cf_at: null,
  customer_code: null,
  filled_customer_code_at: null,
  creator_id: "978eccba-5de8-4111-8637-8e9e8e8a98bd",
  created_at: "2023-12-21 21:17:26",
  updated_at: "2023-12-21 21:17:26",
  status_no: 0,
  status_desc_th: "",
  is_approver: false,
} as TGeneralAssessmentForm);

export const approvalListAtom = atom<TApprovalList[]>([]);

export const companyProfileAtom = atom<TCompanyProfile>({
  regis_id: "",
  company_name: "",
  company_admin: "",
  company_full_name_th: "",
  company_full_name_en: "",
  products: "",
  business_type_id: 0,
  business_type_th: "",
} as TCompanyProfile);

if (process.env.NODE_ENV !== "production") {
  approvalListAtom.debugLabel = "approvalListAtom";
  generalAssessmentFormAtom.debugLabel = "generalAssessmentFormAtom";
  companyProfileAtom.debugLabel = "companyProfile";
}
