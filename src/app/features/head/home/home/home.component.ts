import { Component, OnInit } from '@angular/core';
import { createSelector, State } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  IDiscount,
  IHomeState,
  IAppState,
  IUiConfigState,
} from 'src/app/shared/interfaces';

import { Store } from '@ngrx/store';
import { setContent } from 'src/app/core/store/actions/ui-config.actions';
import { HttpClient } from '@angular/common/http';
import { getNewDiscounts, sortDiscounts } from 'src/app/core/store/actions/home.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isMap: Observable<boolean>;
  discountsData: Observable<IDiscount[]>;
  remoteData: any; // <<<<<<<<<<<<<<<<<<<   ТУТ

  arrayMap: any;
 // sortBy: string;
 marker: any

  selectHead = (state: IAppState) => state.home;
  selectDiscounts = createSelector(
    this.selectHead,
    (state: IHomeState) => state.discounts
  );

  constructor(
    private store: Store<IAppState>,
    private http: HttpClient
  ) {

   this.marker = {
    markers:[
    { cords:[50.4501, 30.5234], text: 'This is Kyiv'},
    { cords:[49.2331, 28.4682], text: 'This is Vinnytsia'},
    { cords:[48.5079, 32.2623], text: 'This is Kropyntytskyi'},
    { cords:[46.4825, 30.7233], text: 'This is Odessa'},

    ],
    center: [50.4501, 30.5234],
    zoom: 4,
  }
   // this.sortBy = 'default';

    const selecUiConfig = (state: IAppState) => state.uiConfig;
    const selectMap = createSelector(
      selecUiConfig,
      (state: IUiConfigState) => state.homeIsMap
    );
    this.isMap = this.store.select(selectMap);

    const selecHead = (state: IAppState) => state.home;
    const selectDiscounts = createSelector(
      selecHead,
      (state: IHomeState) => state.discounts
    );

    this.discountsData = this.store.select(selectDiscounts);
  }

  ngOnInit(): void {
    this.store.dispatch(getNewDiscounts());
  }

  setIsMap(val: any): void {
    this.remoteData;
    this.store.dispatch(setContent({ isMap: val !== 'list' }));
    
  }

  sortDiscountsData(value: any): void {
    this.store.dispatch(sortDiscounts({ sortType: value}));
  }
}
