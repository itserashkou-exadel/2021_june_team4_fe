import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { createSelector } from '@ngrx/store';
import { IHeadState } from '../head.variables';
import { IAppState } from '../head.variables';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
})

export class HeadComponent implements OnInit {

  location$: Observable<string>;

  selectHead = (state: IAppState) => state.head;

  selectLocation = createSelector(
    this.selectHead,
    (state: IHeadState) => state.currentLocation
  );

  constructor(private store: Store<IAppState>) {
    this.location$ = this.store.select(this.selectLocation);
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
    { link: 'statistic', label: 'Statistic' }
  ];

  pmClick(ev: Event) {
    console.log((ev.target as HTMLButtonElement).innerText);
  }
}
