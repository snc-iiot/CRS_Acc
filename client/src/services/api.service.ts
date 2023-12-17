import axiosInstance from "@/axios/axios-instance";

export abstract class APIService {
  protected readonly axios = axiosInstance;

  protected constructor(protected readonly url: string) {}

  protected get<T>(path: string) {
    return this.axios.get<T>(`${this.url}${path}`);
  }

  protected post<T>(path: string, data: any) {
    return this.axios.post<T>(`${this.url}${path}`, data);
  }

  protected put<T>(path: string, data: any) {
    return this.axios.put<T>(`${this.url}${path}`, data);
  }

  protected delete<T>(path: string) {
    return this.axios.delete<T>(`${this.url}${path}`);
  }

  protected patch<T>(path: string, data: any) {
    return this.axios.patch<T>(`${this.url}${path}`, data);
  }
}
