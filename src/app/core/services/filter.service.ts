import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared/constants';
import { IFilterControls, ILocationsGroup } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(private http: HttpClient) {}

  requestFilteredData = (param: any) =>{
    const response = this.http.get(`${API_URL}/discounts?${param}`);
    return response;
  }

  test = () => {
    const param = 'categoryId=c7737489-01a2-46c3-928c-c4ddc73de7ef';   //Beauty
    const param2 = 'tagId=46868e13-ea9d-42d1-8811-29413b1d1763';    // 
                            //"db19d31a-67d9-4ab7-9fd5-79ae594ff4e3"
    const response = this.http.get(`${API_URL}/discounts?${param}&${param2}`);
    return response;
  };

  handleCountries = (rawData: any): ILocationsGroup => {
    const newLocations = rawData.map((location: any) => ({
      countryName: location.name,
      cities: location.cities.map((el: any) => el.name),
    }));
    return newLocations;
  };

  handleCategories = (rawData: any): string[] => {
    return rawData.map((el: any) => el.name);
  };
  handleTags = (rawData: any): string[] => {
    return rawData.map((el: any) => el.name);
  };
  handleVendors = (rawData: any): string[] => {
    return rawData.map((el: any) => el.name);
  };

  requestRawData = (): Observable<any> => {
    const response = forkJoin([
      this.http.get(API_URL + '/countries'),
      this.http.get(API_URL + '/categories'),
      this.http.get(API_URL + '/tags'),
      this.http.get(API_URL + '/vendors'),
    ]);
    return response;
  };
}
