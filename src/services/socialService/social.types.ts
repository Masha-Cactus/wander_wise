export interface ISocial {
  name: string,
  link: string,
}

export interface ICreateSocial extends ISocial {
  userId: number,
}

export interface IUpdateSocial extends ICreateSocial {
  id: number,
}