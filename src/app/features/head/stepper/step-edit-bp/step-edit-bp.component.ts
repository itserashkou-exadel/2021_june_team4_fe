import { HttpClient } from '@angular/common/http';
import { compileNgModule } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
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
  ISimpleVar,
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
  newCategoryInput: FormControl;
  newTagInput: FormControl;
  activeComponent: string = 'edit';

  discounts$: Observable<IDiscount[]>;
  vendors$: Observable<IVendor[]>;
  selectedVendor$: Observable<any>;
  remoteVendor!: Observable<any>;
  categories$: Observable<ICategory[]>;
  tags$: Observable<ITag[]>;

  tagsSet: any;

  aSub!: Subscription;
  subSlelectVendor: Subscription;
  subVendorDiscounts!: Subscription;
  subTags!: Subscription;
  subSlelectLocations!: Subscription;

  vendor: any;
  vendorDiscounts!: IDiscount[];
  vendorLocations: any;

  DiscountsTypes: Array<DiscountType> = [
    {value: '', viewValue: 'COMMON.Stepper.SecondStep.typePercent'}, 
    {value: '', viewValue: 'COMMON.Stepper.SecondStep.typePrice'}
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
    this.newCategoryInput = new FormControl();
    this.newTagInput = new FormControl();
    this.tags$ = this.tagsService.getTags();
    this.categories$ = this.categoriesService.getCategories();
    this.discounts$ = this.discountService.getDiscounts();
    this.vendors$ = this.vendorsService.getVendors();

    // this.vendorLocations$ = this.vendorsService.getVendorDiscounts(this.vendor.id);
    const selectVendorState = (state: IAppState) => state.vendor;
    const selectVendorData = createSelector(
      selectVendorState,
      (state: IVendorState) => state.selectedVendor
    );
    this.selectedVendor$ = this.store.select(selectVendorData);
    this.subSlelectVendor = this.selectedVendor$.subscribe((vendor) => {
      this.subSlelectLocations = this.vendorsService
        .getVendorLocations(vendor.id)
        .subscribe((data) => {
          this.vendorLocations = data;
        });
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
    this.subTags = this.tagsService.getTags().subscribe((data) => {
      this.tagsSet = data;
    });

    this.discountForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      tags: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      eventStart: new FormControl(null, [Validators.required]),
      eventEnd: new FormControl(null, [Validators.required]),
      discountType: new FormControl(null, [Validators.required]),
      size: new FormControl(null, [Validators.required]),
      promo: new FormControl(null, [Validators.required]),
      locations: new FormControl(null, [Validators.required]),
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

  selectCategory(ev: any){
    console.log(ev);
  }

  saveDiscount() {
    console.log('saveDiscount');
    const newDiscount = {
      active: true,
      categoryId: this.discountForm.get('category')?.value, //'3fa85f64-5717-4562-b3fc-2c963f66afa6',
      description: this.discountForm.get('description')?.value,
      discountType: this.discountForm.get('discountType')?.value,
      endTime: new Date(this.discountForm.get('eventEnd')?.value).toISOString(), // '2021-07-21T18:45:24.464Z',
      name: this.discountForm.get('name')?.value,
      promo: this.discountForm.get('promo')?.value,
      startTime: new Date(
        this.discountForm.get('eventStart')?.value
      ).toISOString(), //'2021-07-21T18:45:24.464Z',
      tagIds: this.discountForm.get('tags')?.value, //['3fa85f64-5717-4562-b3fc-2c963f66afa6'],
      value: this.discountForm.get('size')?.value,
      vendorId: this.vendor.id,
      vendorLocationsIds: this.discountForm.get('locations')?.value,
    };
    console.log(newDiscount)
    this.discountService.createDiscount(JSON.stringify(newDiscount)).subscribe(resp => console.log(resp));
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
  createCategory(): void {
    const newCategoryName: string = this.newCategoryInput.value;
    this.categoriesService.createCategory({ name: newCategoryName });
  }

  createTag(): void {
    const newTagName = this.newTagInput.value;
    this.tagsService.createTag({ name: newTagName });
  }

  editDiscount(ev: any) {

    this.discountService.getDiscountById(ev).subscribe((discount) => {
      console.log(discount);
      this.activeComponent = 'create';

      this.discountForm.patchValue({
        name: discount.name,
        category: discount.category.id,
        tags: discount.tags.map((el: ISimpleVar) => el.id),
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVe9r47bhQVcZJ4jEd4wQuYH0LsAz5qKOTBATYRG8c7C3waYKbB2Z1My-HtoY2nzv4XmY&usqp=CAU',
        description: discount.description,
        eventStart: discount.startTime.substring(0, 10),
        eventEnd: discount.endTime.substring(0, 10),
        discountType: discount.discountType,
        size: discount.value,
        promo: discount.promo,
      });
      console.log( this.discountForm.get('category')?.value);
    });
  }

}
