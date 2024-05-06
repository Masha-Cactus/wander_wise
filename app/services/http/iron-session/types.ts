export interface UserSessionData {
  id: number;
  accessToken: string;
  refreshToken: string;

  [method: string]: any;
}
