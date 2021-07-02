import { Component, OnInit, Input } from '@angular/core';
import { IDiscount } from '../variables';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
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
      category: 'category',
      isActive: true,
      description: 'string',
      percent: 10,
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      coordinates:[45.094, 34.981]

  };

  constructor(private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient) {

  }

  setDotts(value:string, limit: number): string{
   return value.length < limit ? '': '...'
  }

  ngOnInit(): void {}

  redirectToDescription(descriptionId: any) :void {
    this.router.navigate([`home/${descriptionId}/description`]);
  }
}
