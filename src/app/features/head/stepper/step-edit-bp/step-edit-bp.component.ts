import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DiscountService } from 'src/app/core/services/discount.service';
import { VendorsService } from 'src/app/core/services/vendors.service';
import { IDiscount, IVendor } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-step-edit-bp',
  templateUrl: './step-edit-bp.component.html',
  styleUrls: ['./step-edit-bp.component.scss']
})
export class StepEditBpComponent implements OnInit, OnDestroy {
  activeComponent: string = 'edit';

  discounts$: Observable<IDiscount[]>;
  vendors$: Observable<IVendor[]>;

  aSub!: Subscription;
  
  constructor( private discountService: DiscountService,
               private vendorsService: VendorsService ) 
  {
    this.discounts$ = this.discountService.getDiscounts();
    this.vendors$ = this.vendorsService.getVendors();
  }

  ngOnInit(): void {
    this.getVendorsById('3633f3cf-7208-4d67-923d-ce6b2cec29e2');
  };

  ngOnDestroy(): void {
    if(this.aSub) {
      this.aSub.unsubscribe();
    };
  };

  getVendorsById(id: string) {
    return this.vendorsService.getVendorsById(id).subscribe(
      data => console.log(data.discounts)
    )
  }
}
