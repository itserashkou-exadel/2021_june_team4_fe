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
import { DiscountService } from 'src/app/core/services/discount.service';

export interface PeriodicElement {
  name: string;
  position: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen'},
  {position: 2, name: 'Helium'},
  {position: 3, name: 'Lithium'},
  {position: 4, name: 'Beryllium'},
  {position: 5, name: 'Boron'},
  {position: 6, name: 'Carbon'},
  {position: 7, name: 'Nitrogen'},
  {position: 8, name: 'Oxygen'},
  {position: 9, name: 'Fluorine'},
  {position: 10, name: 'Neon'},
];

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user$: Observable<IUser>;
  categories$: Observable<ICategory[]>;
  subscribe$: Observable<any>;
  favorites$: Observable<any>;
  discount$: Observable<IDiscount[]>;
  // user: any;

  displayedColumns: string[] = ['position', 'name'];
  clickedRows = new Set<PeriodicElement>();
  dataSource = ELEMENT_DATA;
  
  constructor(
    private store: Store<{ profile: boolean }>,
    private http: HttpClient,
    private categories: CategoriesService,
    private profile: ProfileService,
    private discount: DiscountService,
    ) {
      this.subscribe$ = store.select('profile');
      this.categories$ = this.categories.getCategories();
      this.user$ = this.profile.getUser();
      this.favorites$ = this.profile.getFavorite();
      this.discount$ = this.discount.getDiscounts();
    }
    
    ngOnInit() {
    
    }

    subscr() {
      this.store.dispatch(addSubscribe());
      console.log('sub');
    }
    unSubscr() {
      this.store.dispatch(removeSubscribe());
      console.log('unsub');
  }
}
