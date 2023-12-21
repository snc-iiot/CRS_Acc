import { API_BASE_URL } from "@/helpers/common.helper";
import {
  TDocByRegisId,
  TRegisList,
  TRegistrationForm,
  TResponseAction,
  TUploadFile,
} from "@/types";
import { APIService } from ".";

export class FormService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  createNewCustomer = async (
    data: TRegistrationForm,
  ): Promise<TResponseAction> => {
    try {
      const { data: responseData } = await this.post(`/registration`, data);
      return responseData;
    } catch (error: any) {
      console.error("FormService -> createNewCustomer -> error", error);
      return {
        data: [],
        message: error?.response?.data?.message ?? "Something went wrong",
        status: "error",
      };
    }
  };

  getDocByRegisId = async (regisId: string): Promise<TDocByRegisId> => {
    try {
      const { data: responseData } = await this.get(
        `/registration/get-documents-by-id?regis_id=${regisId}`,
      );
      return responseData?.data?.[0] ?? ({} as TDocByRegisId);
    } catch (error: any) {
      console.error("FormService -> getDocByRegisId -> error", error);
      return {} as TDocByRegisId;
    }
  };

  uploadFile = async (
    file: TUploadFile,
    setProgress: (progress: number) => void,
  ): Promise<TResponseAction> => {
    try {
      const { data: responseData } = await this.post(
        `/registration/upload-file`,
        {
          file,
        },
        {
          onUploadProgress: (progressEvent: any) => {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            setProgress(percentage);
          },
        },
      );
      return responseData;
    } catch (error: any) {
      console.error("FormService -> uploadFile -> error", error);
      return {
        data: [],
        message: error?.response?.data?.message ?? "Something went wrong",
        status: "error",
      };
    }
  };

  getRegisList = async (): Promise<TRegisList[]> => {
    try {
      const { data: responseData } = await this.get(`/registration`);
      return responseData?.data ?? ([] as TRegisList[]);
    } catch (error: any) {
      console.error("FormService -> getRegisList -> error", error);
      return [] as TRegisList[];
    }
  };
}
