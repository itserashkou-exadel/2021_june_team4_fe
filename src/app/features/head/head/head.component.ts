import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {createSelector, Store, select} from '@ngrx/store';

import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import {IAppState, IUiConfigState} from '../../../shared/interfaces';

import { DialogComponent } from '../../../shared/dialog/dialog/dialog.component';
import { LocationTreeComponent } from './location-tree/location-tree.component';
import { MatDialog } from '@angular/material/dialog';
import {Observable} from "rxjs";
import {setLanguage} from "../../../core/store/actions/ui-config.actions";


@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
})
export class HeadComponent implements OnInit {
  activeLink: string;

  languages = ['en', 'ru'];
  language$: Observable<any>;

  constructor(private store: Store<IAppState>,
              public dialog: MatDialog,
              private translateService: TranslateService) {
    this.activeLink = 'home';

    const selecUiConfig = (state: IAppState) => state.uiConfig;
    const selectSettingsLanguage = createSelector(
      selecUiConfig,
      (state: IUiConfigState) => state.appLanguage
    );

    this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.language$.subscribe((lang)=>{
      this.translateService.use(lang);
    });
  }

  openDialog() {
    // let dialogConfig = {
    //   data: {
    //     title: 'Title for tree location',
    //     component: LocationTreeComponent
    //   },
    //   width: '500px',
    //   height: '300px',
    // };
    // this.dialog.open(DialogComponent, dialogConfig);
  }

  ngOnInit(): void {}

  changeLocale(lang: string) {
    this.store.dispatch(setLanguage({language:lang }));
    this.translateService.use(lang);
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
  ];


  pmClick(ev: Event) {
    console.log((ev.target as HTMLButtonElement).innerText);
  }

  setActiveLink(val: string) {
    this.activeLink = val;
  }
}
