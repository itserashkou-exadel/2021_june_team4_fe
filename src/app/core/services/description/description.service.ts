import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IDescription, IDiscount} from "../../../shared/variables";

@Injectable()
export class DescriptionService {
  constructor(private http: HttpClient) {}

  getDescriptionRequest(){
    return this.http
      .get(`http://localhost:8080/discounts/5f69268b-705e-4fb9-8147-722b4ec1d9da`)
  }

  handleRemoteDescription(remouteData:any) {
    const localDescription: IDescription = {
      id: remouteData.id,
      name: remouteData.name,
      vendor: remouteData.vendor.name === null? 'Unknown': remouteData.vendor.name ,
      startTime: remouteData.startTime,
      endTime: remouteData.endTime,
      vendorLocations: [...remouteData.vendorLocations.map((el: any)=>{
        return el.city.name + el.country.name;
      })],
      tags: [...remouteData.tags.map((el: any)=>{
        return el.name;
      })],
      category: remouteData.category.name,
      active: remouteData.active,
      description:remouteData.description === null ? 'Default description': remouteData.description,
      percent: remouteData.percent,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVe9r47bhQVcZJ4jEd4wQuYH0LsAz5qKOTBATYRG8c7C3waYKbB2Z1My-HtoY2nzv4XmY&usqp=CAU',
      promo: remouteData.promo
    }

    return localDescription;
  }

}
