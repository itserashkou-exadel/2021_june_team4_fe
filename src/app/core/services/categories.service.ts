import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from 'src/app/shared/interfaces';
import { API_URL } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor( private http: HttpClient ) { }

  getCategories() {
    return this.http.get<ICategory[]>(`${API_URL}/categories`);
  }
}
