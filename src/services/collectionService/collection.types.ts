import { IShortCard } from "../cardService/card.types";

export interface ICollection {
  id: number,
  author: string,
  name: string,
  imageLink: string,
  isPublic: boolean,
  cardWithoutDistanceDtos: IShortCard[],
}
export interface ICreateCollection {
  userId: number,
  cardIds: number[],
}

export interface IUpdateCollection {
  id: number,
  name: string,
  cardIds: number[],
  isPublic: boolean,
}