import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

//import { Movie } from '../models/movie.model';

@Injectable()
export class HomeHttpService {
  constructor(private http: HttpClient) {
   // const url = 'http://localhost:8080/discounts';
  }
  

  getDiscounts(): Observable<any> {
    return this.http
      .get<any>(`http://localhost:8080/discounts`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
    
}