import {
  Component,
  OnInit,
  Pipe,
  PipeTransform,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { createSelector, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  addChips,
  getControlsValues,
  removeChips,
  saveFormsValues,
} from 'src/app/core/store/actions/filter.actions';
//import { stat } from 'fs';
import {
  IAppState,
  IFilterControls,
  IFilterFormsValues,
  IFilterState,
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
import { map } from 'rxjs/operators';
import { COMMA, E, ENTER } from '@angular/cdk/keycodes';

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
  formValues : any;

  constructor(
    private store: Store<IAppState>,
    private filterService: FilterService
  ) {
    this.locations = this.store.select(selectControlsLocations);
    this.categories = this.store.select(selectControlsCathegories);
    this.tags = this.store.select(selectControlsTags);
    this.chips = this.store.select(selectChips); // === SELECTED TAGS
    this.vendors = this.store.select(selectControlsVendors);
    this.storedFormValues = this.store.select(selectFormValues);

    this.subscribedFormValues = this.storedFormValues.subscribe(data => this.formValues = data)
  //  console.log( this.formValues)

  //  this.storedFormValues.subscribe((data) => console.log(data));
    this.filterForm = new FormGroup({
      category: new FormControl(this.formValues.categories),
      city: new FormControl(this.formValues.city),
      vendor: new FormControl(this.formValues.vendors),
      chipsFormControl: new FormControl(''),
    });

    
  //  this.inputsAutocomplets = this.tags;
  } // END OF CONSTRUCTOR

  ngOnInit(): void {
    this.store.dispatch(getControlsValues());
    //this.filterForm.patchValue({category: this.formValues.category})
  }

  ngOnDestroy(): void {
    
    const configControls = {
      values: {
        vendors: this.filterForm.get('vendor')?.value,
        city: this.filterForm.get('city')?.value,
        categories: this.filterForm.get('category')?.value,
      },
    };
    console.log(configControls);
    this.store.dispatch(saveFormsValues({ values: configControls.values }));
    this.subscribedFormValues.unsubscribe();
  }

  resetDiscounts(){
    //this.store
  }

  resetForm(){
    this.filterForm.reset();
    this.store.dispatch(addChips({ tag: "resetSelectedTags" }));
  }

  selectCathegory() {
    const cathegoryValue = this.filterForm.get('category')?.value;
    console.log(cathegoryValue);
  }

  selectCity() {
    const theCity = this.filterForm.get('cities')?.value;
    console.log(theCity);
  }

  removeTag(tag: string) {
    this.store.dispatch(removeChips({ tag }));
  }

  selectTag(slectedTag: any) {
    let targetTag = slectedTag.option.value;
    if (targetTag !== 'none') {
      this.store.dispatch(addChips({ tag: targetTag }));
    } else {
      this.filterForm.get('chipsFormControl')?.reset();
    }
  }
}
