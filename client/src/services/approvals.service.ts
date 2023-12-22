import { API_BASE_URL } from "@/helpers/common.helper";
import { TResponseAction } from "@/types";
import { APIService } from ".";

export class ApprovalsService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  sendToEdit = async ({
    regis_id,
    comments,
  }: {
    regis_id: string;
    comments: string;
  }): Promise<TResponseAction> => {
    try {
      const { data: responseData } = await this.patch(
        `/approvals-action/send-to-edit`,
        {
          regis_id,
          comments,
        },
      );
      return responseData;
    } catch (error: any) {
      console.error("FormGeneralService -> getApprovalsById -> error", error);
      return {
        message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
        status: "error",
        data: [],
      };
    }
  };

  sendToSuspend = async ({
    regis_id,
    comments,
  }: {
    regis_id: string;
    comments: string;
  }): Promise<TResponseAction> => {
    try {
      const { data: responseData } = await this.patch(
        `/approvals-action/send-to-suspend`,
        {
          regis_id,
          comments,
        },
      );
      return responseData;
    } catch (error: any) {
      console.error("FormGeneralService -> getApprovalsById -> error", error);
      return {
        message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
        status: "error",
        data: [],
      };
    }
  };

  enterCustomerCode = async ({
    regis_id,
    customer_code,
  }: {
    regis_id: string;
    customer_code: string;
  }): Promise<TResponseAction> => {
    try {
      const { data: responseData } = await this.patch(
        `/approvals-action/enter-customer-code`,
        {
          regis_id,
          customer_code,
        },
      );
      return responseData;
    } catch (error: any) {
      console.error("FormGeneralService -> getApprovalsById -> error", error);
      return {
        message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
        status: "error",
        data: [],
      };
    }
  };

  sendToApprove = async (regis_id: string): Promise<TResponseAction> => {
    try {
      const { data: responseData } = await this.patch(
        `/approvals-action/approve`,
        {
          regis_id,
        },
      );
      return responseData;
    } catch (error: any) {
      console.error("FormGeneralService -> getApprovalsById -> error", error);
      return {
        message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
        status: "error",
        data: [],
      };
    }
  };

  sendToReject = async ({
    regis_id,
    comments,
  }: {
    regis_id: string;
    comments: string;
  }): Promise<TResponseAction> => {
    try {
      const { data: responseData } = await this.patch(
        `/approvals-action/reject`,
        {
          regis_id,
          comments,
        },
      );
      return responseData;
    } catch (error: any) {
      console.error("FormGeneralService -> getApprovalsById -> error", error);
      return {
        message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
        status: "error",
        data: [],
      };
    }
  };
}
