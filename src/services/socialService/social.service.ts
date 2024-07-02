import { authClient } from "@/src/api";
import { ApiEndpoints } from "@/src/lib/constants";
import { ICreateSocial, ISocial, IUpdateSocial } from "@/src/services";

class SocialService {
  private BASE_URL = ApiEndpoints.SOCIAL_LINKS;

  addSocial (data: ICreateSocial) {
    return authClient.post<never, ISocial>(this.BASE_URL, data);
  };

  updateSocial ({id, ...data}: IUpdateSocial) {
    return authClient.put<never, ISocial>(`${this.BASE_URL}/${id}`, data);
  };

  deleteSocial (id: number) {
    return authClient.delete(`${this.BASE_URL}/${id}`);
  };
}

export const socialService = new SocialService();