import { TRegistrationForm } from "@/types";

export const API_BASE_URL =
  "https://snc-services.sncformer.com/dev/iCRS/api/public/index.php/api";

export const queryKey = {
  GET_USER: "GET_USER",
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
};

export const LatitudesLongitudes = {
  RAYONG: {
    latitude: 12.884494672509366,
    longitude: 101.0954191548317,
  },
  SAMUTPRAKARN: {
    latitude: 13.54395677386411,
    longitude: 100.78228050617567,
  },
};

export const KEY_LOCAL_STORAGE = {
  ICRS_ADMIN_LOCAL_STORAGE: "ICRS_ADMIN_LOCAL_STORAGE",
};

export const PRIMARY_COLOR = "#2563EB";

export const MODE_CODE = {
  CREATE: "CREATE",
  EDIT: "EDIT",
  VIEW: "VIEW",
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
