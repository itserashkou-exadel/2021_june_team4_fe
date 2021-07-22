import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
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
  // coupons: any = { promo: '213123123', name: 'Vendor Name' };
  displayCategory: string[] = ['Category', 'Add/Remove'];
  categoryAddRemove: string[] = ['add', 'remove'];
  displayHistory: string[] = ['Name', 'Promo', 'EndDate'];
  
  user$: Observable<IUser>;
  categories$: Observable<ICategory[]>;
  // subscribe$: Observable<any>;
  DescriptionAll$: Observable<IDescription[]>;
  profileHistory$: Observable<IFavoritesProfile[]>;
  profileCoupons$: Observable<IFavoritesProfile[]>;

  constructor(
    private store: Store<{ profile: boolean }>,
    private http: HttpClient,
    private categories: CategoriesService,
    private profile: ProfileService
  ) {
    // this.subscribe$ = store.select('profile');
    this.categories$ = this.categories.getCategories();
    this.user$ = this.profile.getUser();
    this.profileHistory$ = this.profile.getFavorite();
    // this.favorites$.subscribe(data => console.log(data));
    this.DescriptionAll$ = this.profile.getDescriptionAll();
    this.profileCoupons$ = this.profile.getCoupons();
  }

  ngOnInit() {}

  items(id: any) {
    console.log('Category Id' + id);
  }

  // subscr() {
  //   this.store.dispatch(addSubscribe());
  // }
  // unSubscr() {
  //   this.store.dispatch(removeSubscribe());
  //   console.log('removed');
  // }
}
