import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { VendorsService } from 'src/app/core/services/vendors.service';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { TagsService } from 'src/app/core/services/tags.service';
import { ICategory, ITag, IVendor } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-step-create-vendor',
  templateUrl: './step-create-vendor.component.html',
  styleUrls: ['./step-create-vendor.component.scss']
})
export class StepCreateVendorComponent implements OnInit {
  // filteredVendors!: Observable<string[]>;
  filteredVendors!: any;

  vendorForm!: FormGroup;
  vendors$: Observable<IVendor[]>;
  categories: Observable<ICategory[]>;
  tags: Observable<ITag[]>;

  aSub!: Subscription;

  constructor( private vendorsService: VendorsService,
               private categoriesService: CategoriesService,
               private tagsService: TagsService ) 
  {
    this.vendors$ = this.vendorsService.getVendors();
    this.categories = this.categoriesService.getCategories();
    this.tags = this.tagsService.getTags();
  }

  ngOnInit(): void {
    this.vendorForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      tag: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      vendorLogo: new FormControl(null, [Validators.required]),
      locations: new FormControl(null, [Validators.required]),
      schedule: new FormControl(null, [Validators.required]),
      contacts: new FormControl(null, [Validators.required])
    });


    this.filteredVendors = this.vendorForm.controls.name.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  };

  ngOnDestroy(): void {
    this.aSub.unsubscribe()
  }

  saveVendor(): void {
    localStorage.setItem('vendorsFormData', JSON.stringify(this.vendorForm.value))
  };

  // Reset all form's fields after click button Clear
  resetForm(): void {
    this.vendorForm.reset();
  };

  private _filter(value: string): any {//string[] {
    const filterValue = value.toLowerCase();
    let test: string[];
    this.aSub = this.vendors$.subscribe(
      data => {
        test = data.map(value => value.name);
        // console.log(vendorsList)
        //return test.filter((value: string) => value.toLowerCase().includes(filterValue)); 
      },
      err => {
        console.error(err)
      }
    );
  };
}


