import { Component, OnInit, Input } from '@angular/core';
import { DiscountService } from 'src/app/core/services/discount.service';
import { IDiscount } from '../interfaces';

@Component({
  selector: 'app-tiles-box',
  templateUrl: './tiles-box.component.html',
  styleUrls: ['./tiles-box.component.scss']
})
export class TilesBoxComponent implements OnInit {

  @Input() discountsData$ : IDiscount[] | null = [];

  constructor( private discountService: DiscountService ) 
  {
   
  }

  ngOnInit(): void {
    this.discountService.getDiscounts().subscribe(
      data => this.discountsData$ = data.filter((value: IDiscount) => value.vendor.name === 'SportLife')
    )
  }

}
