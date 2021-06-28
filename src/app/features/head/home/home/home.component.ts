import { Component, OnInit } from '@angular/core';
import { createSelector, State } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  IDiscount,
  IHeadState,
  IAppState,
  IUiConfigState,
  // IInputTile,
} from 'src/app/shared/variables';

import { Store } from '@ngrx/store';
import { setContent } from 'src/app/core/store/actions/ui-config.actions';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isMap: Observable<boolean>;
  discountsData: Observable<IDiscount[]>;
  //discounts: any;
  
  arrayMap: any;
  sortBy: string;

  selectHead = (state: IAppState) => state.head;
  selectDiscounts = createSelector(
    this.selectHead,
    (state: IHeadState) => state.discounts
  );

  constructor(
    private store: Store<{ head: IHeadState, uiConfig: IUiConfigState }>,
  ) {
    this.sortBy = 'default';

    const selecUiConfig = (state: IAppState) => state.uiConfig;
    const selectMap = createSelector(selecUiConfig, (state: IUiConfigState) => state.homeIsMap)
    this.isMap = this.store.select(selectMap);
    
    const selecHead = (state: IAppState) => state.head;
    const selectDiscounts = createSelector(selecHead, (state: IHeadState) => state.discounts)
    this.discountsData = this.store.select(selectDiscounts);

  }

  ngOnInit(): void { }

  setIsMap(val: any): void {
    // console.log(val);
    this.store.dispatch(
      setContent({ isMap: val === 'list' ? false : true })
    );
  }

  setIsMap1(event: MatTabChangeEvent){
    console.log(event.index);
    this.store.dispatch(
      setContent({ isMap: event.index === 1 ? false : true })
    );
  }

  someMethod(): void {
   }
}
