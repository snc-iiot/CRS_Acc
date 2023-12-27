import { API_BASE_URL } from "@/helpers/common.helper";
import { TRegistrationForm, TResponseAction } from "@/types";
import { APIService } from "./api.service";

export class CustomerService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  registerCustomer = async (
    data: TRegistrationForm,
  ): Promise<TResponseAction> => {
    try {
      const { data: responseData } = await this.post(
        "/registration/by-customer",
        data,
      );
      return responseData;
    } catch (error: any) {
      console.error(error);
      return {
        message: error?.message,
        status: "error",
        data: null,
      };
    }
  };
}
