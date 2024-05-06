import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";
import { initializeInterceptors } from "./interseptors/initializeInterceptors";

const baseURL = 'http://3.91.160.29:8088/';

const config: AxiosRequestConfig = {
  responseType: "json",
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const formDataConfig: AxiosRequestConfig = {
  baseURL,
  ...config,
};

const formDataConfigApiInstance = axios.create(formDataConfig);

initializeInterceptors(formDataConfigApiInstance);

export const formDataApi: AxiosInstance = formDataConfigApiInstance;
