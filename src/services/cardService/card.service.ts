import { authClient, formDataClient } from "@/src/api";
import {
  IAddImages,
  ICard,
  ICreateCard,
  IReportCard,
  IUpdateCard,
} from "./card.types";

class CardService {
  private BASE_URL = "/cards";

  getCards(): Promise<ICard[]> {
    return authClient.get<never, ICard[]>(this.BASE_URL);
  }

  getCardDetails(cardId: number): Promise<ICard> {
    return authClient.get<never, ICard>(`${this.BASE_URL}/details/${cardId}`);
  }

  createCard(data: ICreateCard): Promise<ICard> {
    return authClient.post<never, ICard>(this.BASE_URL, data);
  }

  updateCard({ cardId, data }: IUpdateCard) {
    return authClient.put<never, ICard>(
      `${this.BASE_URL}/update/${cardId}`,
      data
    );
  }

  reportCard({ cardId, text }: IReportCard): Promise<void> {
    return authClient.put<IReportCard, void>(
      `${this.BASE_URL}/report/${cardId}`,
      { cardId, text }
    );
  }

  //currently on the server the method is put
  addToSaved(cardId: number) {
    return authClient.get(`${this.BASE_URL}/add-to-saved/${cardId}`);
  }

  //currently on the server the method is put
  removeFromSaved(cardId: number): Promise<void> {
    return authClient.get(`${this.BASE_URL}/remove-from-saved/${cardId}`);
  }

  //currently on the server the method is put
  likeCard(cardId: number): Promise<void> {
    return authClient.get(`${this.BASE_URL}/post-like/${cardId}`);
  }

  //currently on the server the method is put
  unlikeCard(cardId: number): Promise<void> {
    return authClient.get(`${this.BASE_URL}/remove-like/${cardId}`);
  }

  deleteCard(cardId: number) {
    return authClient.delete(`${this.BASE_URL}/${cardId}`);
  }

  addImages({cardId, images}: IAddImages): Promise<ICard> {
    return formDataClient.put<IAddImages, ICard>(`${this.BASE_URL}/add-images/${cardId}`, images);
  }
}

export const cardService = new CardService();
