import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { IDiscount, IAppState, IMapMarker } from 'src/app/shared/interfaces';

import { Store } from '@ngrx/store';
import {
  setContent,
  setSortValue,
} from 'src/app/core/store/actions/ui-config.actions';
import { HttpClient } from '@angular/common/http';
import { getNewDiscounts } from 'src/app/core/store/actions/home.actions';
import { HomeService } from 'src/app/core/services/home.service';
import {
  selectDiscounts,
  selectMarkers,
  selectMap,
  selectRequestConfig,
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
  //markers: any;

  sortControl: FormControl;
  observableRequestConfig: Observable<any>;
  subscribedRequestConfig: Subscription;
  sortValuesSet: any;

  // observableFilterParam: Observable<any>;
  // subscribedFilterParam: Subscription;

  filterRequestParam: string | undefined;

  currentSortValue: any;

  constructor(
    private store: Store<IAppState>,
    private http: HttpClient,
    private filterService: HomeService
  ) {
    this.sortValuesSet = [
      { value: 'id', uiValue: 'Default' },
      { value: 'startTime', uiValue: 'Start time' },
      { value: 'endTime', uiValue: 'Time to expire' },
      { value: 'name', uiValue: 'Name' },
    ];

    this.isMap = this.store.select(selectMap);

    this.discountsData = this.store.select(selectDiscounts);

    this.markers$ = this.store.select(selectMarkers);

    this.sortControl = new FormControl();

    this.observableRequestConfig = this.store.select(selectRequestConfig);

    // this.subscribedRequestConfig = this.observableRequestConfig.subscribe((data) => {
    //   this.sortControl.setValue(data);
    //   this.currentSortValue = data;
    // });

    //  this.observableFilterParam = this.store.select(selectFilterParamString);
    this.subscribedRequestConfig = this.observableRequestConfig.subscribe(
      (data) => {
        console.log(data);
        const sortParam = data.sortValue;
        const filterParam = data.filterRequestParams;
        let fullParamRequest = '';
        fullParamRequest += sortParam || filterParam ? '?' : '';
        fullParamRequest += filterParam;
        fullParamRequest +=
          filterParam && sortParam
            ? `&sortBy=${sortParam}`
            : sortParam
            ? `sortBy=${sortParam}`
            : '';

        //sortParam
       // const data2 = this.sortControl.value;
         console.log(fullParamRequest);
        // console.log(data2);
        //   const sortRequestParam  = data2? `sortBy=${data2}`: '';
        //  //
        //   fullParamRequest += data || data2 ? '?': '';
        //   fullParamRequest += data;
        //   fullParamRequest += data  ? `&${sortRequestParam}`: `${sortRequestParam}`;
        // console.log(fullParamRequest);
        // console.log('daaasdfsdf')
        this.store.dispatch(getNewDiscounts({ sortParam: fullParamRequest }));
        //console.log( this.sortControl.value)
        //console.log(data);
       // this.markers$ = this.store.select(selectMarkers);
        return (this.filterRequestParam = data);
      }
    );
    // END OF CONSTRUCTOR
  }

  ngOnInit(): void {
    this.store.dispatch(getNewDiscounts({ sortParam: '' }));
    // this.store
  }
  ngOnDestroy(): void {
    this.subscribedRequestConfig.unsubscribe();
    //  this.subscribedFilterParam.unsubscribe();
  }
  setIsMap(val: any): void {
    this.store.dispatch(setContent({ isMap: val !== 'list' }));
  }

  sortDiscountsData(value: string): void {
    // const data = this.filterRequestParam;
    // const data2 = this.sortControl.value;
    // let  fullParamRequest = '';
    // fullParamRequest += data || data2 ? '?': '';
    // fullParamRequest += data;
    // fullParamRequest += data && data2 ? `&sortBy=${data2}`: ``;
    // const newValue = value.toLowerCase() === 'default' ? '' : value;
    // this.store.dispatch(setSortValue({ value: newValue }));

    // this.store.dispatch(getNewDiscounts({ sortParam: fullParamRequest}));
    this.store.dispatch(setSortValue({ param: value }));
  }

  // test() {
  //   console.log('map event');
  // }
}
