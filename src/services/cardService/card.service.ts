import { formDataClient, authClient, baseClient } from "@/src/api";
import { ApiEndpoints, CARDS_PER_PAGE } from "@/src/lib/constants";
import { 
  ICard, 
  IAddCardImages, 
  ICreateCard, 
  ISearchCard, 
  IUpdateCard,
  IReportCard, 
  ISearchCardResponse
} from "@/src/services";

class CardService {
  private BASE_URL = ApiEndpoints.CARDS;

  getCards(): Promise<ICard[]> {
    return authClient.get<never, ICard[]>(this.BASE_URL);
  }

  getCardDetails(cardId: number): Promise<ICard> {
    return baseClient.get<never, ICard>(`${this.BASE_URL}/details/${cardId}`);
  }

  createCard(data: ICreateCard): Promise<ICard> {
    return authClient.post<never, ICard>(this.BASE_URL, data);
  }

  updateCard({id, ...data}: IUpdateCard) {
    return authClient.put<never, ICard>(`${this.BASE_URL}/update/${id}`, data);
  };

  reportCard({ cardId, text }: IReportCard) {
    return authClient.put(
      `${this.BASE_URL}/report/${cardId}`,
      { text }
    );
  }

  addImages (data: IAddCardImages) {
    return formDataClient.put<never, ICard>(
      `${this.BASE_URL}/add-images/${data.id}`,
      data,
    );
  };

  //currently on the server the method is put
  addToSaved(cardId: number) {
    return authClient.put(`${this.BASE_URL}/add-to-saved/${cardId}`);
  }

  //currently on the server the method is put
  removeFromSaved(cardId: number) {
    return authClient.put(`${this.BASE_URL}/remove-from-saved/${cardId}`);
  }

  //currently on the server the method is put
  likeCard(cardId: number) {
    return authClient.put(`${this.BASE_URL}/post-like/${cardId}`);
  }

  //currently on the server the method is put
  unlikeCard(cardId: number) {
    return authClient.put(`${this.BASE_URL}/remove-like/${cardId}`);
  }

  deleteCard(id: number) {
    return authClient.delete(`${this.BASE_URL}/${id}`);
  };

  searchCards(page: number, data: ISearchCard) {
    return baseClient.post<never, ISearchCardResponse>(
      `${this.BASE_URL}/search?page=${page}&size=${CARDS_PER_PAGE}&sort=asc`, 
      data,
    );
  };

  getPopular() {
    return baseClient.get<never, ICard[]>(`${this.BASE_URL}/random/${CARDS_PER_PAGE}`);
  }
}

export const cardService = new CardService();
