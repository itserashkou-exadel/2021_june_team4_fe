import {ChangeDetectorRef, Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { Store } from '@ngrx/store';
import {
  addSubscribe,
  removeSubscribe,
} from '../../../../core/store/actions/profile.actions';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { HttpClient } from '@angular/common/http';
import { ICategory } from 'src/app/shared/interfaces';
import { IUser } from 'src/app/shared/interfaces';
import { IDiscount } from 'src/app/shared/interfaces';
import { ProfileService } from 'src/app/core/services/profile.service';
import { DescriptionService } from 'src/app/core/services/description.service';
import { IDescription } from '../../../../shared/interfaces';
import { IFavoritesProfile } from '../../../../shared/interfaces';
import { ActivatedRoute, Params, Router, Route } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { MatTabGroup } from "@angular/material/tabs";

export interface IProfileSubscription {
  categoryAddRemove: string;
  bgColor: string;
  added: boolean;
}

// export interface IDescriptionActiveDiscount {
//   discount: {
//     description: string;
//     name: string;
//     promo: string;
//     startTime: string;
//     endTime: string;
//   }
// }


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  // @ViewChild('tabs', { static: false }) tabGroup!: MatTabGroup;
  // coupons: any = { promo: '213123123', name: 'Vendor Name' };
  displayCategory: string[] = ['Category', 'Add/Remove'];
  categoryAddRemove: string[] = ['COMMON.Global.add', 'COMMON.Global.remove'];
  displayHistory: string[] = ['Name', 'Promo', 'EndDate'];
  user$: Observable<IUser>;

  categories$: Observable<ICategory[]>;
  // subscribe$: Observable<any>;
  DescriptionAll$: Observable<IDescription[]>;
  profileHistory$: Observable<IFavoritesProfile[]>;
  profileCoupons$: Observable<IFavoritesProfile[]>;

  // profileTabIndex: number = 0;
  profileTabIndex: number = 0;
  tabs:[{ tabName: string; index: number }, { tabName: string; index: number }, { tabName: string; index: number }] = [
    { tabName: 'history', index: 0},
    { tabName: 'favorite', index: 1},
    { tabName: 'active', index: 3}
  ]


  constructor(
    private store: Store<{ profile: boolean }>,
    private http: HttpClient,
    private categories: CategoriesService,
    private profile: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private change: ChangeDetectorRef
  ) {
    // this.subscribe$ = store.select('profile');
    this.categories$ = this.categories.getCategories();
    this.user$ = this.profile.getUser();
    this.profileHistory$ = this.profile.getFavorite();
    // this.favorites$.subscribe(data => console.log(data));
    this.DescriptionAll$ = this.profile.getDescriptionAll();
    this.profileCoupons$ = this.profile.getCoupons();
  }
  public demo1BtnClick() {
    const tabCount = 3;
    // this.profileTabIndex = (this.profileTabIndex + 1) % tabCount;
    this.profileTabIndex = 2;
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id'))
    )
      .subscribe(data => {
        let objTab:any = this.tabs.find(el => el.tabName === data);
        // this.profileTabIndex = objTab.index;
        // this.profileTabIndex = 2;

        this.change.markForCheck();

      });
    console.log('this.route.url',this.router.url)
  }

  items(id: any) {
    console.log('Category Id' + id);
  }

  // profileTabClick() {
  //   const tabCount = 4;
  //   this.profileTabIndex = (this.profileTabIndex + 1) % tabCount;
  // }

  // subscr() {
  //   this.store.dispatch(addSubscribe());
  // }
  // unSubscr() {
  //   this.store.dispatch(removeSubscribe());
  //   console.log('removed');
  // }
}
