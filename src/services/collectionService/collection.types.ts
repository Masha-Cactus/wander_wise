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