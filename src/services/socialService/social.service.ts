import { ISocial } from "@/src/types/Social";
import { authClient } from "../../api/authClient";
import { ICreateSocial, IUpdateSocial } from "./social.types";

class SocialService {
  private BASE_URL = '/social-links';

  addSocial (data: ICreateSocial) {
    return authClient.post<never, ISocial>(this.BASE_URL, data);
  };

  //id comes from where?
  updateSocial ({id, ...data}: IUpdateSocial) {
    return authClient.put<never, ISocial>(`${this.BASE_URL}/${id}`, data);
  };

  deleteSocial (id: number) {
    return authClient.delete(`${this.BASE_URL}/${id}`);
  };
}

export const socialService = new SocialService();