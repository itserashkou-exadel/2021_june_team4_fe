import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { createSelector, Store, select } from '@ngrx/store';

import { TranslateService } from '@ngx-translate/core';
import {IAppState, IDescription, IUiConfigState} from '../../../shared/interfaces';

import { MatDialog } from '@angular/material/dialog';
import {Observable, Subscription} from "rxjs";
import { setLanguage } from "../../../core/store/actions/ui-config.actions";

// Import the application components and services.
import { FuzzySegment, FuzzyMatcher } from "../../../core/services/fuzzy-matcher.service";
import { Species, primates } from "../../../shared/primates";
import {SEARCH_URL} from "../../../shared/constants";
import {HttpClient} from "@angular/common/http";
import {getNewDiscounts, requestDiscounts} from "../../../core/store/actions/home.actions";
import {HomeService} from "../../../core/services/home.service";

interface FilterMatch {
  score: number;
  value: Species;
  segments: FuzzySegment[];
}

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
  dataBySearch!:Subscription;

  public form: {
    filter: string;
  };
  public matches: FilterMatch[];

  private fuzzyMatcher: FuzzyMatcher;

  constructor(private store: Store<IAppState>,
              public dialog: MatDialog,
              private http: HttpClient,
              public homeServise: HomeService,
              fuzzyMatcher: FuzzyMatcher,
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

    this.fuzzyMatcher = fuzzyMatcher;

    this.form = {
      filter: ""
    };
    this.matches = [];
  }

  ngOnDestroy(): void {
    this.dataBySearch.unsubscribe();
  }

  ngOnInit(): void {
    let localLang = localStorage.getItem(this.SETTING_KEY);
    if(localLang) {
      this.store.dispatch(setLanguage({ language:localLang }));
    }
  }

  changeLocale(lang: string) {
    this.store.dispatch(setLanguage({ language:lang }));
    this.translateService.use(lang);
    localStorage.setItem(this.SETTING_KEY,lang);
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
    { link: 'home', label: 'COMMON.Head.home'},
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

  public applyFilter() : void {

    // If there is no filter, then hide the list entirely. We only want to show
    // matches when we have something to match on.
    if ( !this.form.filter || this.form.filter.length < 3) {
      if(this.form.filter.length > 0) {
        this.matches = [];
        this.store.dispatch(requestDiscounts({data: []}))
        return;
      } else {
        this.store.dispatch(getNewDiscounts({ sortParam: '' }));
      }

    } else if (this.form.filter.length >= 3) {
      const paramString = `searchText=${this.form.filter}`;//size=2&
      this.dataBySearch = this.http.get(`${SEARCH_URL}?${paramString}`).subscribe(
        (data: any)=>{
          if(data) {
            let searchData = data.map((discount:any)=>{
              return this.homeServise.handleRemoteDiscount(discount);
            })
            this.store.dispatch(requestDiscounts({data: searchData}))
          } else {
            this.store.dispatch(requestDiscounts({data: []}))
          }
        }
      )
    }

    // this.matches = primates
      // First, we want to take the updated form input and use it to SCORE the
      // collection of values. This phase will have to evaluate the entire set of
      // values; but, will only do the minimal amount of work needed to calculate a
      // scope. Then, we'll be able to use that score to narrow down and format the
      // set of values that we end-up showing to the user.
      // .map(
      //   ( primate ) => {
      //     return({
      //       value: primate,
      //       score: this.fuzzyMatcher.scoreValue( primate.name, this.form.filter )
      //     });
      //   }
      // )
      // Now that the entire set of values has been scored, let's sort them from
      // highest to lowest.
      // .sort(
      //   ( a, b ) => {
      //
      //     return(
      //       ( ( a.score > b.score ) && -1 ) || // Move item up.
      //       ( ( a.score < b.score ) && 1 ) || // Move item down.
      //       0
      //     );
      //
      //   }
      // )
      // For the sake of the demo, we only want to show the top-scoring matches.
      // Slice off the top of the scored values.
      // .slice( 0, 20 )
      // At this point, we've narrowed down the set of values to the ones we want
      // to show to the user. Now, we can go back and create a data-structure that
      // can be more easily rendered (but takes more processing).
      // .map(
      //   ( scoredValue ) => {
      //
      //     return({
      //       score: scoredValue.score,
      //       value: scoredValue.value,
      //       segments: this.fuzzyMatcher.parseValue( scoredValue.value.name, this.form.filter )
      //     });
      //
      //   }
      // );

  }
}
