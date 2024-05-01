import { ApiRoutes } from "@/app/lib/constants";
import { http } from "@/app/services";
import type {
  IUser,
  IChangeUserProfileData,
  IEmail,
  IChangeUserPassword,
  ISocialLink,
  ICollection,
} from "@/app/services/userProfile/userProfile.types";

class UserProfileService {
  public getCurrentUser = (id: number): Promise<IUser> =>
    http.get<IUser>(`${ApiRoutes.USER}/${id}/profile`).then((result) => result);

  public requestChangePassword = (id: number): Promise<IUser> => {
    return http
      .get<IUser>(`${ApiRoutes.USER}/request-update-user-password/${id}`)
      .then((result) => result);
  };

  public changePassword = (
    id: number,
    data: IChangeUserPassword
  ): Promise<IUser> => {
    return http
      .put<IUser, IChangeUserPassword>(
      `${ApiRoutes.USER}/update-user-password/${id}`,
      data
    )
      .then((result) => result);
  };

  public requestChangeEmail = (id: number): Promise<IUser> => {
    return http
      .get<IUser>(`${ApiRoutes.USER}/request-update-user-email/${id}`)
      .then((result) => result);
  };

  public changeEmail = (id: number, data: IEmail): Promise<IUser> => {
    return http
      .put<IUser, IEmail>(
      `${ApiRoutes.USER}/update-user-email/${id}`,
      data
    )
      .then((result) => result);
  };

  public changeUserProfileData(
    id: number,
    data: IChangeUserProfileData
  ): Promise<IUser> {
    return http.put<IUser, IChangeUserProfileData>(
      `${ApiRoutes.USER}/update-user-info/${id}`,
      { ...data }
    );
  }

  public unbanUser(id: number, data: IUser): Promise<IUser> {
    return http.put<IUser, IUser>(`${ApiRoutes.USER}/unban-user/${id}`, {
      ...data,
    });
  }

  public banUser(id: number, data: IUser): Promise<IUser> {
    return http.put<IUser, IUser>(`${ApiRoutes.USER}/ban-user/${id}`, {
      ...data,
    });
  }

  public getUserSocialLinks = (id: number): Promise<ISocialLink[]> =>
    http
      .get<ISocialLink[]>(`${ApiRoutes.USER}/${id}/social-links`)
      .then((result) => result);

  public getUserCollections = (id: number): Promise<ICollection[]> =>
    http
      .get<ICollection[]>(`${ApiRoutes.USER}/${id}/collections`)
      .then((result) => result);

  public deleteUser = (id: number): Promise<void> =>
    http.delete<void>(`${ApiRoutes.USER}/delete-user/${id}`).then((result) => result);
}

export const userProfileService = new UserProfileService();
