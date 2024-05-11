export interface IUser {
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
export interface IUpdateEmail {
  userId: number,
  newEmail: string,
}

export interface IUpdatePassword {
  userId: number,
  password: string,
  repeatPassword: string,
}

export interface IUpdateInfo {
  userId: number,
  pseudonym: string,
  firstName: string,
  lastName: string,
  location: string,
  bio: string,
}
