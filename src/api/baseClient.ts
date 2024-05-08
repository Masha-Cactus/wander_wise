import { createClient } from "./client";
import { onResponseSuccess } from "./interceptors";

export const baseClient = createClient();

baseClient.interceptors.response.use(onResponseSuccess);