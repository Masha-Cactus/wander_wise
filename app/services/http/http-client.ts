import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosStatic } from "axios";

type BaseSuccessResponse<T = object> = T;

const baseURL = 'http://3.91.160.29:8088/';

class HttpClient {
  public api: AxiosInstance;

  constructor(_axios: AxiosStatic, apiURL: string | undefined) {
    const config: AxiosRequestConfig = {
      baseURL: apiURL,
      responseType: "json",
      headers: {
        Accept: "application/json",
      },
    };

    this.api = _axios.create(config);
  }

  public get<T, R = BaseSuccessResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.get(url, config);
  }

  public delete<T, R = BaseSuccessResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.delete(url, config);
  }

  public post<T, R = BaseSuccessResponse<T>>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.post(url, data, config);
  }

  public put<T, D, R = BaseSuccessResponse<T>>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.put(url, data, config);
  }

  public patch<T, D, R = BaseSuccessResponse<T>>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.patch(url, data, config);
  }
}

export const http = new HttpClient(axios, baseURL);
