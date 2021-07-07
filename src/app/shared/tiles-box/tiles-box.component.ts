import { Component, OnInit, Input } from '@angular/core';
import { IDiscount } from '../interfaces';

@Component({
  selector: 'app-tiles-box',
  templateUrl: './tiles-box.component.html',
  styleUrls: ['./tiles-box.component.scss']
})
export class TilesBoxComponent implements OnInit {

  @Input() discountsData$ : IDiscount[] | null = [];

  constructor() { }

  ngOnInit(): void {
  }

}
