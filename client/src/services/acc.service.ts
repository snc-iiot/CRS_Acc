import { API_BASE_URL } from "@/helpers/common.helper";
import { TResponseAction } from "@/types";
import { APIService } from ".";

export class AccService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  confirmDBDInfo = async (regis_id: string): Promise<TResponseAction> => {
    try {
      const { data: responseData } = await this.patch(
        `/dbd-financial-report/confirm`,
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
}
