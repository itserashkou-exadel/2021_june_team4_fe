import { Component, OnInit } from '@angular/core';
import { createSelector, State } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  IDiscount,
  IHeadState,
  IAppState,
  // IInputTile,
} from 'src/app/shared/variables';

import { Store } from '@ngrx/store';
import { setContent } from 'src/app/core/store/actions/config.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // discounts: Observable<IDiscount[]>;

  discounts: any;
  isMap: boolean;
  discountsData: IDiscount[];
  arrayMap: any;
  sortBy: string;

  selectHead = (state: IAppState) => state.head;
  selectDiscounts = createSelector(
    this.selectHead,
    (state: IHeadState) => state.discounts
  );

  constructor(
    private store: Store<{ head: IHeadState }>,
    private configStore: Store<{ config: any }>
  ) {
    this.sortBy = 'default';

    this.discounts = this.store.select(this.selectDiscounts);

    this.isMap = false;

    this.discountsData = [
      {
        id: 0,
        name: 'Huawei',
        vendor: 'Discount vendor0',
        added: '21-06-2021',
        expired: '21-11-2021',
        location: 'kharkiv',
        tag: 'tag',
        cathegory: 'cathegory',
        isActive: true,
        description: 'string',
        percent: 10,
        image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      },
    ];
  }

  ngOnInit(): void {
    this.store.subscribe((value) => (this.discounts = value.head.discounts));

    this.configStore.subscribe(
      (value) => (this.isMap = value.config.homeIsMap)
    );

    this.discountsData = this.discounts;
    console.log(this.discounts);
  }

  setIsMap(val: any): void {
    this.configStore.dispatch(
      setContent({ isMap: val === 'list' ? false : true })
    );
  }

  someMethod(): void {
    console.log( ' -> ');
  }
}
