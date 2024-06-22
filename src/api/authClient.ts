import { createClient } from "./client";
import { onBaseRequest, onAuthRequest, onResponseSuccess } from "./interceptors";

export const authClient = createClient();

authClient.interceptors.request.use(onBaseRequest);
authClient.interceptors.request.use(onAuthRequest);
authClient.interceptors.response.use(onResponseSuccess);