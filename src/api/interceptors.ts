import { 
  AxiosError, 
  AxiosInstance, 
  AxiosRequestConfig, 
  AxiosResponse, 
  InternalAxiosRequestConfig, 
} from "axios";
import { authService } from "../services/authService/auth.service";

export function onRequest(req: InternalAxiosRequestConfig) {
  const accessToken = localStorage.getItem('accessToken');
  
  if (accessToken) {
    // eslint-disable-next-line no-param-reassign
    req.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  
  return req;
}

export function onResponseSuccess(res: AxiosResponse) {
  return res.data;
}

export function onResponseError(client: AxiosInstance) {
  return async function onAuthError(error: AxiosError) {
    const originalRequest = error.config as AxiosRequestConfig;
    const { status } = error.response as AxiosResponse ?? {};
  
    if (status !== 401) {
      throw error;
    }
  
    try {
      const { token } = await authService.refresh();
  
      localStorage.setItem('accessToken', token);
  
      return client.request(originalRequest);
    } catch (error) {
      localStorage.removeItem('accessToken');
      
      throw error;
    }
  };
}

