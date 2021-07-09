import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DiscountService } from 'src/app/core/services/discount.service';
import { IDiscount } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-step-edit-bp',
  templateUrl: './step-edit-bp.component.html',
  styleUrls: ['./step-edit-bp.component.scss']
})
export class StepEditBpComponent implements OnInit {
  activeComponent: string = 'edit';
  discounts$: Observable<IDiscount[]>;
  
  constructor( private discountService: DiscountService ) 
  {
    this.discounts$ = this.discountService.getDiscounts();
  }

  ngOnInit(): void {
  //   if (this.discounts$) {
  //     this.discounts$.subscribe(
  //       data => console.log(data),
  //       err => console.error(err)
  //     )
  //   }
  }

}
