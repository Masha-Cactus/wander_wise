import type { AxiosInstance } from "axios";

import { apiInterceptor } from "./api.interceptor";

export function initializeInterceptors(api: AxiosInstance): AxiosInstance {
  api.interceptors.request.use(apiInterceptor);

  return api;
}
