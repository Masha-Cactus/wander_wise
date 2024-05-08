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