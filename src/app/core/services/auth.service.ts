import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IToken, IUserLogin } from '../../shared/interfaces';
import { TokenStorageService } from './token-storage.service';
import { API_URL } from '../../shared/constants';

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
    return this.http.post<IToken>(`${API_URL}/authenticate/login`, user, httpOptions)
  }

  isAuthenticated(): boolean {
    return !!this.token.getToken()
  }
}

