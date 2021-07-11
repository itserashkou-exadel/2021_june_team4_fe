import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDiscount } from 'src/app/shared/interfaces';
import { API_URL } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  requestDiscountsData(param: string): Observable<any> {
    const response = this.http.get(
      `${API_URL}/discounts?sortBy=${param}`
    );
    return response;
  }

  handleRemoteDiscount(remoteDiscount: any) {
    //console.log(remoteDiscount);
    const localDiscount: IDiscount = {
      id: remoteDiscount.id,
      name: remoteDiscount.name,
      vendor: remoteDiscount.vendor.name,
      added: remoteDiscount.startTime,
      expired: remoteDiscount.endTime,
      location: 'remoteDiscount',
      tag: remoteDiscount.tags.name,
      category: remoteDiscount.category.name,
      isActive: remoteDiscount.active,
      description:
        remoteDiscount.description === null
          ? 'Default description'
          : remoteDiscount.description,
      percent: remoteDiscount.percent,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVe9r47bhQVcZJ4jEd4wQuYH0LsAz5qKOTBATYRG8c7C3waYKbB2Z1My-HtoY2nzv4XmY&usqp=CAU',
      coordinates: getCoordinates(remoteDiscount),
    };
    return localDiscount;
  }
}

const getCoordinates = (src: any) => {
  let cords = src.vendorLocations;
  let res: any[][] = [];
  cords.map((el: any) => {
    res.push([el.latitude, el.longitude]);
  });
  return res;
};
