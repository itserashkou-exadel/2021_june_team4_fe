import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { Store } from '@ngrx/store';

import { CategoriesService } from 'src/app/core/services/categories.service';
import { HttpClient } from '@angular/common/http';
import { ICategory } from 'src/app/shared/interfaces';
import { IUser } from 'src/app/shared/interfaces';
import { ProfileService } from 'src/app/core/services/profile.service';
import { IDescription } from '../../../../shared/interfaces';
import { ActivatedRoute, Router } from "@angular/router";

export interface IProfileSubscription {
  categoryAddRemove: string;
  bgColor: string;
  added: boolean;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  // coupons: any = { promo: '213123123', name: 'Vendor Name' };
  displayCategory: string[] = ['Category', 'Add/Remove'];
  categoryAddRemove: string[] = ['COMMON.Global.add', 'COMMON.Global.remove'];
  displayHistory: string[] = ['Name', 'Promo', 'EndDate'];
  user$: Observable<IUser>;

  categories$: Observable<ICategory[]>;
  // subscribe$: Observable<any>;
  DescriptionAll$: Observable<IDescription[]>;
  // profileHistory$: Observable<IFavoritesProfile[]>;

  tabs:[{ tabName: string; path: string ,isActive: boolean}, { tabName: string; path: string,isActive: boolean }, { tabName: string; path: string,isActive: boolean }] = [
    { tabName: 'history', path: 'history', isActive: true},
    { tabName: 'favorite', path: 'favorite', isActive: false},
    { tabName: 'active', path: 'active', isActive: false}
  ]


  constructor(
    private store: Store<{ profile: boolean }>,
    private http: HttpClient,
    private categories: CategoriesService,
    private profile: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private change: ChangeDetectorRef,

  ) {
    // this.subscribe$ = store.select('profile');
    this.categories$ = this.categories.getCategories();
    this.user$ = this.profile.getUser();
    // this.profileHistory$ = this.profile.getFavorite();
    // this.favorites$.subscribe(data => console.log(data));
    this.DescriptionAll$ = this.profile.getDescriptionAll();
  }

  ngOnInit() {}

  // items(id: any) {
  //   console.log('Category Id' + id);
  // }

  // subscr() {
  //   this.store.dispatch(addSubscribe());
  // }
  // unSubscr() {
  //   this.store.dispatch(removeSubscribe());
  //   console.log('removed');
  // }
}
