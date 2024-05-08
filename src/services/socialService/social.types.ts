import { ISocial } from "@/src/types/Social";

export interface ICreateSocial extends ISocial {
  userId: number,
}

export interface IUpdateSocial extends ICreateSocial {
  id: number,
}