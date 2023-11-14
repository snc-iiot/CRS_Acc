import { TRegistrationForm } from "@/types";
import { atom } from "jotai";

export const registrationAtom = atom<TRegistrationForm>({
  CompanyAdmin: "",
  CompanyName: "",
  Address: "",
  Country: "",
  Province: "",
  District: "",
  SubDistrict: "",
  ZipCode: "",
  PhoneNumber: "",
  JuristicId: "",
  Website: "",
  NatureOfBusiness: "",
} as TRegistrationForm);
if (process.env.NODE_ENV !== "production") {
  registrationAtom.debugLabel = "registrationAtom";
}
