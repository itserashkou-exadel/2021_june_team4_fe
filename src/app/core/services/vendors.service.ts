import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDiscountTest } from 'src/app/shared/interfaces';
import { API_URL } from 'src/app/shared/constants';
import { filter } from 'rxjs/operators'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class VendorsService {

  constructor( private http: HttpClient ) { }

  getVendors(): Observable<any> {
    return this.http.get<any>(`${API_URL}/vendors`);
  };
  
  createVendor(vendorFormData: Observable<any>): Observable<any> {
    return this.http.post<any>(`${API_URL}/vendors`, vendorFormData, httpOptions);
  };

  // Function for delete vendors from BD!!!!!!!!!! Warning!!!!!
  // _deleteVendor(): any {
  //   return this.http.get<any>(`${API_URL}/vendors`).subscribe(
  //     data => console.log(data)
  //   )
  // }

  getAllDiscounts() {
    return this.http.get<Array<any>>(`${API_URL}/discounts`).subscribe(
      data => data.filter((value: IDiscountTest) => value.vendor.name === 'SportLife')
    )
  }
}
