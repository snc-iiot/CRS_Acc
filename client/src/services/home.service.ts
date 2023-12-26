import { API_BASE_URL } from "@/helpers/common.helper";
import {
  DataMainCustomerRatioType,
  DataObjectivePurchasingRatioType,
  DataRegisCountType,
  DataRegisStatType,
  DataShareHolderRatioType,
} from "@/types";
import { APIService } from "./api.service";

export class HomeService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  getRegisCount = async (): Promise<DataRegisCountType[]> => {
    try {
      const { data: responseData } = await this.get(`/dashboard/regis-count`);
      return responseData?.data ?? [] as DataRegisCountType[];
    } catch (error: any) {
      console.error("HomeService -> getRegisCount -> error", error);
      return [] as DataRegisCountType[];
    }
  };

  getMainCustomerRatio = async (): Promise<DataMainCustomerRatioType[]> => {
    try {
      const { data: responseData } = await this.get(`/dashboard/main-customer-ratio`);
      return responseData?.data ?? [] as DataMainCustomerRatioType[];
    } catch (error: any) {
      console.error("HomeService -> getMainCustomerRatio -> error", error);
      return [] as DataMainCustomerRatioType[];
    }
  };

  getShareHolderRatio = async (): Promise<DataShareHolderRatioType[]> => {
    try {
      const { data: responseData } = await this.get(`/dashboard/share-holder-ratio`);
      return responseData?.data ?? [] as DataShareHolderRatioType[];
    } catch (error: any) {
      console.error("HomeService -> getShareHolderRatio -> error", error);
      return [] as DataShareHolderRatioType[];
    }
  };

  getObjectivePurchasingRatio = async (): Promise<DataObjectivePurchasingRatioType[]> => {
    try {
      const { data: responseData } = await this.get(`/dashboard/objective-purchasing-ratio`);
      return responseData?.data ?? [] as DataObjectivePurchasingRatioType[];
    } catch (error: any) {
      console.error("HomeService -> getObjectivePurchasingRatio -> error", error);
      return [] as DataObjectivePurchasingRatioType[];
    }
  };

  getRegisStat = async (): Promise<DataRegisStatType[]> => {
    try {
      const { data: responseData } = await this.get(`/dashboard/regis-stat`);
      return responseData?.data ?? [] as DataRegisStatType[];
    } catch (error: any) {
      console.error("HomeService -> getRegisStat -> error", error);
      return [] as DataRegisStatType[];
    }
  };

}
