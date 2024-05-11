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

export interface IUpdateImage {
  id: number,
  image: File,
}
