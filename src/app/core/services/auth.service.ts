import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IToken, IUserLogin } from '../../shared/variables';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:8080/authenticate/login';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor( private http: HttpClient,
               private token: TokenStorageService ) { }

  login(user: IUserLogin): Observable<IToken> {
    return this.http.post<IToken>(AUTH_API, user, httpOptions)
  }

  isAuthenticated(): boolean {
    return !!this.token.getToken()
  }
}
