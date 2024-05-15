import { IUser } from "../userService/user.types";

export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignUp {
  email: string;
  password: string;
  repeatPassword: string;
}

export interface IBannedUser {
  id: number,
  pseudonym: string,
  email: string,
  firstName: string,
  lastName: string,
  profileImage: string,
  location: string,
  bio: string,
  roleIds: number[],
  banned: boolean,
  emailConfirmCode: string;
}

export interface IEmail {
  email: string,
}

export interface IToken {
  token: string;
}

export interface ISignInResponse {
  userDto: IUser,
  token: string,
}