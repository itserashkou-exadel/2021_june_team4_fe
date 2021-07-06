import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITag } from 'src/app/shared/interfaces';
import { API_URL } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor( private http: HttpClient ) { }

  getTags() {
    return this.http.get<ITag[]>(`${API_URL}/tags`);
  }
}
