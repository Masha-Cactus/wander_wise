import { http } from "@/app/services/http/http-client";
import type {
  ISignIn,
  ISignUp,
  IAuthenticationResponse,
  IToken,
} from "./authentication.types";
import { IEmail } from "../userProfile/userProfile.types";

class AuthenticationService {
  public signIn = (data: ISignIn): Promise<IToken> =>
    http
      .post<IToken>("/login", data)
      .then((result) => result);

  public signUp = (data: ISignUp): Promise<IAuthenticationResponse> =>
    http
      .post<IAuthenticationResponse>("/register", data)
      .then((result) => result);

  public refreshToken = (
    refreshToken: string
  ): Promise<IToken> => {
    const data = {
      refresh: refreshToken,
    };

    return http
      .post<IToken>("/authentication/token/refresh", data)
      .then((result) => result);
  };

  public restorePassword = (email: IEmail): Promise<void> =>
    http
      .post<void>("/restore-password", { email })
      .then((result) => result);
  
  public confirmEmail = (email: IEmail): Promise<IToken> =>
    http
      .post<IToken>("/confirm-email", { email })
      .then((result) => result);
}

export const authenticationService = new AuthenticationService();
