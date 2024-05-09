import { AxiosError } from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";

export const isTokenAlive = (expirationTime: number) => {
  const currentTime = Date.now();

  return currentTime <= expirationTime;
};

export const tokenExpiresIn = (token: string) => {
  if (token) {
    const decoded = jwtDecode<JwtPayload>(token);
    const expirationTime = decoded.exp || 0;

    // convert from seconds to milliseconds
    const expirationTimeInMilliSeconds = expirationTime * 1000;

    return expirationTimeInMilliSeconds;
  }

  return 0;
};

export const getPlainObject = <T>(object: T): T =>
  JSON.parse(JSON.stringify(object));

export const trimObjectFields = <T>(object: T): T => {
  const jsonString = JSON.stringify(object, (_, value) =>
    typeof value === "string" ? value.trim() : value
  );

  return JSON.parse(jsonString);
};

export const normalizeError = (error: AxiosError): string => {
  const errorResponse = error?.response?.data;

  if (typeof errorResponse === "object" && errorResponse !== null) {
    // get array of errors
    const errorMessages = Object.values(errorResponse) as string[];

    // normalize that array and join to string
    const normalizedErrorMessage = errorMessages
      .map((errorMessage) =>
        Array.isArray(errorMessage) ? errorMessage.join(" ") : errorMessage
      )
      .join(" ");

    return normalizedErrorMessage;
  }

  return "Unexpected error";
};