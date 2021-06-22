import { Component, OnInit } from '@angular/core';
import { createSelector } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IDiscount, IHeadState, IAppState } from '../../head.variables';
import { Store } from '@ngrx/store';
import { state } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  

  //sd = this.store.select(state => state.head.discounts)

 inerState : any

  constructor(private store: Store<IAppState>) {
   
    const sd = this.store.select(state => state.head.discounts)
    sd.forEach(el => this.inerState = el)
    // console.log(sd)
  }

  ngOnInit(): void {
    console.log(this.inerState)
    this.inerState.forEach((el:IDiscount) => this.inerState = el)
  }
}
