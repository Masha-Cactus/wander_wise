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
