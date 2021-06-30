import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
//import { IInputTile } from '../variables';
import { SlicePipe } from '@angular/common';
import { IDiscount } from '../variables';
import { Router, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class TileComponent implements OnInit {
  remoteData: any;

  @Input() discount$: IDiscount = {
      id: 1,
      name: 'Discount',
      vendor: 'Discount vendor',
      added: '21-06-2021',
      expired: '21-11-2021',
      location: 'kharkiv',
      tag: 'tag',
      cathegory: 'cathegory',
      isActive: true,
      description: 'string',
      percent: 10,
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',

  };


  // description$: Observable;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient) {

  }

  setDotts(value:string, limit: number): string{
   return value.length < limit ? '': '...'
  }

  ngOnInit(): void {
    // const descriptionId = this.route.snapshot.paramMap.get('id');
    // this.description$ = this.service.getDescription(descriptionId);
  }

  redirectToDescription() :void {
    const descriptionId = '5f69268b-705e-4fb9-8147-722b4ec1d9da';
    this.router.navigate([`home/${descriptionId}/description`]);
  }


}
