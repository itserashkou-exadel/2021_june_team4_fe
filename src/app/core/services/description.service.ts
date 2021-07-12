import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { IDescription } from "../../shared/interfaces";

@Injectable()
export class DescriptionService {
  id: any;
  URL_API = 'http://localhost:8080';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {}

  getDescriptionRequest(props: {id: string}) {
    return this.http
      .get(`${this.URL_API}/discounts/${props.id}`)
  }

  toggleFavoriteRequest(props: {userId: string, discountId: string}) {
    return this.http
      .post(`${this.URL_API}/favorites`, props, this.httpOptions)
  }

  handleRemoteDescription(remoteData:any) {

    const localDescription: IDescription = {
      id: remoteData.id,
      name: remoteData.name,
      favorite: remoteData.favorite ? remoteData.favorite : true,
      vendor: remoteData.vendor,
      startTime: remoteData.startTime,
      endTime: remoteData.endTime,
      vendorLocations: remoteData.vendorLocations === null ? [{city:{countryName: '', name: ''},latitude:0, longitude:0}] : remoteData.vendorLocations ,
      tags: [...remoteData.tags.map((el: any)=>{
        return el.name;
      })],
      category: remoteData.category.name,
      active: remoteData.active,
      archived: remoteData.archived,
      description: remoteData.description === null ? 'Default description': remoteData.description,
      percent: remoteData.percent,
      img: remoteData.img ? remoteData.img : ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVe9r47bhQVcZJ4jEd4wQuYH0LsAz5qKOTBATYRG8c7C3waYKbB2Z1My-HtoY2nzv4XmY&usqp=CAU'],
      promo: remoteData.promo
    }
    return localDescription;
  }

}
