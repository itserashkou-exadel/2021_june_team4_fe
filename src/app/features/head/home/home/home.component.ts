import { Component, OnInit } from '@angular/core';
import { createSelector, select, State } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';

import {
  IDiscount,
  IHomeState,
  IAppState,
  IUiConfigState,
  IMapMarker,

} from 'src/app/shared/interfaces';

import { Store } from '@ngrx/store';
import { setContent } from 'src/app/core/store/actions/ui-config.actions';
import { HttpClient } from '@angular/common/http';
import {
  getNewDiscounts,
  sortDiscounts,
} from 'src/app/core/store/actions/home.actions';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isMap: Observable<boolean>;
  discountsData: Observable<IDiscount[]>;
  markers$: Observable<IMapMarker[]>;
  markers: any;

  selectHead = (state: IAppState) => state.home;
  selectDiscounts = createSelector(
    this.selectHead,
    (state: IHomeState) => state.discounts
  );

  constructor(private store: Store<IAppState>, private http: HttpClient) {
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

    const selectMarkers = createSelector(this.selectHead, (state) =>
      state.discounts.map((el) => ({
        cords: el.coordinates,
        text: el.description,
      }))
    );

      this.markers$ = this.store.select(selectMarkers);
  }

  ngOnInit(): void {
    this.store.dispatch(getNewDiscounts());
  }

  setIsMap(val: any): void {
    this.store.dispatch(setContent({ isMap: val !== 'list' }));
  }

  sortDiscountsData(value: any): void {
    this.store.dispatch(sortDiscounts({ sortType: value }));
  }

  test(){
    console.log('map event');
  }

}
