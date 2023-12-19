import { TRegistrationForm } from "@/types";

export const API_BASE_URL = "http://localhost:3000";
export const QUERY_KEYS = {
  GET_USER: "GET_USER",
};

export const CheckCustomerForeigner = (
  customerInfo: TRegistrationForm,
): boolean => {
  const {
    company_information: {
      company_registration: { is_thai },
    },
  } = customerInfo;
  return is_thai ? false : true;
};

export const PrimaryColor = "#2463EB";
export const SecondaryColor = "#F3F7FA";
