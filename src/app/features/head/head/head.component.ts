import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { createSelector } from '@ngrx/store';
import { IDiscount, IHeadState, IAppState } from '../../../shared/variables';
// import { IAppState } from '../head.variables';
import { state } from '@angular/animations';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
})
export class HeadComponent implements OnInit {
  discounts$: Observable<IDiscount[]>;
  res: any;

  selectHead = (state: IAppState) => state.head;

  selectDiscounts = createSelector(
    this.selectHead,
    (state: IHeadState) => state.discounts
  );

  constructor(private store: Store<IAppState>) {
    this.discounts$ = this.store.select(this.selectDiscounts);
    this.discounts$.forEach((el) => {
      // this.res = el;
      // console.log(el);
    });
  }

  ngOnInit(): void {
    console.log('init');
  }

  discountSearch = new FormControl('');
  profileMenu = new FormControl('');
  profileMenuItems = [
    'Select cathegory',
    'History',
    'Favorit',
    'Active discounts',
    'Logout',
    'Close',
  ];

  tabItems = [
    { link: 'home', label: 'Home' },
    { link: 'profile', label: 'Profile' },
    { link: 'vendor', label: 'Vendor' },
    { link: 'statistic', label: 'Statistic' },
    { link: 'description', label: 'Description' },
  ];

  pmClick(ev: Event) {
    console.log((ev.target as HTMLButtonElement).innerText);
  }
}
