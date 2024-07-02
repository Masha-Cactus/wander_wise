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
  oldPassword: string,
  password: string,
  repeatPassword: string,
}

export interface IUpdateInfo {
  userId: number,
  pseudonym: string,
  firstName?: string,
  lastName?: string,
  location?: string,
  bio?: string,
}

export interface IUpdateImage {
  id: number,
  image: File | Uint8Array,
}
