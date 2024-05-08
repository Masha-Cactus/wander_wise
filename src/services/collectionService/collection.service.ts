import { ICollection } from "@/src/types/Collection";
import { authClient } from "../../api/authClient";
import { ICreateCollection, IUpdateCollection } from "./collection.types";

class CollectionService {
  private BASE_URL = '/collections';

  getCollection(collectionId: number) {
    return authClient.get<never, ICollection>(`${this.BASE_URL}/${collectionId}`);
  };

  createCollection(data: ICreateCollection) {
    return authClient.post<never, ICollection>(this.BASE_URL, data);
  };

  updateCollection({id, ...data}: IUpdateCollection) {
    return authClient.put<never, ICollection>(
      `${this.BASE_URL}/${id}`,
      data,
    );
  };

  deleteCollection(collectionId: number) {
    return authClient.delete(`${this.BASE_URL}/${collectionId}`);
  };
}

export const collectionService = new CollectionService();