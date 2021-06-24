import { Component, OnInit } from '@angular/core';
import { createSelector, State } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  IDiscount,
  IHeadState,
  IAppState,
  IInputTile,
} from 'src/app/shared/variables';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // discounts: Observable<IDiscount[]>;

  discounts: any;
  isMap: boolean;
  discountsData: IInputTile[];
  arrayMap: any;
  sortBy: string;

  selectHead = (state: IAppState) => state.head;
  selectDiscounts = createSelector(
    this.selectHead,
    (state: IHeadState) => state.discounts
  );

  constructor(private store: Store<{ head: IHeadState }>) {
    this.sortBy = 'default';

    this.arrayMap = new Array(14);

    this.discounts = this.store.select(this.selectDiscounts);

    this.isMap = false;

    this.discountsData = [
      {
        tileTitle: 'Title 1',
        tileImg: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        tileDescription: 'Text description discount programm',
        vendorName: 'Vendor name',
        cathegory: 'Cathegory',
        timeEnd: '10/11/2021',
        discountLocation: 'Kyiv',
        discountValue: 15,
      },
      {
        tileTitle: 'Title long name of discount',
        tileImg: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        tileDescription: 'Text description discount programm',
        vendorName: 'ATB',
        cathegory: 'Food',
        timeEnd: '10/11/2021',
        discountLocation: 'Vinnytsia',
        discountValue: 15,
      },
      {
        tileTitle: 'Title_long_name_discount ',
        tileImg: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
        tileDescription: 'Text description discount programm',
        vendorName: 'ATB',
        cathegory: 'Food',
        timeEnd: '10/11/2021',
        discountLocation: 'Odessa',
        discountValue: 10,
      },
    ];
  }

  ngOnInit(): void {
    this.store.subscribe((value) => (this.discounts = value.head.discounts));
    console.log(this.discounts);
  }

  setIsMap(): void {
    this.isMap = !this.isMap;
  }
  
  someMethod(ev:any):void {
    console.log(ev + ' -> ');
  }
}
