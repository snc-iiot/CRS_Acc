import { TRegistrationForm } from "@/types";
import { atom } from "jotai";

export const registrationAtom = atom<TRegistrationForm>({
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
  shareholder: {
    hight_nationalities: {
      nationalities: "",
      percentage: 0,
    },
    thai_nationalities: 0,
    other_nationalities: 0,
  },
  contract_person: [
    {
      position: "manager_scm",
      name: "",
      phone_number: "",
      email: "",
    },
    {
      position: "manager_accounting",
      name: "",
      phone_number: "",
      email: "",
    },
    {
      position: "manager_director",
      name: "",
      phone_number: "",
      email: "",
    },
  ],
  relationship: {
    is_relationship: false,
    relationship_name: "",
  },
  certificate: [],
  benefits: [],
} as TRegistrationForm);
if (process.env.NODE_ENV !== "production") {
  registrationAtom.debugLabel = "registrationAtom";
}
