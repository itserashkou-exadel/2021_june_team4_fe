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
