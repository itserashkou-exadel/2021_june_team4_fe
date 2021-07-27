import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { STATISTIC_VENDORS_URL} from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  constructor(private http: HttpClient) {}

  getStatisticVendors(params: any){
    let paramsForRequest = `?sortBy:${params.sortActive}&sortDirection:${params.sortDirection}&page:${params.paginatorPageIndex}`

    return this.http.get<any>(`${STATISTIC_VENDORS_URL}${paramsForRequest}`);
  }
}
