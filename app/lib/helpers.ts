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