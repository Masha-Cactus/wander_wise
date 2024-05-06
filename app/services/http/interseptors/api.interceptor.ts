/* eslint-disable no-param-reassign */
import type { InternalAxiosRequestConfig } from "axios";

import { authenticationService } from "@/app/services";
import {
  AuthenticationError,
  SessionExpiredError,
  getSession,
  saveTokenInSession,
} from "@/app/services/http";
import { isTokenAlive, tokenExpiresIn } from "@/app/lib/helpers";

const requestQueue: any[] = [];

export const isServerSide = typeof window === "undefined";

let isRefreshing = false;

export const apiInterceptor = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig<any>> => {
  // Need not to set authorization header for public routes

  const { accessToken, refreshToken } = await getSession({
    isReturnPlainObject: true,
  });

  // Redirect to sign-in when user has no session data
  if (!accessToken && !refreshToken) {
    throw new AuthenticationError("Unauthorized");
  }

  const accessTokenExpiresIn = tokenExpiresIn(accessToken);
  const refreshTokenExpiresIn = tokenExpiresIn(refreshToken);

  const isAccessTokenExpired = !isTokenAlive(accessTokenExpiresIn);
  const isRefreshTokenExpired = !isTokenAlive(refreshTokenExpiresIn);

  // Logout when refresh token expired
  if (isRefreshTokenExpired) {
    throw new SessionExpiredError("Session expired");
  }

  // Refresh access token when access token expired
  if (isAccessTokenExpired) {
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const { token: newAccessToken }
          = await authenticationService.refreshToken(refreshToken);

        if (!isServerSide) {
          await saveTokenInSession(newAccessToken);
        }

        config.headers.Authorization = `Bearer ${newAccessToken}`;

        isRefreshing = false;
        // Retry all the queued requests
        requestQueue.forEach((request) => request(newAccessToken));
        // Clear the queue
        requestQueue.length = 0;
      } catch (error: any) {
        throw new Error("Expired token");
      }

      return config;
    }

    return new Promise((resolve) => {
      requestQueue.push((newToken: string) => {
        config.headers.Authorization = `Bearer ${newToken}`;

        resolve(config);
      });
    });
  }

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};
