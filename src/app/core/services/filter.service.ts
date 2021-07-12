import { E } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/shared/constants';
import { IFilterControls, ILocationCountry } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(private http: HttpClient) {}

  requestFilteredData = (param: any) => {
  //   let ids: [] = [];
  //  const theCity = param.city;
  //  // const getIds =  () => {      this.requestRawData();    };
     const id  = this.http.get(`${API_URL}/countries`)
  //  // console.log(id)
  //   id.subscribe(d => {
  //     console.log(d)
  //     let src = d as Array<any>;
  //    let r = src.find(e=> e.cities.find((c:  any)=> c.name === theCity))
  //    console.log(r);
  //    let cid = r.cities.find((ct: any) => ct.name === theCity)
  //    console.log(cid.id)
  //     })

  //  // identificators.subscribe((data) => (ids = data));

  //   const citiId = console.log(ids);

  //   const response = this.http.get(`${API_URL}/discounts?${param}`);
     return id;
  };

  makeParams() {}

  handleCountries = (rawData: any): ILocationCountry => {
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
