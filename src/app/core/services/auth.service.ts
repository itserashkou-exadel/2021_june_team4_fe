import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IToken, IUserLogin } from '../../shared/interfaces';
import { TokenStorageService } from './token-storage.service';
import { map } from "rxjs/operators";

const AUTH_API = 'http://localhost:8080/authenticate/login';
const REFRESH_API = 'http://localhost:8080/authenticate/refresh';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private refreshTokenTimeout: any;

  constructor( private http: HttpClient,
               private tokenStorage: TokenStorageService) { }

  login(user: IUserLogin): Observable<IToken> {
    return this.http.post<IToken>(AUTH_API, user, httpOptions)
  }

  logout() {//todo logout
    // this.stopRefreshTokenTimer();
    // this.userSubject.next(null);
    // this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.tokenStorage.getToken()
  }

  updateAccessToken() {
    return this.http.post<IToken>(REFRESH_API, null)
      .pipe(map((data) => {

        let jwtToken: any = {
          accessToken: data.accessToken,
          refreshToken: window.sessionStorage.getItem('refreshToken')
        }
        this.tokenStorage.saveToken(jwtToken);
        this.stopRefreshTokenTimer();
        this.startRefreshTokenTimer();//todo update token
        return jwtToken;
      }));
  }

  startRefreshTokenTimer() {
    let token = this.tokenStorage.getToken();
    if(token) {
      // parse json object from base64 encoded jwt token
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      // set a timeout to refresh the token a 10 seconds before it expires
      const expires = new Date(expiry * 1000);
      const timeout = expires.getTime() - Date.now() - (10 * 1000);//60 minute or 10 seconds

      this.refreshTokenTimeout = setTimeout(() => {
        this.updateAccessToken().subscribe();
      }, timeout);
    }
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
