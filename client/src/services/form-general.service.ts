import { API_BASE_URL } from "@/helpers/common.helper";
import {
  TApprovalList,
  TGeneralAssessmentForm,
  TResponseAction,
} from "@/types";
import { APIService } from ".";

export class FormGeneralService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  getApprovalsById = async (id: string): Promise<TApprovalList[]> => {
    try {
      const { data: responseData } = await this.get(
        `/general-assessment/approvals-by-id?regis_id=${id}`,
      );
      return responseData?.data ?? [];
    } catch (error: any) {
      console.error("FormGeneralService -> getApprovalsById -> error", error);
      return [] as TApprovalList[];
    }
  };

  getTemplateGeneralAssessmentById = async (
    regis_id: string,
  ): Promise<TGeneralAssessmentForm> => {
    try {
      const { data: responseData } = await this.get(
        `/general-assessment/form-by-id?regis_id=${regis_id}`,
      );
      return responseData?.data?.[0] ?? ({} as TGeneralAssessmentForm);
    } catch (error: any) {
      console.error(
        "FormGeneralService -> getTemplateGeneralAssessmentById -> error",
        error,
      );
      return {} as TGeneralAssessmentForm;
    }
  };

  createGeneralAssessment = async (
    payload: TGeneralAssessmentForm,
  ): Promise<TResponseAction> => {
    try {
      const { data: responseData } = await this.post(
        "/general-assessment",
        payload,
      );
      return responseData;
    } catch (error: any) {
      console.error(
        "FormGeneralService -> createGeneralAssessment -> error",
        error,
      );
      return {
        message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
        status: "error",
        data: [],
      };
    }
  };

  updateGeneralAssessment = async (
    payload: TGeneralAssessmentForm,
  ): Promise<TResponseAction> => {
    try {
      const { data: responseData } = await this.put(
        "/general-assessment",
        payload,
      );
      return responseData;
    } catch (error: any) {
      console.error(
        "FormGeneralService -> updateGeneralAssessment -> error",
        error,
      );
      return {
        message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
        status: "error",
        data: [],
      };
    }
  };
}
