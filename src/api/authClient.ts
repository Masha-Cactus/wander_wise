import { createClient } from "./client";
import { onRequest, onResponseSuccess } from "./interceptors";

export const authClient = createClient();

authClient.interceptors.request.use(onRequest);
authClient.interceptors.response.use(onResponseSuccess);