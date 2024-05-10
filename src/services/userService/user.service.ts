import { ICollection } from "@/src/types/Collection";
import { ISocial } from "@/src/types/Social";
import { IUser } from "@/src/types/User";
import { authClient } from "../../api/authClient";
import { baseClient } from "../../api/baseClient";
import { 
  IUpdateEmail, 
  IUpdateInfo, 
  IUpdatePassword, 
} from "./user.types";
import { IToken } from "@/src/services";

class UserService {
  private BASE_URL = '/users';

  getSocials (userId: number) {
    return baseClient.get<never, ISocial[]>(`${this.BASE_URL}/${userId}/social-links`);
  };

  getProfile (userId: number) {
    return baseClient.get<never, IUser>(`${this.BASE_URL}/${userId}/profile`);
  };

  getCollections (userId: number) {
    return authClient.get<never, ICollection[]>(`${this.BASE_URL}/${userId}/collections`);
  };

  //post on stagger, must be get
  requestUpdatePassword (userId: number) {
    return authClient.get<never, IUser>(`${this.BASE_URL}/request-update-user-password/${userId}`);
  };

  updatePassword ({userId, password, repeatPassword}: IUpdatePassword) {
    return authClient.put<never, IUser>(
      `${this.BASE_URL}/update-user-password/${userId}`,
      { password, repeatPassword },
    );
  }

  requestUpdateEmail ({userId, newEmail}: IUpdateEmail) {
    return authClient.post<never, IUser>(
      `${this.BASE_URL}/request-update-user-email/${userId}`,
      { email: newEmail },
    );
  };

  updateEmail ({userId, newEmail}: IUpdateEmail) {
    return authClient.put<never, IToken>(
      `${this.BASE_URL}/update-user-email/${userId}`,
      { email: newEmail },
    );
  };

  updateUserInfo ({userId, ...data}: IUpdateInfo) {
    return authClient.put<never, IUser>(
      `${this.BASE_URL}/update-user-info/${userId}`,
      data,
    );
  }

  deleteUser (userId: number) {
    return authClient.delete(`${this.BASE_URL}/delete-user/${userId}`);
  };
}

export const userService = new UserService();