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
    const response = this.http.get(`${API_URL}/discounts${param}`);
    return response;
  }

  handleRemoteDiscount(remoteDiscount: any) {
    //console.log(remoteDiscount);
    if(remoteDiscount.discount) {
      remoteDiscount = remoteDiscount.discount
    }

    let tags = '';
    remoteDiscount.tags.forEach((el: any) => {
      tags += el.name + ' ';
    });
    const localDiscount: IDiscount = {
      id: remoteDiscount.id,
      name: remoteDiscount.name,
      added: remoteDiscount.startTime,
      vendor: remoteDiscount.vendor.name,
      expired: remoteDiscount.endTime,
      location: 'remoteDiscount',
      tag: tags,
      favorite: remoteDiscount.favorite,
      category: remoteDiscount.category.name,
      isActive: remoteDiscount.active,
      description: remoteDiscount.description ,
      percent: (remoteDiscount.value +=
        remoteDiscount.discountType === 'PRICE' ? '%' : ''),
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVe9r47bhQVcZJ4jEd4wQuYH0LsAz5qKOTBATYRG8c7C3waYKbB2Z1My-HtoY2nzv4XmY&usqp=CAU',
      coordinates: remoteDiscount.vendorLocations ? getCoordinates(remoteDiscount) : [[50.094, 26.981]],
    };
    //console.log(localDiscount);
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
