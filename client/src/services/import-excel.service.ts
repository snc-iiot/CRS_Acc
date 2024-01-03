import { API_BASE_URL } from "@/helpers/common.helper";
import { FinancialPositionType, FinancialRatiosType, IcomeStatementType, TResponseAction } from "@/types";
import { APIService } from "./api.service";

export class ImportExcelService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  PostImportExcelFinancialPosition = async (data: FinancialPositionType): Promise<TResponseAction> => {
    try {
      const { data: responseData } = await this.post(`/dbd-financial-report/import-excel/financial-position`, data);
      return responseData;
    } catch (error: any) {
      console.error("FormService -> ImportExcelFinancialPosition -> error", error);
      return {
        data: [],
        message: error?.response?.data?.message ?? "Something went wrong",
        status: "error",
      };
    }
  };

  PostImportExcelIcomeStatement = async (data: IcomeStatementType): Promise<TResponseAction> => {
    try {
      const { data: responseData } = await this.post(`/dbd-financial-report/import-excel/icome-statement`, data);
      return responseData;
    } catch (error: any) {
      console.error("FormService -> ImportExcelIcomeStatement -> error", error);
      return {
        data: [],
        message: error?.response?.data?.message ?? "Something went wrong",
        status: "error",
      };
    }
  };

  PostImportExcelFinancialRatios = async (data: FinancialRatiosType): Promise<TResponseAction> => {
    try {
      const { data: responseData } = await this.post(`/dbd-financial-report/import-excel/financial-ratios`, data);
      return responseData;
    } catch (error: any) {
      console.error("FormService -> ImportExcelFinancialRatios -> error", error);
      return {
        data: [],
        message: error?.response?.data?.message ?? "Something went wrong",
        status: "error",
      };
    }
  };
}
