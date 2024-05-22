import { createClient } from "./client";
import { onRequest, onResponseError, onResponseSuccess } from "./interceptors";

export const authClient = createClient();

authClient.interceptors.request.use(onRequest);
authClient.interceptors.response.use(
  onResponseSuccess, 
  onResponseError,
);