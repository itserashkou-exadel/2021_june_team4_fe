import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { createSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  addChips,
  removeChips,
} from 'src/app/core/store/actions/filter.actions';
//import { stat } from 'fs';
import { IAppState, IFilterControls, IFilterState, ILocationsGroup, } from 'src/app/shared/interfaces';
import { selectFilter,selectChips,selectControlsLocations,selectControlsCathegories,selectControlsTags ,selectControlsVendors} from '../../home.selectors';

@Component({
  selector: 'app-side-bar-filter',
  templateUrl: './side-bar-filter.component.html',
  styleUrls: ['./side-bar-filter.component.scss'],
})
export class SideBarFilterComponent implements OnInit {
  filterForm: FormGroup;

  chips: Observable<string[]>;
  tags: Observable<string[]>;
  cathegories: Observable<string[]>;
  locations: Observable<ILocationsGroup[]>;
  vendors: Observable<string[]>;

  constructor(private store: Store<IAppState>) {

    this.locations = this.store.select(selectControlsLocations);
    this.cathegories = this.store.select(selectControlsCathegories);
    this.tags = this.store.select(selectControlsTags);
    this.chips = this.store.select(selectChips);
    this.vendors = this.store.select(selectControlsVendors);

    this.filterForm = new FormGroup({
      cathegory: new FormControl(['Fashion']),
      cities: new FormControl(''),
      tag: new FormControl(''),
    });

  }

  ngOnInit(): void {}

  selectCathegory() {
    const cathegoryValue = this.filterForm.get('cathegory')?.value;
    console.log(cathegoryValue);
  }

  selectCity() {
    const theCity = this.filterForm.get('cities')?.value;
    console.log(theCity);
  }

  removeTag(tag: string) {
    console.log(tag);
    this.store.dispatch(removeChips({ tag }));
  }

  selectTag() {
    const tag = this.filterForm.get('tag')?.value;
    let isPresent;
    this.chips.subscribe((el) => {
      isPresent = el.includes(tag);
      console.log(tag);
    });
    if (!isPresent) {
      this.store.dispatch(addChips({ tag }));
    }
  }
}
