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

  editCustomer = async (data: TRegistrationForm): Promise<TResponseAction> => {
    try {
      const { data: responseData } = await this.put(`/registration`, data);
      return responseData;
    } catch (error: any) {
      console.error("FormService -> editCustomer -> error", error);
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
      const { data: responseData } = await this.patch(
        `/registration/upload-document`,
        file,
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

  getRegisListByAccountId = async (): Promise<TRegisList[]> => {
    try {
      const { data: responseData } = await this.get(
        `/registration/your-approve-items`,
      );
      return responseData?.data ?? ([] as TRegisList[]);
    } catch (error: any) {
      console.error("FormService -> getRegisListByAccountId -> error", error);
      return [] as TRegisList[];
    }
  };

  getRegisById = async (regisId: string): Promise<TRegistrationForm> => {
    try {
      const { data: responseData } = await this.get(
        `/registration/info?regis_id=${regisId}`,
      );
      return responseData?.data?.[0] ?? ({} as TRegistrationForm);
    } catch (error: any) {
      console.error("FormService -> getRegisById -> error", error);
      return {} as TRegistrationForm;
    }
  };

  deleteDoc = async ({
    regis_id,
    doc_name,
  }: {
    regis_id: string;
    doc_name: string;
  }): Promise<TResponseAction> => {
    try {
      const { data: responseData } = await this.delete(
        `/registration/delete-document?regis_id=${regis_id}&doc_name=${doc_name}`,
      );
      return responseData;
    } catch (error: any) {
      console.error("FormService -> deleteDoc -> error", error);
      return {
        data: [],
        message: error?.response?.data?.message ?? "Something went wrong",
        status: "error",
      };
    }
  };
}
