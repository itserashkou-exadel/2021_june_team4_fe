import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  count$: Observable<number>;

  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');
  }

  ngOnInit(): void {
  }
  
  // inc() {
  //   this.store.dispatch(inc());
  // }
  // dec() {
  //   this.store.dispatch(dec());
  // }
  // res() {
  //   this.store.dispatch(res());
  // }
  

  // Display(info: string) {
  //   let Subscr = document.querySelector('#Subscr');
  //   let Favor = document.querySelector('#Favor');
  //   let Hist = document.querySelector('#Hist');
  //   let Active = document.querySelector('#Active');

  //   switch (info) {
  //     case 'Subscr':
  //       Subscr?.classList.toggle('d-block')
  //       Favor?.classList.remove('d-block')
  //       Hist?.classList.remove('d-block')
  //       Active?.classList.remove('d-block')
  //       break;
  //     case 'Favor':
  //       Subscr?.classList.remove('d-block')
  //       Favor?.classList.toggle('d-block')
  //       Hist?.classList.remove('d-block')
  //       Active?.classList.remove('d-block')
  //       break;
  //     case 'Hist':
  //       Subscr?.classList.remove('d-block')
  //       Favor?.classList.remove('d-block')
  //       Hist?.classList.toggle('d-block')
  //       Active?.classList.remove('d-block')
  //       break;
  //     case 'Active':
  //       Subscr?.classList.remove('d-block')
  //       Favor?.classList.remove('d-block')
  //       Hist?.classList.remove('d-block')
  //       Active?.classList.toggle('d-block')
  //       break;
  //   }
  // }
}
