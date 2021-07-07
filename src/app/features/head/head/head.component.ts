import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../shared/variables';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';

import { DialogComponent } from '../../../shared/dialog/dialog/dialog.component';
import { LocationTreeComponent } from './location-tree/location-tree.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
})
export class HeadComponent implements OnInit {
  activeLink: string;
  selectedLanguage!: string;
  languages: { id: string; title: string }[] = [];

  constructor(private store: Store<IAppState>,
              public dialog: MatDialog,
              private translateService: TranslateService) {
    this.activeLink = 'home';
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

  ngOnInit(): void {
       this.translateService.use(environment.defaultLocale);
       this.selectedLanguage = environment.defaultLocale.toUpperCase();

       this.translateService
         .get(environment.locales.map((x) => `LANGUAGES.${x.toUpperCase()}`))
         .subscribe((translations) => {
           // init dropdown list with TRANSLATED list of languages from config
           this.languages = environment.locales.map((x) => {
             return {
               id: x,
               title: translations[`LANGUAGES.${x.toUpperCase()}`],
             };
           });
         });
  }

  changeLocale(el: { id: string; title: string }) {
    this.translateService.use(el.id);
    this.selectedLanguage = el.title;
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
