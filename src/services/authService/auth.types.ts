import { IUser } from "@/src/services";

export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignUp {
  email: string;
  password: string;
  repeatPassword: string;
}

export interface IEmail {
  email: string,
}

export interface IToken {
  token: string;
}

export interface IAuthResponse {
  user: IUser,
  token: string,
}