import { API_BASE_URL } from "@/helpers/common.helper";
import { APIService } from "./api.service";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export class UserService extends APIService {
  constructor() {
    super(API_BASE_URL);
  }

  async getUser(): Promise<User[]> {
    try {
      const response = await this.get("/users");
      return response.data;
    } catch (error) {
      console.error("[UserService] getUser:", error);
      return [];
    }
  }
}
