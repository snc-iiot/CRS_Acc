import { TDocByRegisId, TRegisList, TRegistrationForm } from "@/types";
import { atom } from "jotai";

export const registrationAtom = atom<TRegistrationForm>({
  regis_id: "",
  informant_name: "",
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
      is_deposit: false,
      deposit_type: "",
    },
    product_warranty: {
      is_warranty: false,
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

export const docByRegisIdAtom = atom<TDocByRegisId>({
  folder_name: "",
  documents: {
    anti_corruption_policy: "",
    vat_license: "",
    business_registration: "",
    fi_statement: "",
    invoice: "",
    organization_chart: "",
    sale_contract: "",
    factory_visit: "",
    machine_condition: "",
    company_map: "",
    other_document1: "",
    other_document2: "",
    other_document3: "",
    iso_14064_1_2018: "",
    iso_14001_2015: "",
    iso_26000: "",
    iso_iec_17025_2017: "",
    iso_9001: "",
    ohsas_18001_2007: "",
    iaft_16949_2016: "",
    tls_8001_2003: "",
    tis_18001_1999: "",
    cbam_certificates: "",
    energy_saving_label_number_5: "",
    green_industry_symbol: "",
    fsc_symbol: "",
    carbon_reduction_label: "",
    green_industry_certification: "",
    green_label: "",
    certification_other: "",
    boi: "",
    free_zone: "",
    jtepa: "",
    benefits_others: "",
    bom_process: "",
    cost_break_down: "",
    quotation: "",
    internal_other1: "",
    internal_other2: "",
    internal_other3: "",
  },
  file_path: "",
});

export const regisListAtom = atom<TRegisList[]>([]);

if (process.env.NODE_ENV !== "production") {
  registrationAtom.debugLabel = "registrationAtom";
  docByRegisIdAtom.debugLabel = "docByRegisIdAtom";
  regisListAtom.debugLabel = "regisListAtom";
}
