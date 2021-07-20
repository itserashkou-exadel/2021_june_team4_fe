import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { createSelector, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { DiscountService } from 'src/app/core/services/discount.service';
import { HomeService } from 'src/app/core/services/home.service';
import { TagsService } from 'src/app/core/services/tags.service';
import { VendorsService } from 'src/app/core/services/vendors.service';
import { API_URL } from 'src/app/shared/constants';
import {
  IAppState,
  ICategory,
  IDiscount,
  ITag,
  IVendor,
  IVendorState,
} from 'src/app/shared/interfaces';

interface DiscountType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-step-edit-bp',
  templateUrl: './step-edit-bp.component.html',
  styleUrls: ['./step-edit-bp.component.scss'],
})
export class StepEditBpComponent implements OnInit, OnDestroy {
  discountForm!: FormGroup;
  activeComponent: string = 'edit';

  discounts$: Observable<IDiscount[]>;
  vendors$: Observable<IVendor[]>;
  selectedVendor$: Observable<any>;
  remoteVendor!: Observable<any>;
  categories$: Observable<ICategory[]>;
  tags$: Observable<ITag[]>;

  aSub!: Subscription;
  subSlelectVendor: Subscription;
  subVendorDiscounts!: Subscription;

  vendor: any;
  vendorDiscounts!: IDiscount[];

  DiscountsTypes: DiscountType[] = [
    { value: 'PERCENT', viewValue: 'Percent' },
    { value: 'PRICE', viewValue: 'Price' },
  ];

  constructor(
    private discountService: DiscountService,
    private handleDiscount: HomeService,
    private vendorsService: VendorsService,
    private store: Store<IAppState>,
    private http: HttpClient,
    private categoriesService: CategoriesService,
    private tagsService: TagsService
  ) {
    this.tags$ = this.tagsService.getTags();
    this.categories$ = this.categoriesService.getCategories();
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
      this.subVendorDiscounts = this.vendorsService
        .getVendorDiscounts(vendor.id)
        .subscribe((data) => {
          this.vendorDiscounts = data.map((rawDiscount: any) =>
            this.handleDiscount.handleRemoteDiscount(rawDiscount)
          );
        });
    });
    //END OF CONSTRUCTOR
  }

  ngOnInit(): void {
    this.discountForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      tag: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      eventStart: new FormControl(null, [Validators.required]),
      eventEnd: new FormControl(null, [Validators.required]),
      discountType: new FormControl(null, [Validators.required]),
      size: new FormControl(null, [Validators.required]),
      promo: new FormControl(null, [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
    if (this.subSlelectVendor) {
      this.subSlelectVendor.unsubscribe();
    }
    if (this.subVendorDiscounts) {
      this.subVendorDiscounts.unsubscribe();
    }
  }

  saveBP(): void {
    this.discountForm.disable();

    const bpFormData = this.discountForm.value;
    this.aSub = this.discountService.createDiscount(bpFormData).subscribe(
      () => {},
      (err) => {
        console.error(err);
        this.discountForm.enable();
      },
      () => {
        console.log('All data were saved successfully');
        this.discountForm.enable();
      }
    );
  }

  getVendorsById(id: string) {
    return this.vendorsService.getVendorsById(id);
  }
  createCategory(category: string): void {
    this.categoriesService.createCategory(JSON.stringify({ name: category }));
  }

  createTag(tag: string): void {
    this.tagsService.createTag(JSON.stringify({ name: tag }));
  }

  getDiscountId(ev:any){
    this.discountService.getDiscountById(ev).subscribe(discount => {
      this.activeComponent = 'create';
      console.log(discount);

      this.discountForm.patchValue({
        name: discount.name,
        category: discount.category.name,
        tag: discount.tags[0].name,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVe9r47bhQVcZJ4jEd4wQuYH0LsAz5qKOTBATYRG8c7C3waYKbB2Z1My-HtoY2nzv4XmY&usqp=CAU',
        description: discount.description,
        eventStart: discount.startTime,
        eventEnd: discount.endTime,
        discountType:    'PERCENT'      ,                      // { value: 'PERCENT', viewValue: 'Percent' },,
        size:  discount.value,
        promo: discount.promo,
      })
      
    })
    console.log('ev -> ')
    console.log(ev);
  }
}