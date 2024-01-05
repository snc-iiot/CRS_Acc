import { API_BASE_URL } from "@/helpers/common.helper";
import { FinancialPositionType, FinancialRatiosType, IcomeStatementType, TResponseAction } from "@/types";
import { APIService } from "./api.service";

export class ImportExcelService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  PostImportExcelFinancialPosition = async (data: FinancialPositionType): Promise<TResponseAction> => {
    const newData = data?.content?.map((item) => {
      const info = item?.info?.map((infoItem) => {
        return {
          ...infoItem,
          amount: infoItem.amount !== null ? (isNaN(infoItem?.amount) ? null : infoItem?.amount) : null,
          change: infoItem.change !== null ? (isNaN(infoItem?.change) ? null : infoItem?.change) : null,
        };
      });
      return {
        ...item,
        info,
      };
    });
    console.log(
      "🚀 ~ file: import-excel.service.ts ~ line 23 ~ ImportExcelService ~ PostImportExcelFinancialPosition ~ newData",
      newData
    );

    try {
      const { data: responseData } = await this.post(`/dbd-financial-report/import-excel/financial-position`, {
        ...data,
        content: newData,
      });
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
    const newData = data?.content?.map((item) => {
      const info = item?.info?.map((infoItem) => {
        return {
          ...infoItem,
          amount: infoItem.amount !== null ? (isNaN(infoItem?.amount) ? null : infoItem?.amount) : null,
          change: infoItem.change !== null ? (isNaN(infoItem?.change) ? null : infoItem?.change) : null,
        };
      });
      return {
        ...item,
        info,
      };
    });

    console.log(
      "🚀 ~ file: import-excel.service.ts ~ line 50 ~ ImportExcelService ~ PostImportExcelIcomeStatement ~ newData",
      newData
    );

    try {
      const { data: responseData } = await this.post(`/dbd-financial-report/import-excel/icome-statement`, {
        ...data,
        content: newData,
      });
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
    const newData = data?.content?.map((item) => {
      const info = item?.info?.map((infoItem) => {
        return {
          ...infoItem,
          ratio: infoItem.ratio !== null ? (isNaN(infoItem?.ratio) ? null : infoItem?.ratio) : null,
        };
      });
      return {
        ...item,
        info,
      };
    });

    console.log(
      "🚀 ~ file: import-excel.service.ts ~ line 77 ~ ImportExcelService ~ PostImportExcelFinancialRatios ~ newData",
      newData
    );

    try {
      const { data: responseData } = await this.post(`/dbd-financial-report/import-excel/financial-ratios`, {
        ...data,
        content: newData,
      });
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
