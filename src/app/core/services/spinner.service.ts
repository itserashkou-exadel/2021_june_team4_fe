import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private sub = new Subject<boolean>();

  constructor() { }

  returnAsObservable() {
    return this.sub;//.asObservable();
  }

  showSpinner() {
    this.sub.next(true);
  }

  hideSpinner() {
    this.sub.next(false);
  }
}
