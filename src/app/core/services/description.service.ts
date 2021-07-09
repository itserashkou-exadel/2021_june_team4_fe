import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDescription } from "../../shared/interfaces";

@Injectable()
export class DescriptionService {
  id:any;
  constructor(private http: HttpClient) {}

  getDescriptionRequest(props: {id: string;}) {
    return this.http
      .get(`http://localhost:8080/discounts/${props.id}`)
  }

  handleRemoteDescription(remouteData:any) {
    console.log(remouteData.vendorLocations)
    const localDescription: IDescription = {
      id: remouteData.id,
      name: remouteData.name,
      vendor: remouteData.vendor,
      startTime: remouteData.startTime,
      endTime: remouteData.endTime,
      vendorLocations: remouteData.vendorLocations === null ? [{city:{countryName: '', name: ''},latitude:0, longitude:0}] : remouteData.vendorLocations ,
      tags: [...remouteData.tags.map((el: any)=>{
        return el.name;
      })],
      category: remouteData.category.name,
      active: remouteData.active,
      archived: remouteData.archived,
      description: remouteData.description === null ? 'Default description': remouteData.description,
      percent: remouteData.percent,
      img: remouteData.img ? remouteData.img : ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVe9r47bhQVcZJ4jEd4wQuYH0LsAz5qKOTBATYRG8c7C3waYKbB2Z1My-HtoY2nzv4XmY&usqp=CAU'],
      promo: remouteData.promo
    }

    return localDescription;
  }

}
