export interface IComment {
  id: number,
  stars: number,
  author: string,
  timeStamp: string,
  text: string,
  cardId: number,
}

export interface ICreateComment {
  cardId: number,
  stars: number,
  text: string,
}

export interface IUpdateComment extends ICreateComment {
  id: number,
}

export interface IReportComment {
  id: number,
  commentAuthor: string,
  commentText: string,
  reportText: string,
}