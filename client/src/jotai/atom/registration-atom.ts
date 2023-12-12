import { TRegistrationForm } from "@/types";
import { atom } from "jotai";

export const registrationAtom = atom<TRegistrationForm>({
  company_information: {
    company_admin: "",
    company_name: "",
    address: "",
    country: "",
    province: "",
    district: "",
    sub_district: "",
    zip_code: "",
    phone_number: "",
    juristic_id: "",
    website: "",
    nature_of_business: "",
    company_registration: {
      is_thai: true,
      country: "",
    },
  },
  share_holder: {
    hight_nationalities: {
      nationalities: "",
      percentage: 0,
    },
    thai_nationalities: 0,
    other_nationalities: 0,
  },
  contact_person: [
    {
      position_th: "ฝ่ายจัดซื้อ",
      position_en: "scm_officer",
      name: "",
      tel: "",
      email: "",
    },
    {
      position_th: "ผู้จัดการฝ่ายจัดซื้อ",
      position_en: "scm_department_manager",
      name: "",
      tel: "",
      email: "",
    },
    {
      position_th: "ฝ่ายบัญชีและการเงิน",
      position_en: "accounting_officer",
      name: "",
      tel: "",
      email: "",
    },
    {
      position_th: "ผู้จัดการฝ่ายบัญชีและการเงิน",
      position_en: "accounting_department_manager",
      name: "",
      tel: "",
      email: "",
    },
    {
      position_th: "กรรมการผู้จัดการ",
      position_en: "managing_director",
      name: "",
      tel: "",
      email: "",
    },
  ],
  relationship: {
    is_relationship: false,
    relationship_name: "",
  },
  standard: {
    certificate: [],
    benefit: [],
  },
  payment_term: {
    credit_term: {
      name: "",
      value: 0,
    },
    billing_term: {
      name: "",
      value: "",
    },
    currency: "",
    incoterm: "",
    lc_term: {
      is_lc: false,
      lc_type: "",
    },
    delivery_term: [],
    deposit_term: {
      is_deposit: true,
      deposit_type: "",
    },
    product_warranty: {
      is_warranty: true,
      value: "",
    },
    company_policy: [],
    objective_purchasing: {
      name: "",
      value: "",
    },
    main_customer: {
      name: "",
      value: "",
    },
  },
});
if (process.env.NODE_ENV !== "production") {
  registrationAtom.debugLabel = "registrationAtom";
}
