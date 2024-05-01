import { IUser } from "../userProfile/userProfile.types";

export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignUp {
  email: string;
  password1: string;
  password2: string;
}

export interface IAuthenticationResponse {
  accessToken: string;
  refreshToken: string;
  invitedToPath: string;
  user: IUser;
}

export interface IToken {
  token: string;
}