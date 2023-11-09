import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = "https://example.com/api/v1";

axiosClient.defaults.headers.common = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

//All request will wait 2 seconds before timeout
axiosClient.defaults.timeout = 2000;

axiosClient.defaults.withCredentials = true;
