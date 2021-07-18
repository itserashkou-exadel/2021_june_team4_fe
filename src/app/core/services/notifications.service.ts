import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, MOCK_API_URL } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }

  requestPromo(discountId: string): Observable<any> {
    const response = this.http.get(`${API_URL}/discounts/${discountId}`);
    return response;
  }
}
