import { 
  AxiosResponse, 
  InternalAxiosRequestConfig, 
} from "axios";
import { getCookie } from "cookies-next";

export function onBaseRequest(req: InternalAxiosRequestConfig) {
  req.headers['Accept-Language'] = 'en-US,en;q=0.9';

  return req;
}

export function onAuthRequest(req: InternalAxiosRequestConfig) {
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

