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
import { IDescription } from "../../../../shared/interfaces";

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
  coupons: any = { promo: '213123123', name: 'Vendor Name' };
  displayedColumns: string[] = ['item', 'add'];
  categoryAddRemove: string[] = ['add', 'remove'];
  user$: Observable<IUser>;
  categories$: Observable<ICategory[]>;
  subscribe$: Observable<any>;
  favorites$: Observable<any>;
  DescriptionAll$: Observable<IDescription[]>;

  constructor(
    private store: Store<{ profile: boolean }>,
    private http: HttpClient,
    private categories: CategoriesService,
    private profile: ProfileService,
  ) {
    this.subscribe$ = store.select('profile');
    this.categories$ = this.categories.getCategories();
    this.user$ = this.profile.getUser();
    this.favorites$ = this.profile.getFavorite('?userId=91cf19dd-2af7-49ee-825e-94c0831ba1f2');
    this.favorites$.subscribe(data => console.log(data));
    this.DescriptionAll$ = this.profile.getDescriptionAll();
  }

  ngOnInit() {}

  items(d: any) {
    console.log(d);
  }

  subscr() {
    this.store.dispatch(addSubscribe());
  }
  // unSubscr() {
  //   this.store.dispatch(removeSubscribe());
  //   console.log('removed');
  // }
}
