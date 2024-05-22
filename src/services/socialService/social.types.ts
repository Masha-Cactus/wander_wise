export type SocialLinkName = 'Website' | 'Instagram' | 'Twitter';

export interface ISocial {
  id: number,
  name: SocialLinkName,
  link: string,
}

export interface ICreateSocial {
  userId: number,
  name: SocialLinkName,
  link: string,
}

export interface IUpdateSocial extends ICreateSocial {
  id: number,
}