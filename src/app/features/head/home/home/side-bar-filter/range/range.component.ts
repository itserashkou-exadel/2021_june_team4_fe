import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent{

  constructor() { }

  rangeNum: string ='';

  rangeFunc() {
    console.log(this.rangeNum)
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

}
