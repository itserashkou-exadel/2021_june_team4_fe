import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { createSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  addChips,
  removeChips,
} from 'src/app/core/store/actions/filter.actions';
//import { stat } from 'fs';
import { IAppState, IFilterControls, IFilterState, ILocationsGroup } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-side-bar-filter',
  templateUrl: './side-bar-filter.component.html',
  styleUrls: ['./side-bar-filter.component.scss'],
})
export class SideBarFilterComponent implements OnInit {
  filterForm: FormGroup;
  //filterConfig: any;

  chips: Observable<string[]>;
  tags: Observable<string[]>;
  cathegories: Observable<string[]>;
  locations: Observable<ILocationsGroup[]>;
  vendors: string[];

  constructor(private store: Store<IAppState>) {
    const selectFilterConfig = (state: IAppState) => state.filter;

    const selectChips = createSelector(
      selectFilterConfig,
      (state: IFilterState) => state.chips
    );
    const selectDropdownsValues = createSelector(
      selectFilterConfig,
      (state: IFilterState) => state.controlsValues
    );
    const selectTags = createSelector(
      selectDropdownsValues,
      (state: IFilterControls) => state.tags
    );
    const selectCathegories = createSelector(
      selectDropdownsValues,
      (state: IFilterControls) => state.cathegories
    );
    const selectLocations = createSelector(selectDropdownsValues, (state: IFilterControls) => state.locations)

    this.locations = this.store.select(selectLocations);
    this.cathegories = this.store.select(selectCathegories);
    this.tags = this.store.select(selectTags);
    this.chips = this.store.select(selectChips);

    this.filterForm = new FormGroup({
      cathegory: new FormControl(['Fashion']),
      cities: new FormControl(''),
      tag: new FormControl(''),
    });

    // this.filterConfig = {
    //   cathegories: ['Food', 'Fashion', 'Gadgets'],
    //   tags: ['Apple', 'Samsung', 'Manicure', 'Vocation', 'Cinema'],
    // };
    //const cathegories=
  this.vendors = ['Rozetka', 'Pizzas without borders', 'Fitness assembly'];
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
