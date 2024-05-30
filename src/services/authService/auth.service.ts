import { baseClient, authClient } from "@/src/api";
import { 
  IUser, 
  IEmail, 
  ISignIn, 
  ISignUp, 
  IAuthResponse 
} from "@/src/services";

class AuthService {
  private BASE_URL = '/auth';

  signUp (data: ISignUp) {
    return baseClient.post<never, IUser>(
      this.BASE_URL + '/register', 
      data,
    );
  };

  signIn (data: ISignIn) {
    return baseClient.post<never, IAuthResponse>(
      this.BASE_URL + '/login', 
      data,
    );
  };

  restorePassword (data: IEmail) {
    return baseClient.post(this.BASE_URL + '/restore-password', data);
  };

  confirmEmail (email: string) {
    return baseClient.post<never, IAuthResponse>(
      this.BASE_URL + '/confirm-email', 
      { email },  
    );
  };

  refresh () {
    return authClient.get<never, IAuthResponse>(this.BASE_URL + '/refresh-jwt');
  };

  logout (token: string) {
    return authClient.get(`${this.BASE_URL}/logout/${token}`);
  }
}

export const authService = new AuthService();