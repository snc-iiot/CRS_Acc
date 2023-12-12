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
      position_th: "",
      position_en: "",
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
    certificate: [
      {
        cer_id: "",
        label_th: "",
        label_en: "",
        is_checked: false,
        value: "",
        exp: "",
      },
    ],
    benefit: [
      {
        cer_id: "",
        label_th: "",
        label_en: "",
        is_checked: false,
        value: "",
        exp: "",
      },
    ],
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
    delivery_term: [
      {
        cer_id: "",
        label_th: "",
        label_en: "",
        is_checked: true,
      },
    ],
    deposit_term: {
      is_deposit: true,
      deposit_type: "",
    },
    product_warranty: {
      is_warranty: true,
      value: "",
    },
    company_policy: [
      {
        cer_id: "",
        label_th: "",
        label_en: "",
        is_checked: true,
      },
    ],
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
