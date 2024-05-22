import { 
  AxiosError, 
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

export function onResponseError(error: AxiosError) {
  throw error;
  // const { status } = error.response as AxiosResponse ?? {};
  
  // if (status !== 401) {
  //   throw error;
  // } else {
  //   deleteCookie('userId');
  //   deleteCookie('token');
  //   window.location.href = '/';
  // }
}

