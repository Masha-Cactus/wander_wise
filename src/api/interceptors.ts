import { 
  AxiosResponse, 
  InternalAxiosRequestConfig, 
} from "axios";
import { getCookie } from "cookies-next";

export function onRequest(req: InternalAxiosRequestConfig) {
  const accessToken = getCookie('token');
  
  if (accessToken) {
    // eslint-disable-next-line no-param-reassign
    req.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  
  return req;
}

export function onResponseSuccess(res: AxiosResponse) {
  return res.data;
}

