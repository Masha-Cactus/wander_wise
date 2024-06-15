import { ICard } from "@/src/services";

export interface ICollection {
  id: number,
  author: string,
  name: string,
  imageLink: string,
  isPublic: boolean,
  cardDtos: ICard[],
}

export interface ICreateCollection {
  userId: number,
  name: string,
  cardIds: number[],
}

export interface IUpdateCollection {
  id: number,
  name: string,
  cardIds: number[],
  isPublic: boolean,
}