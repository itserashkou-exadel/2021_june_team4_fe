import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(private http: HttpClient) {}

  requestCategories = (): Observable<any> => {
    let response = this.http.get('http://localhost:8080/categories');
    return response;
  };

  requestVendors = (): Observable<any> => {
    let response = this.http.get('http://localhost:8080/vendors');
    return response;
  };

  requestTags = (): Observable<any> => {
    let response = this.http.get('http://localhost:8080/tags');
    return response;
  };

  requestCities = (): Observable<any> => {
    let response = this.http.get('http://localhost:8080/countries');
    return response;
  };
}
