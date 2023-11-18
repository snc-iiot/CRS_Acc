// import { registrationSchema } from "@/lib/validation/registration";
// import * as z from "zod";

// export type TRegistrationForm = z.infer<typeof registrationSchema>;

export type TRegistrationForm = {
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
  shareholder: Shareholder;
  contract_person: ContractPerson[];
  relationship: Relationship;
  certificate: any[];
  benefits: any[];
};

export interface Shareholder {
  hight_nationalities: HightNationalities;
  thai_nationalities: number;
  other_nationalities: number;
}

export interface HightNationalities {
  nationalities: string;
  percentage: number;
}

export interface ContractPerson {
  position: string;
  name: string;
  phone_number: string;
  email: string;
}

export interface Relationship {
  is_relationship: boolean;
  relationship_name: string;
}
