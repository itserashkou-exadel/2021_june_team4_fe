import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { DiscountService } from 'src/app/core/services/discount.service';
import { TagsService } from 'src/app/core/services/tags.service';
import { ICategory, ITag } from '../../../../shared/interfaces';

interface DiscountType {
  value: string,
  viewValue: string
}

@Component({
  selector: 'app-step-create-bp',
  templateUrl: './step-create-bp.component.html',
  styleUrls: ['./step-create-bp.component.scss']
})
export class StepCreateBpComponent implements OnInit, OnDestroy {
  bpForm!: FormGroup;
  aSub!: Subscription;

  categories$: Observable<ICategory[]>;
  tags$: Observable<ITag[]>;

  DiscountsTypes: DiscountType[] = [
    {value: 'PERCENT', viewValue: 'Percent'}, 
    {value: 'PRICE', viewValue: 'Price'},
  ];
  
  constructor( private categoriesService: CategoriesService,
               private tagsService: TagsService,
               private discountService: DiscountService ) 
  { 
    this.categories$ = this.categoriesService.getCategories();
    this.tags$ = this.tagsService.getTags();
  }

  ngOnInit(): void {
    this.bpForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      tag: new FormControl(null, [Validators.required]),
      bpPhotos: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      startTime: new FormControl(null, [Validators.required]),
      endTime: new FormControl(null, [Validators.required]),
      discountType: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required]),
      promo: new FormControl(null, [Validators.required])
    });
  };

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    };
  };

  saveBP(): void {
    this.bpForm.disable();

    const bpFormData = this.bpForm.value;
    this.aSub = this.discountService.createDiscount(bpFormData).subscribe(
      () => {},
      err => {        
        console.error(err);
        this.bpForm.enable();
      },
      () => {
        console.log('All data were saved successfully');
        this.bpForm.enable();
      }
    )
  };

  createCategory(category: string): void {
    this.categoriesService.createCategory(JSON.stringify({ 'name': category }))
  };

  createTag(tag: string): void {
    this.tagsService.createTag(JSON.stringify({ 'name': tag }))
  };
}
