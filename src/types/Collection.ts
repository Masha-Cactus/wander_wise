import { CardWithoutDistance } from "./Card";

export interface ICollection {
  id: number,
  author: string,
  name: string,
  imageLink: string,
  isPublic: boolean,
  cardWithoutDistanceDtos: CardWithoutDistance[],
}