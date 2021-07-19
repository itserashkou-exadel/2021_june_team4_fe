import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { of } from "rxjs";
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';

import { FormControl } from '@angular/forms';
import { createSelector, Store, select } from '@ngrx/store';

import { TranslateService } from '@ngx-translate/core';
import { IAppState, IUiConfigState } from '../../../shared/interfaces';

import { MatDialog } from '@angular/material/dialog';

import { Observable, Subscription } from "rxjs";
import { setLanguage } from "../../../core/store/actions/ui-config.actions";

import { SEARCH_URL } from "../../../shared/constants";
import { HttpClient } from "@angular/common/http";
import { getNewDiscounts, requestDiscounts } from "../../../core/store/actions/home.actions";
import { HomeService } from "../../../core/services/home.service";


import { clearNotifications } from 'src/app/core/store/actions/notifications.actions';
import { SpinnerService } from "../../../core/services/spinner.service";
import { Router, NavigationEnd } from "@angular/router";


@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
})
export class HeadComponent implements OnInit, OnDestroy {
  @ViewChild('discountSearchInput', { static: true }) discountSearchInput!: ElementRef;
  isSearching!: boolean;

  activeLink: string;
  SETTING_KEY = 'SETTINGS';
  languages = ['en', 'ru'];
  language$: Observable<any>;
  isLoaded: boolean = true; //spinner

  isHomeTile:boolean = false;

  public form: {
    filter: string;
  };

  iSnotifications$: number | undefined;
  unreadNotifications: any[] | undefined;
  aSub: Subscription;
  listIsVisibleOfUnreadNotes: boolean;
  currentRoute: string | undefined;

  constructor(private store: Store<IAppState>,
              private router: Router,
              public dialog: MatDialog,
              private http: HttpClient,
              public homeService: HomeService,
              private spinner: SpinnerService,
              private translateService: TranslateService) {

    this.router.events.subscribe(value => {
      let currentRoute = router.url.toString();
      if(currentRoute != '/home') {
        this.isHomeTile = false;
      } else {
        this.isHomeTile = true;
      }
    });

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

    this.form = {
      filter: ""
    };
  }

  onFocusEvent(e:any) {
    console.log(e)
  }


  ngOnDestroy(): void {
    if(this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  clearNotifications(){
    this.store.dispatch(clearNotifications())
  }

  openDialog() { }


  ngOnInit(): void {

    fromEvent(this.discountSearchInput.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 2
      , filter(res => res.length > 2)

      // Time in milliseconds between key events
      , debounceTime(1000)

      // If previous query is different from current
      , distinctUntilChanged()

      // subscription for response
    ).subscribe((text: string) => {

      this.isSearching = true;

      this.searchGetCall(text).subscribe((res: any) => {
        if(res) {
          let searchData = res.map((discount:any)=>{
            return this.homeService.handleRemoteDiscount(discount);
          })
          this.store.dispatch(requestDiscounts({data: searchData}))
        } else {
          this.store.dispatch(requestDiscounts({data: []}))
        }
        this.isSearching = false;
      }, (err) => {
        this.isSearching = false;
        console.log('error', err);
      });

    });

    this.spinner.returnAsObservable().subscribe(
      subs =>{
        this.isLoaded = subs;
      })


    let localLang = localStorage.getItem(this.SETTING_KEY);
    if (localLang) {
      this.store.dispatch(setLanguage({ language: localLang }));
    }
  }

  searchGetCall(term: string) {
    if (term === '') {
      debugger
      this.store.dispatch(getNewDiscounts({ sortParam: '' }));
      return of([]);
    }

    const paramString = `searchText=${term}`;//size=2&
    return this.http.get(`${SEARCH_URL}?${paramString}`);
  }

  changeLocale(lang: string) {
    this.store.dispatch(setLanguage({ language: lang }));
    this.translateService.use(lang);
    localStorage.setItem(this.SETTING_KEY, lang);
  }

  discountSearch = new FormControl('');
  profileMenu = new FormControl('');
  profileMenuItems = [
    'Select category',
    'History',
    'Favorite',
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
