import { API_BASE_URL } from "@/helpers/common.helper";
import {
  TBenefitsList,
  TBusinessTypeList,
  TCertificatedList,
  TCommitList,
  TCompanyList,
  TCompanyPolicyList,
  TCountryCodeList,
  TDBDSyncList,
  TDeliveryTermsList,
  TDocumentKeyList,
  TFinancialRatio,
  TResponseAction,
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
      const { data: responseData } = await this.get(`/template/all-company`);
      return responseData?.data ?? [];
    } catch (error: any) {
      console.error("UtilsService -> getCompanyList -> error", error);
      return [] as TCompanyList[];
    }
  };

  createRegisterId = async (): Promise<TResponseAction> => {
    try {
      const { data: responseData } = await this.post(
        `/registration/create-regis-id`,
      );
      return responseData ?? {};
    } catch (error: any) {
      console.error("UtilsService -> createRegisterId -> error", error);
      return {} as TResponseAction;
    }
  };

  getCountryCodeList = async (): Promise<TCountryCodeList[]> => {
    try {
      const { data: responseData } = await this.get(`/template/country-codes`);
      return responseData?.data ?? [];
    } catch (error: any) {
      console.error("UtilsService -> getCountryCodeList -> error", error);
      return [] as TCountryCodeList[];
    }
  };

  getCommentList = async (regisId: string): Promise<TCommitList> => {
    try {
      const { data: responseData } = await this.get(
        `/assessment-comments?regis_id=${regisId}`,
      );
      return responseData?.data?.[0] ?? {};
    } catch (error: any) {
      console.error("UtilsService -> getCommentList -> error", error);
      return {} as TCommitList;
    }
  };

  getCommentR3List = async (regisId: string): Promise<TCommitList> => {
    try {
      const { data: responseData } = await this.get(
        `/financial-comments?regis_id=${regisId}`,
      );
      return responseData?.data?.[0] ?? {};
    } catch (error: any) {
      console.error("UtilsService -> getCommentR3List -> error", error);
      return {} as TCommitList;
    }
  };

  createComment = async (
    regisId: string,
    comments: string,
  ): Promise<TResponseAction> => {
    try {
      const { data: responseData } = await this.post(`/assessment-comments`, {
        regis_id: regisId,
        comments,
      });
      return responseData ?? {};
    } catch (error: any) {
      console.error("UtilsService -> createComment -> error", error);
      return {
        message: error?.response?.data?.message ?? "Create comment failed.",
        status: "error",
        data: [],
      };
    }
  };

  createCommentR3 = async (
    regisId: string,
    comments: string,
  ): Promise<TResponseAction> => {
    try {
      const { data: responseData } = await this.post(`/financial-comments`, {
        regis_id: regisId,
        comments,
      });
      return responseData ?? {};
    } catch (error: any) {
      console.error("UtilsService -> createCommentR3 -> error", error);
      return {
        message: error?.response?.data?.message ?? "Create comment failed.",
        status: "error",
        data: [],
      };
    }
  };

  getDBDSyncList = async (regisId: string): Promise<TDBDSyncList> => {
    try {
      const { data: responseData } = await this.get(
        `/dbd-financial-report/sync-by-id?regis_id=${regisId}`,
      );
      return responseData?.data?.[0] ?? {};
    } catch (error: any) {
      console.error("UtilsService -> getDBDSyncList -> error", error);
      return {} as TDBDSyncList;
    }
  };

  getDBDInfo = async (regisId: string): Promise<TDBDSyncList> => {
    try {
      const { data: responseData } = await this.get(
        `/dbd-financial-report/info?regis_id=${regisId}`,
      );
      return responseData?.data?.[0] ?? {};
    } catch (error: any) {
      console.error("UtilsService -> getDBDInfo -> error", error);
      return {} as TDBDSyncList;
    }
  };

  getFinancialRatio = async (regisId: string): Promise<TFinancialRatio> => {
    try {
      const { data: responseData } = await this.get(
        `/financial-ratio/info?regis_id=${regisId}`,
      );
      return responseData?.data?.[0] ?? {};
    } catch (error: any) {
      console.error("UtilsService -> getFinancialRatio -> error", error);
      return {} as TFinancialRatio;
    }
  };
}
