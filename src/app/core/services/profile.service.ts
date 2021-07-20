import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces';
import { API_URL } from 'src/app/shared/constants';
import {DISCOUNT_URL} from 'src/app/shared/constants';
import { IDescription } from "../../shared/interfaces";

// const httpOptions = {
//   headers: new HttpHeaders({'Content-Type': 'application/json'})
// };

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  constructor( private http: HttpClient ) { }

  getDescriptionAll(): Observable<IDescription[]> {
    return this.http.get<IDescription[]>(`${DISCOUNT_URL}`);
  };
  getUser(): Observable<IUser> {
    return this.http.get<IUser>(`${API_URL}/users/91cf19dd-2af7-49ee-825e-94c0831ba1f2`);
  };
  getFavorite(id: any): Observable<any> {
    return this.http.get<any>(`${API_URL}/favorites/${id}`);
  };
}
