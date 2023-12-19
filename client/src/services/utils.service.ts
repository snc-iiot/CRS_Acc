import { API_BASE_URL } from "@/helpers/common.helper";
import {
  TBenefitsList,
  TBusinessTypeList,
  TCertificatedList,
  TCompanyList,
  TCompanyPolicyList,
  TDeliveryTermsList,
  TDocumentKeyList,
} from "@/types";
import { APIService } from "./api.service";

export class UtilsService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  getBusinessTypeList = async (): Promise<TBusinessTypeList[]> => {
    try {
      const { data: responseData } = await this.get(`/template/business-types`);
      return responseData?.data ?? [];
    } catch (error: any) {
      console.error("UtilsService -> getBusinessTypeList -> error", error);
      return [] as TBusinessTypeList[];
    }
  };

  getDocumentKeyList = async (): Promise<TDocumentKeyList> => {
    try {
      const { data: responseData } = await this.get(
        `/template/upload-documents`,
      );
      return responseData?.data?.[0] ?? ({} as TDocumentKeyList);
    } catch (error: any) {
      console.error("UtilsService -> getDocumentKeyList -> error", error);
      return {} as TDocumentKeyList;
    }
  };

  getCertificatedList = async (): Promise<TCertificatedList[]> => {
    try {
      const { data: responseData } = await this.get(`/template/certifications`);
      return responseData?.data ?? [];
    } catch (error: any) {
      console.error("UtilsService -> getCertificatedList -> error", error);
      return [] as TCertificatedList[];
    }
  };

  getBenefitsList = async (): Promise<TBenefitsList[]> => {
    try {
      const { data: responseData } = await this.get(`/template/benefits`);
      return responseData?.data ?? [];
    } catch (error: any) {
      console.error("UtilsService -> getBenefitsList -> error", error);
      return [] as TBenefitsList[];
    }
  };

  getDeliveryTermsList = async (): Promise<TDeliveryTermsList[]> => {
    try {
      const { data: responseData } = await this.get(`/template/delivery-terms`);
      return responseData?.data ?? [];
    } catch (error: any) {
      console.error("UtilsService -> getDeliveryTermsList -> error", error);
      return [] as TDeliveryTermsList[];
    }
  };

  getCompanyPolicyList = async (): Promise<TCompanyPolicyList[]> => {
    try {
      const { data: responseData } = await this.get(`/template/company-policy`);
      return responseData?.data ?? [];
    } catch (error: any) {
      console.error("UtilsService -> getCompanyPolicyList -> error", error);
      return [] as TCompanyPolicyList[];
    }
  };

  getCompanyList = async (): Promise<TCompanyList[]> => {
    try {
      const { data: responseData } = await this.get(`/template/companies`);
      return responseData?.data ?? [];
    } catch (error: any) {
      console.error("UtilsService -> getCompanyList -> error", error);
      return [] as TCompanyList[];
    }
  };
}
