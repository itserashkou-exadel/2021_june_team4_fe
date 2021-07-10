import { Component, OnInit,Pipe, PipeTransform  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { createSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  addChips,
  removeChips,
} from 'src/app/core/store/actions/filter.actions';
//import { stat } from 'fs';
import {
  IAppState,
  IFilterControls,
  IFilterState,
  ILocationsGroup,
} from 'src/app/shared/interfaces';
import {
  selectFilter,
  selectChips,
  selectControlsLocations,
  selectControlsCathegories,
  selectControlsTags,
  selectControlsVendors,
} from '../../home.selectors';
import { FilterService } from 'src/app/core/services/filter.service';
import { map } from 'rxjs/operators';
import { COMMA, E, ENTER } from '@angular/cdk/keycodes';

export interface Fruit {
  name: string;
}

@Pipe({name: 'exponentialStrength'})
export class FilterPipe implements PipeTransform {
  transform(value: [], target : string ): [] {
    
    return [];
  }
}

@Component({
  selector: 'app-side-bar-filter',
  templateUrl: './side-bar-filter.component.html',
  styleUrls: ['./side-bar-filter.component.scss'],
})
export class SideBarFilterComponent implements OnInit {
  filterForm: FormGroup;
  //chipsFormControl: FormControl;
  chips: Observable<string[]>;
  tags: Observable<string[]>;
  categories: Observable<string[]>;
  locations: Observable<ILocationsGroup[]>;
  vendors: Observable<string[]>;
  
  inputsAutocomplets: Observable<string[]>;

  constructor(
    private store: Store<IAppState>,
    private filterService: FilterService
  ) {
    
    // let remotCategories = this.filterService.requestCategories();
    // this.categories = remotCategories.pipe(
    //   map((el) => el.map((val: { name: any }) => val.name))
    // );
    //cc.pipe(map(el => el.name)).subscribe(el => console.log(el));

    // const remoteVendors = this.filterService.requestVendors();
    // this.vendors = remoteVendors.pipe(
    //   map((el) => el.map((val: { name: any }) => val.name))
    // );
   // remoteVendors.subscribe((d) => console.log(d));

    // const remoteTags = this.filterService.requestTags();
    // this.tags = remoteTags.pipe(
    //   map((el) => el.map((val: { name: any }) => val.name))
    // );

    // const remoteCities = this.filterService.requestCities();
    // remoteCities.subscribe((data) => console.log(data));
    // let rms = remoteCities.pipe(
    //   map((el) =>
    //     el.map((val: any) => ({
    //       countryName: val.name,
    //       cities: val.cities.map((c: { name: any }) => c.name),
    //     }))
    //   )
    // );
    // this.locations = rms;

    this.locations = this.store.select(selectControlsLocations);
    this.categories = this.store.select(selectControlsCathegories);
     this.tags = this.store.select(selectControlsTags);
    this.chips = this.store.select(selectChips);
     this.vendors = this.store.select(selectControlsVendors);

    this.filterForm = new FormGroup({
      category: new FormControl(['Fashion']),
      cities: new FormControl(''),
      vendor: new FormControl(''),
      chipsFormControl : new FormControl(''),
    });
   // this.chipsFormControl = new FormControl('');
    //this.inputsAutocomplets = this.tags.pipe(map(el=> el.filter(el=> el !==)))
    this.inputsAutocomplets = this.tags;
  }

  ngOnInit(): void {}

  // inputEvent(ev: any){
  //   console.log(this.chipsFormControl.value)
  //   console.log(ev.target.value);
  //   this.inputsAutocomplets = this.tags.pipe(map(el=> el.filter(el=> el !== ev.target.value)))

  //   console.log(this.inputsAutocomplets);
  // }

  selectCathegory() {
    const cathegoryValue = this.filterForm.get('category')?.value;
    console.log(cathegoryValue);
  }

  selectCity() {
    const theCity = this.filterForm.get('cities')?.value;
    console.log(theCity);
  }

  removeTag(tag: any) {
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
