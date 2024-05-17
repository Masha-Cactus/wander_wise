import { baseClient, authClient } from "@/src/api";;
import { IBannedUser, IEmail, ISignIn, ISignUp, IToken } from "@/src/services";
import { ISignInResponse } from "./auth.types";

class AuthService {
  private BASE_URL = '/auth';

  signUp (data: ISignUp) {
    return baseClient.post<never, IBannedUser>(
      this.BASE_URL + '/register', 
      data,
    );
  };

  signIn (data: ISignIn) {
    return baseClient.post<never, ISignInResponse>(
      this.BASE_URL + '/login', 
      data,
    );
  };

  restorePassword (data: IEmail) {
    return baseClient.post(this.BASE_URL + '/restore-password', data);
  };

  confirmEmail (email: string) {
    return baseClient.post<never, IToken>(
      this.BASE_URL + '/login', 
      { email },  
    );
  };

  refresh () {
    return authClient.get<never, IToken>(this.BASE_URL + '/refresh-jwt');
  };

  logout (token: string) {
    return authClient.get(`${this.BASE_URL}/logout/${token}`);
  }
}

export const authService = new AuthService();