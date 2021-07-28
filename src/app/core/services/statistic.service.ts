import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {STATISTIC_DISCOUNTS_URL, STATISTIC_VENDORS_URL} from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  constructor(private http: HttpClient) {
  }

  getStatisticVendors(params: any) {
    if (params.sortBy === 'created') {
      return this.http.get<any>(`${STATISTIC_VENDORS_URL}`);
    } else {
      let paramsForRequest = `?sortBy=${params.sortBy}`
        + `&sortDirection=${params.sortDirection}`
        + `&page=${params.page}`;
      return this.http.get<any>(`${STATISTIC_VENDORS_URL}${paramsForRequest}`);
    }
  }

  getStatisticDiscounts() {//params: any
    // let paramsForRequest = `?sortBy=${params.sortActive}`
    //   + `&sortDirection=${params.sortDirection}`
    //   + `&page=${params.paginatorPageIndex}`;

    return this.http.get<any>(`${STATISTIC_DISCOUNTS_URL}`);//${paramsForRequest}
  }
}
