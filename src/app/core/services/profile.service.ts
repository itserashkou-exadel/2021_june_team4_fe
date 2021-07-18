import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces';
import { API_URL } from 'src/app/shared/constants';

// const httpOptions = {
//   headers: new HttpHeaders({'Content-Type': 'application/json'})
// };

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor( private http: HttpClient ) { }

  getUser(): Observable<IUser> {
    return this.http.get<IUser>(`${API_URL}/users/91cf19dd-2af7-49ee-825e-94c0831ba1f2`);
  };
  getFavorite(): Observable<any> {
    return this.http.get<any>(`${API_URL}/favorites/91cf19dd-2af7-49ee-825e-94c0831ba1f2`);
  };
}
