import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { IDiscount, IAppState, IMapMarker } from 'src/app/shared/interfaces';

import { Store } from '@ngrx/store';
import { setContent } from 'src/app/core/store/actions/ui-config.actions';
import { HttpClient } from '@angular/common/http';
import {
  getNewDiscounts,
  setSortValue,
} from 'src/app/core/store/actions/home.actions';
import { HomeService } from 'src/app/core/services/home.service';
import {
  selectDiscounts,
  selectMarkers,
  selectMap,
  selectSortValue,
} from '../home.selectors';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isMap: Observable<boolean>;
  discountsData: Observable<IDiscount[]>;
  markers$: Observable<IMapMarker[]>;
  markers: any;

  sortControl: FormControl;
  observableSortValue: Observable<string>;
  subscribedSortValue: Subscription;
  sortValuesSet: any;

  currentSortValue: any;

  constructor(
    private store: Store<IAppState>,
    private http: HttpClient,
    private filterService: HomeService
  ) {
    this.sortValuesSet = [
      { value: 'default', uiValue: 'None' },
      { value: 'startTime', uiValue: 'Start time' },
      { value: 'endTime', uiValue: 'Time to expire' },
      { value: 'name', uiValue: 'Name' },
    ];

    this.isMap = this.store.select(selectMap);

    this.discountsData = this.store.select(selectDiscounts);

    this.markers$ = this.store.select(selectMarkers);

    this.sortControl = new FormControl();

    this.observableSortValue = this.store.select(selectSortValue);

    this.subscribedSortValue = this.observableSortValue.subscribe((data) => {
      this.sortControl.setValue(data);
      this.currentSortValue = data;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(getNewDiscounts({ sortParam: '' }));
  }
  ngOnDestroy(): void {
    this.subscribedSortValue.unsubscribe();
  }
  setIsMap(val: any): void {
    this.store.dispatch(setContent({ isMap: val !== 'list' }));
  }

  sortDiscountsData(value: string): void {
    let newValue = value.toLowerCase() === 'default' ? '': value;
      this.store.dispatch(setSortValue({ value : newValue}));
      this.store.dispatch(getNewDiscounts({ sortParam: newValue }));
  }

  test() {
    console.log('map event');
  }
}
