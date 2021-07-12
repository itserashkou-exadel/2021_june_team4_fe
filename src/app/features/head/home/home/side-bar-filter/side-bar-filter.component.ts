import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  addChips,
  getControlsValues,
  getFilteredData,
  removeChips,
  saveFormsValues,
} from 'src/app/core/store/actions/filter.actions';
import {
  IAppState,
  IFilterFormsValues,
  ILocationsGroup,
} from 'src/app/shared/interfaces';
import {
  selectChips,
  selectControlsLocations,
  selectControlsCathegories,
  selectControlsTags,
  selectControlsVendors,
  selectFormValues,
} from '../../home.selectors';
import { FilterService } from 'src/app/core/services/filter.service';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-side-bar-filter',
  templateUrl: './side-bar-filter.component.html',
  styleUrls: ['./side-bar-filter.component.scss'],
})
export class SideBarFilterComponent implements OnInit, OnDestroy {
  filterForm: FormGroup;
  chips: Observable<string[]>;
  tags: Observable<string[]>;
  categories: Observable<string[]>;
  locations: Observable<ILocationsGroup[]>;
  vendors: Observable<string[]>;

  storedFormValues: Observable<IFilterFormsValues>;
  subscribedFormValues: Subscription;
  subscribedChips: Subscription;
  formValues: any;
  selectedChips: any;

  constructor(private store: Store<IAppState>) {
    this.locations = this.store.select(selectControlsLocations);
    this.categories = this.store.select(selectControlsCathegories);
    this.tags = this.store.select(selectControlsTags);
    this.chips = this.store.select(selectChips); // === SELECTED TAGS
    this.vendors = this.store.select(selectControlsVendors);
    this.storedFormValues = this.store.select(selectFormValues);

   // this.storedFormValues.subscribe((data) => console.log(data));

    this.subscribedFormValues = this.storedFormValues.subscribe(
      (data) => (this.formValues = data)
    );
    this.subscribedChips = this.chips.subscribe(
      (data) => (this.selectedChips = data)
    );

    this.filterForm = new FormGroup({
      category: new FormControl(this.formValues.categories  ),
      city: new FormControl(this.formValues.city),
      vendor: new FormControl(this.formValues.vendors),
      chipsFormControl: new FormControl(),
    });
  // END OF CONSTRUCTOR
  } 

  ngOnInit(): void {
    this.store.dispatch(getControlsValues());
  }

  ngOnDestroy(): void {
    //console.log()
  
    const configControls = {
      values: {
        vendors: (this.filterForm.get('vendor')?.value) ? (this.filterForm.get('vendor')?.value) :[],
        city: this.filterForm.get('city')?.value || '',
        categories: this.filterForm.get('category')?.value || [],
        chips: this.selectedChips,
      },
    };
   // console.log(configControls.values)
    this.store.dispatch(saveFormsValues({ values: configControls.values }));
    this.subscribedFormValues.unsubscribe();
    this.subscribedChips.unsubscribe();
  }

  filterDiscounts() {
    const configControls = {
      values: {
        vendors: (this.filterForm.get('vendor')?.value) ? (this.filterForm.get('vendor')?.value) :[],
        city: this.filterForm.get('city')?.value || '',
        categories: this.filterForm.get('category')?.value || [],
        chips: this.selectedChips,
      },
    };
    this.store.dispatch(getFilteredData({ data: configControls.values }));
  }

  resetForm() {
    this.filterForm.reset();
    this.store.dispatch(addChips({ tag: 'resetSelectedTags' }));
  }

  selectCathegory() {
    const cathegoryValue = this.filterForm.get('category')?.value;
    // console.log(cathegoryValue);
  }

  selectCity() {
    const theCity = this.filterForm.get('cities')?.value;
    //console.log(theCity);
  }

  removeTag(tag: string) {
    this.store.dispatch(removeChips({ tag }));
  }

  selectTag(slectedTag: any) {
    console.log(this.chips);
    let targetTag = slectedTag.option.value;
    if (targetTag !== 'none') {
      this.store.dispatch(addChips({ tag: targetTag }));
    } else {
      this.filterForm.get('chipsFormControl')?.reset();
    }
  }
}
