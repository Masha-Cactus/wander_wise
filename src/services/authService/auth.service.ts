import { authClient } from "../../api/authClient";
import { baseClient } from "../../api/baseClient";
import { IBannedUser, IEmail, ISignIn, ISignUp, IToken } from "./auth.types";

class AuthService {
  private BASE_URL = '/auth';

  signUp (data: ISignUp) {
    return baseClient.post<never, IBannedUser>(
      this.BASE_URL + '/register', 
      data,
    );
  };

  //must return a user and a token
  signIn (data: ISignIn) {
    return baseClient.post<never, IToken>(
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
  }
}

export const authService = new AuthService();