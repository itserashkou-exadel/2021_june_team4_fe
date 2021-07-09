import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IDiscount, IAppState, IMapMarker } from 'src/app/shared/interfaces';

import { Store } from '@ngrx/store';
import { setContent } from 'src/app/core/store/actions/ui-config.actions';
import { HttpClient } from '@angular/common/http';
import { getNewDiscounts } from 'src/app/core/store/actions/home.actions';
import { HomeService } from 'src/app/core/services/home.service';
import { selectDiscounts, selectMarkers, selectMap } from '../home.selectors';

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

  constructor(
    private store: Store<IAppState>,
    private http: HttpClient,
    private filterService: HomeService
  ) {
    this.isMap = this.store.select(selectMap);

    this.discountsData = this.store.select(selectDiscounts);

    this.markers$ = this.store.select(selectMarkers);
  }

  ngOnInit(): void {
    this.store.dispatch(getNewDiscounts({ sortParam: '' }));
  }

  setIsMap(val: any): void {
    this.store.dispatch(setContent({ isMap: val !== 'list' }));
  }

  sortDiscountsData(value: string): void {
    this.store.dispatch(getNewDiscounts({ sortParam: value }));
  }

  test() {
    console.log('map event');
  }
}
