import { createClient } from "./client";
import { onResponseError, onResponseSuccess } from "./interceptors";

export const formDataClient = createClient({
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

formDataClient.interceptors.response.use(
  onResponseSuccess, 
  onResponseError(formDataClient),
);