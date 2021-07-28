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
  categoryAddRemove: string[] = ['COMMON.Global.add', 'COMMON.Global.remove'];
  displayHistory: string[] = ['Name', 'Promo', 'EndDate'];
  user$: Observable<IUser>;

  categories$: Observable<ICategory[]>;
  DescriptionAll$: Observable<IDescription[]>;

  tabs:[{ tabName: string; path: string ,isActive: boolean}, { tabName: string; path: string,isActive: boolean }, { tabName: string; path: string,isActive: boolean }] = [
    { tabName: 'COMMON.Profile.title.history', path: 'history', isActive: true},
    { tabName: 'COMMON.Profile.title.favorite', path: 'favorite', isActive: false},
    { tabName: 'COMMON.Profile.title.active', path: 'active', isActive: false}
  ]


  constructor(
    private store: Store<{ profile: boolean }>,
    private http: HttpClient,
    private categories: CategoriesService,
    private profile: ProfileService,)
  {
    this.categories$ = this.categories.getCategories();
    this.user$ = this.profile.getUser();
    this.DescriptionAll$ = this.profile.getDescriptionAll();
  }

  ngOnInit() {}
}
