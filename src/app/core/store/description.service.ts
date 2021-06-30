import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DescriptionService {
  constructor(private http: HttpClient) {}

  getDescriptionRequest(){
    return this.http
      .get(`http://localhost:8080/discounts/5f69268b-705e-4fb9-8147-722b4ec1d9da`)
  }

}
