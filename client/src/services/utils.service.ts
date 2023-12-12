import { API_BASE_URL } from "@/helpers/common.helper";
import { APIService } from "./api.service";

export class UtilsService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }
}
