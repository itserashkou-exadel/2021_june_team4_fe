import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
})
export class HeadComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('init');
  }

  discountSearch = new FormControl('');
  profileMenu = new FormControl('');
  // MenU = document.getElementById('mat-menu');
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
    { link: 'statistic', label: 'Statistic' }
  ];

  pmClick(ev: Event) {
    console.log((ev.target as HTMLButtonElement).innerText);
  }

}
