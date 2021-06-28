import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { createSelector ,createFeatureSelector} from '@ngrx/store';
import { IDiscount, IHeadState, IAppState } from '../../../shared/variables';
// import { IAppState } from '../head.variables';
import { state } from '@angular/animations';
import { select } from '@ngrx/store';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
})
export class HeadComponent implements OnInit {


 // discounts$: Observable<IDiscount[]>;
 activeLink : string;

  constructor(private store: Store<IAppState>){
    this.activeLink = 'home'
   // this.discounts$ = this.store.pipe(select( state => state.head.discounts));
  }

  ngOnInit(): void {
   
   // console.log(this.discounts$);
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

  setActiveLink(val: string){
    this.activeLink = val;
  }
}
