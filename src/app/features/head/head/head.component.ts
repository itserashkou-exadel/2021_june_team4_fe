import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { createSelector, Store, select } from '@ngrx/store';

import { TranslateService } from '@ngx-translate/core';
import { IAppState, IUiConfigState } from '../../../shared/interfaces';

import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { setLanguage } from '../../../core/store/actions/ui-config.actions';
import { state } from '@angular/animations';
import { clearNotifications } from 'src/app/core/store/actions/notifications.actions';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
})
export class HeadComponent implements OnInit, OnDestroy {
  activeLink: string;
  SETTING_KEY = 'SETTINGS';
  languages = ['en', 'ru'];
  language$: Observable<any>;
  iSnotifications$: number | undefined;
  unreadNotifications: any[] | undefined;
  aSub: Subscription;
  listIsVisibleOfUnreadNotes: boolean;

  constructor(
    private store: Store<IAppState>,
    public dialog: MatDialog,
    private translateService: TranslateService
  ) {

    const selectNotifications = (state: IAppState) => state.notifications;
    const soreNotifications = this.store.select(selectNotifications);
    this.aSub = soreNotifications.subscribe((data) => {
      this.iSnotifications$ = data.notificationsUnread.length;
        this.unreadNotifications = data.notificationsUnread;
    });
    this.listIsVisibleOfUnreadNotes = false;
    this.activeLink = 'home';

    const selecUiConfig = (state: IAppState) => state.uiConfig;
    const selectSettingsLanguage = createSelector(
      selecUiConfig,
      (state: IUiConfigState) => state.appLanguage
    );

    this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.language$.subscribe((lang) => {
      this.translateService.use(lang);
    });
  }
  ngOnDestroy(): void {
    this.aSub.unsubscribe();
   // throw new Error('Method not implemented.');
  }

  clearNotifications(){
    this.store.dispatch(clearNotifications())
    console.log('asdf');
  }

  openDialog() { }

  
  ngOnInit(): void {
    let localLang = localStorage.getItem(this.SETTING_KEY);
    if (localLang) {
      this.store.dispatch(setLanguage({ language: localLang }));
    }
  }

  changeLocale(lang: string) {
    this.store.dispatch(setLanguage({ language: lang }));
    this.translateService.use(lang);
    localStorage.setItem(this.SETTING_KEY, lang);
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
    { link: 'home', label: 'COMMON.Head.home' },
    { link: 'profile', label: 'COMMON.Head.profile' },
    { link: 'vendor', label: 'COMMON.Head.vendor' },
    { link: 'statistic', label: 'COMMON.Head.statistic' },
  ];

  pmClick(ev: Event) {
    console.log((ev.target as HTMLButtonElement).innerText);
  }

  setActiveLink(val: string) {
    this.activeLink = val;
  }
  controlListNotes(){
this.listIsVisibleOfUnreadNotes = !this.listIsVisibleOfUnreadNotes;
  };
  
}
