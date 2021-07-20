import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private sub = new BehaviorSubject<boolean>(false);

  constructor() { }

  returnAsObservable() {
    return this.sub.asObservable();
  }

  showSpinner() {
    this.sub.next(true);
  }

  hideSpinner() {
    this.sub.next(false);
  }
}
