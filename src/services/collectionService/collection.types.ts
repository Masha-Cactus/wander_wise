import { ICard } from "../cardService/card.types";

export interface ICollection {
  id: number,
  author: string,
  name: string,
  imageLink: string,
  isPublic: boolean,
  cardDtos: ICard[],
}
export type ShortCollection = Omit<ICollection, 'cardWithoutDistanceDtos'>;

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