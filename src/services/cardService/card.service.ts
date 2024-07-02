import { authClient, baseClient } from "@/src/api";
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

  addImages ({id, images}: IAddCardImages) {
    return authClient.putForm<never, ICard>(
      `${this.BASE_URL}/add-images/${id}`,
      images,
    );
  };

  addToSaved(cardId: number) {
    return authClient.get(`${this.BASE_URL}/add-to-saved/${cardId}`);
  }

  removeFromSaved(cardId: number) {
    return authClient.get(`${this.BASE_URL}/remove-from-saved/${cardId}`);
  }

  likeCard(cardId: number) {
    return authClient.get(`${this.BASE_URL}/post-like/${cardId}`);
  }

  unlikeCard(cardId: number) {
    return authClient.get(`${this.BASE_URL}/remove-like/${cardId}`);
  }

  deleteCard(id: number) {
    return authClient.delete(`${this.BASE_URL}/${id}`);
  };

  searchCards(page: number, data: ISearchCard, signal: AbortSignal) {
    return baseClient.post<never, ISearchCardResponse>(
      `${this.BASE_URL}/search?page=${page}&size=${CARDS_PER_PAGE}&sort=asc`, 
      data,
      { signal }
    );
  };

  getPopular(signal: AbortSignal) {
    return baseClient.get<never, ICard[]>(
      `${this.BASE_URL}/random/${CARDS_PER_PAGE}`,
      { signal }
    );
  }
}

export const cardService = new CardService();
