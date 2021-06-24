import { Component, OnInit, Input } from '@angular/core';
import { IInputTile } from '../variables';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent implements OnInit {
  @Input() discount: IInputTile = {
    tileTitle: 'Title long name of discount',
    tileImg: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    tileDescription: 'Text description discount programm',
    vendorName: 'Vendor name',
    cathegory: 'Cathegory',
    timeEnd: '10/11/2021',
    discountLocation: 'Kyiv',
    discountValue: 15,
  };

  constructor() {}

  ngOnInit(): void {}
}
