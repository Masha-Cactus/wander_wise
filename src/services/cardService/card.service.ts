import { formDataClient } from "@/src/api/formDataClient";
import { CardWithoutDistance, ICard } from "@/src/types/Card";
import { authClient } from "../../api/authClient";
import { 
  IAddCardImages, 
  ICreateCard, 
  ISearchCard, 
  IUpdateCard 
} from "./card.types";

class CardService {
  private BASE_URL = '/cards';

  getCardDetails(id: number) {
    return authClient.get<never, CardWithoutDistance>(`${this.BASE_URL}/details/${id}`);
  };

  createCard(data: ICreateCard) {
    return authClient.post<never, CardWithoutDistance>(this.BASE_URL, data);
  };

  updateCard({id, ...data}: IUpdateCard) {
    return authClient.put<never, CardWithoutDistance>(`${this.BASE_URL}/update/${id}`, data);
  };

  addImages (data: IAddCardImages) {
    return formDataClient.put<never, CardWithoutDistance>(
      `${this.BASE_URL}/add-images/${data.id}`,
      data,
    );
  };

  //currently on the server the method is put
  addToSaved(id: number) {
    return authClient.get(`${this.BASE_URL}/add-to-saved/${id}`);
  };

  //currently on the server the method is put
  removeFromSaved(id: number) {
    return authClient.get(`${this.BASE_URL}/remove-from-saved/${id}`);
  };

  //currently on the server the method is put
  postLike(id: number) {
    return authClient.get(`${this.BASE_URL}/post-like/${id}`);
  };

  //currently on the server the method is put
  removeLike(id: number) {
    return authClient.get(`${this.BASE_URL}/remove-like/${id}`);
  };

  deleteCard(id: number) {
    return authClient.delete(`${this.BASE_URL}/${id}`);
  };

  searchCards(page: number, data: ISearchCard) {
    return authClient.post<never, ICard[]>(
      `${this.BASE_URL}/search?page=${page}&size=8&sort=asc`, 
      data,
    );
  }
}

export const cardService = new CardService();