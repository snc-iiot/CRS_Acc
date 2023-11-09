import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://snc-services.sncformer.com/dev/iCDM/api/index.php",
  timeout: 10000,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    console.log(`[REQUEST] ${config.method?.toUpperCase()} - ${config.url}`);
    console.log(`[REQUEST BODY] ${JSON.stringify(config.data)}`);
    return config;
  },
  (error) => {
    console.error("[REQUEST ERROR]", error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`[RESPONSE] ${response.status} - ${response.config.url}`);
    console.log(`[RESPONSE BODY] ${JSON.stringify(response.data)}`);
    return response;
  },
  (error) => {
    console.error("[RESPONSE ERROR]", error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
