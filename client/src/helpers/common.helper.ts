import { TRegistrationForm } from "@/types";

export const API_BASE_URL =
  "https://snc-services.sncformer.com/dev/iCRS/api/public/index.php/api";
export const LOCAL_STORAGE_KEY = "ICRS_LOCAL_STORAGE";
export const QUERY_KEYS = {
  GET_USER: "GET_USER",

  //! for register new customer
  GET_BUSINESS_TYPE_LIST: "GET_BUSINESS_TYPE_LIST",
  GET_DOCUMENT_KEY_LIST: "GET_DOCUMENT_KEY_LIST",
  GET_CERTIFICATED_LIST: "GET_CERTIFICATED_LIST",
  GET_BENEFITS_LIST: "GET_BENEFITS_LIST",
  GET_DELIVERY_TERMS_LIST: "GET_DELIVERY_TERMS_LIST",
  GET_COMPANY_POLICY_LIST: "GET_COMPANY_POLICY_LIST",
  GET_COMPANY_LIST: "GET_COMPANY_LIST",
  CREATE_REGISTER_ID: "CREATE_REGISTER_ID",
  GET_COUNTRY_CODE_LIST: "GET_COUNTRY_CODE_LIST",
  CREATE_NEW_CUSTOMER: "CREATE_NEW_CUSTOMER",
  GET_DOC_BY_REGIS_ID: "GET_DOC_BY_REGIS_ID",
  UPLOAD_FILE: "UPLOAD_FILE",
  GET_REGIS_LIST: "GET_REGIS_LIST",
  GET_REGIS_BY_ID: "GET_REGIS_BY_ID",
  DELETE_DOC_BY_ID: "DELETE_DOC_BY_ID",
  UPDATE_REGIS_BY_ID: "UPDATE_REGIS_BY_ID",
  GET_REGIS_BY_ACCOUNT_ID: "GET_REGIS_BY_ACCOUNT_ID",
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
