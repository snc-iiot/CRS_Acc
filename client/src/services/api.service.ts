import axios from "axios";

export abstract class APIService {
  protected baseURL: string;
  protected headers: unknown = {};

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  setAccessToken(token: string) {
    localStorage.setItem("key-icrs", token);
  }

  getAccessToken() {
    return localStorage.getItem("key-icrs");
  }

  removeAccessToken() {
    localStorage.removeItem("key-icrs");
  }

  setRefreshToken(token: string) {
    localStorage.setItem("key-icrs", token);
  }

  getRefreshToken() {
    return localStorage.getItem("key-icrs");
  }

  removeRefreshToken() {
    localStorage.removeItem("key-icrs");
  }

  getHeaders() {
    return {
      Authorization: `Bearer ${this.getAccessToken()}`,
    };
  }

  get(url: string, config = {}): Promise<any> {
    return axios({
      method: "get",
      url: this.baseURL + url,
      headers: this.getAccessToken() ? this.getHeaders() : {},
      ...config,
    });
  }

  post(url: string, data = {}, config = {}): Promise<any> {
    return axios({
      method: "post",
      url: this.baseURL + url,
      data,
      headers: this.getAccessToken() ? this.getHeaders() : {},
      ...config,
    });
  }

  put(url: string, data = {}, config = {}): Promise<any> {
    return axios({
      method: "put",
      url: this.baseURL + url,
      data,
      headers: this.getAccessToken() ? this.getHeaders() : {},
      ...config,
    });
  }

  patch(url: string, data = {}, config = {}): Promise<any> {
    return axios({
      method: "patch",
      url: this.baseURL + url,
      data,
      headers: this.getAccessToken() ? this.getHeaders() : {},
      ...config,
    });
  }

  delete(url: string, data?: any, config = {}): Promise<any> {
    return axios({
      method: "delete",
      url: this.baseURL + url,
      data: data,
      headers: this.getAccessToken() ? this.getHeaders() : {},
      ...config,
    });
  }

  request(config = {}) {
    return axios(config);
  }
}
