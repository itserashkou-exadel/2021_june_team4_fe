import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DiscountService } from 'src/app/core/services/discount.service';
import { HomeService } from 'src/app/core/services/home.service';
import { VendorsService } from 'src/app/core/services/vendors.service';
import { API_URL } from 'src/app/shared/constants';
import {
  IAppState,
  IDiscount,
  IVendor,
  IVendorState,
} from 'src/app/shared/interfaces';

@Component({
  selector: 'app-step-edit-bp',
  templateUrl: './step-edit-bp.component.html',
  styleUrls: ['./step-edit-bp.component.scss'],
})
export class StepEditBpComponent implements OnInit, OnDestroy {
  activeComponent: string = 'edit';

  discounts$: Observable<IDiscount[]>;
  vendors$: Observable<IVendor[]>;
  selectedVendor$: Observable<any>;
  remoteVendor!: Observable<any>;

  aSub!: Subscription;
  subSlelectVendor: Subscription;
  subVendorDiscounts!: Subscription;

  vendor: any;
  vendorDiscounts!: IDiscount[];

  constructor(
    private discountService: DiscountService,
    private handleDiscount: HomeService,
    private vendorsService: VendorsService,
    private store: Store<IAppState>,
    private http: HttpClient
  ) {
    this.discounts$ = this.discountService.getDiscounts();
    this.vendors$ = this.vendorsService.getVendors();

    const selectVendorState = (state: IAppState) => state.vendor;
    const selectVendorData = createSelector(
      selectVendorState,
      (state: IVendorState) => state.selectedVendor
    );
    this.selectedVendor$ = this.store.select(selectVendorData);

    this.subSlelectVendor = this.selectedVendor$.subscribe((vendor) => {
      this.getVendorsById(vendor.id).subscribe((data) => {
        this.vendor = data;
      });
     this.subVendorDiscounts = this.vendorsService.getVendorDiscounts(vendor.id).subscribe((data) => {
        this.vendorDiscounts = data.map((rawDiscount: any) =>
          this.handleDiscount.handleRemoteDiscount(rawDiscount)
        );
      });
    });
    //END OF CONSTRUCTOR
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
    if (this.subSlelectVendor) {
      this.subSlelectVendor.unsubscribe();
    }
    if ( this.subVendorDiscounts){
      this.subVendorDiscounts.unsubscribe();
    }
  }

  getVendorsById(id: string) {
    return this.vendorsService.getVendorsById(id);
  }
}
