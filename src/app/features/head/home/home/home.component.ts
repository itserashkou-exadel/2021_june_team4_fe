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

  sortControl: FormControl;
  observableRequestConfig: Observable<any>;
  subscribedRequestConfig: Subscription;
  sortValuesSet: any;

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

    this.subscribedRequestConfig = this.observableRequestConfig.subscribe(
      (data) => {
        const sortParam = data.sortValue;
        const filterParam = data.fiterRequestParams;
        let fullParamRequest = '';
        fullParamRequest += sortParam || filterParam ? '?' : '';
        fullParamRequest += filterParam;
        fullParamRequest +=
          filterParam && sortParam
            ? `&sortBy=${sortParam}`
            : sortParam
            ? `sortBy=${sortParam}`
            : '';
        this.store.dispatch(getNewDiscounts({ sortParam: fullParamRequest }));
       
        return (this.filterRequestParam = data);
      }
    );
    // END OF CONSTRUCTOR
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/promo').subscribe(data => {
      let res = Object.entries(data);
    
      console.log(res)
      console.log(res[1][1])
  })
    let c = this.http.get('http://localhost:3000/favorits');
    c.subscribe(data =>  {
      let res = Object.entries(data);
      console.log(res[1][1]);
    
    })
    this.store.dispatch(getNewDiscounts({ sortParam: '' }));
  }
  ngOnDestroy(): void {
    this.subscribedRequestConfig.unsubscribe();
  }
  setIsMap(val: any): void {
    this.store.dispatch(setContent({ isMap: val !== 'list' }));
  }

  sortDiscountsData(value: string): void {
    this.store.dispatch(setSortValue({ param: value }));
  }
}
