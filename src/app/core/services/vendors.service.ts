import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IVendor } from 'src/app/shared/interfaces';
import { API_URL } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {

  constructor( private http: HttpClient ) { }

  getVendors() {
    return this.http.get<IVendor[]>(`${API_URL}/vendors`)
  }
}
