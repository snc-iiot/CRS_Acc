import axiosInstance from "./instance";

export const getRequest = (url: string) => {
  try {
    return axiosInstance.get(url);
  } catch (error) {
    console.log(error);
  }
};

export const postRequest = (url: string, data: any) => {
  try {
    return axiosInstance.post(url, data);
  } catch (error) {
    console.log(error);
  }
};

export const putRequest = (url: string, data: any) => {
  try {
    return axiosInstance.put(url, data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteRequest = (url: string) => {
  try {
    return axiosInstance.delete(url);
  } catch (error) {
    console.log(error);
  }
};
