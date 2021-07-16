import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/shared/interfaces';
import { API_URL } from 'src/app/shared/constants';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor( private http: HttpClient ) { }

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${API_URL}/categories`);
  };

  // createCategory(category: string): Observable<string> { 
  //   return this.http.post<string>(`${API_URL}/categories`, category, httpOptions)
  // };

  createCategory(category: string): any { 
    return this.http.post<string>(`${API_URL}/categories`, category, httpOptions).subscribe(
      () => {},
      err => console.log(err),
      () => alert('New category has been saved successfully')
    )
  };
}
