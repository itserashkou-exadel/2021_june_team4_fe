import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// TODO: add API link
const AUTH_API = '';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }
  
  login(email: string, password: string): Observable<any> {
    // TODO: Edit request link
    return this.http.post(AUTH_API + '', {
    //
      email,
      password
    }, httpOptions)
  }
}
