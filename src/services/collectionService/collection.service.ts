import { authClient } from "@/src/api";
import { ApiEndpoints } from "@/src/lib/constants";
import {
  ICollection,
  ICreateCollection,
  IUpdateCollection,
} from "@/src/services";

class CollectionService {
  private BASE_URL = ApiEndpoints.COLLECTIONS;

  getCollection(collectionId: number) {
    return authClient.get<never, ICollection>(
      `${this.BASE_URL}/${collectionId}`
    );
  }

  createCollection(data: ICreateCollection) {
    return authClient.post<never, ICollection>(this.BASE_URL, data);
  }

  updateCollection({ id, ...data }: IUpdateCollection) {
    return authClient.put<never, ICollection>(`${this.BASE_URL}/${id}`, data);
  }

  deleteCollection(collectionId: number) {
    return authClient.delete(`${this.BASE_URL}/${collectionId}`);
  }
}

export const collectionService = new CollectionService();
