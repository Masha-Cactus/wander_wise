import { createClient } from "./client";
import { onBaseRequest, onResponseSuccess } from "./interceptors";

export const baseClient = createClient();

baseClient.interceptors.request.use(onBaseRequest);
baseClient.interceptors.response.use(onResponseSuccess);