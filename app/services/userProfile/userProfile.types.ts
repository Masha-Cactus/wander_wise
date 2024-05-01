export interface IUser {
  id: number;
  email: string;
  pseudonym: string;
  firstName: string;
  lastName: string;
  profileImage: string | undefined;
  location: string;
  bio: string;
  roleIds: number[];
  emailConfirmCode: number;
  banned: boolean;
}

export interface IVerifyEmail {
  key: string;
}

export interface IChangeUserPassword {
  password: string;
  repeatPassword: string;
}

export interface IEmail {
  email: string;
}


export interface IChangeUserProfileData {
  firstName?: string;
  lastName?: string;
  pseudonym?: string;
  profileImage?: File;
  location?: string;
  bio?: string;
}

export interface ISocialLink {
  name: string;
  link: string;
}

export interface ICollection {
  id: number;
  author: string;
  name: string;
  imageLink: string;
  isPublic: boolean;
}
