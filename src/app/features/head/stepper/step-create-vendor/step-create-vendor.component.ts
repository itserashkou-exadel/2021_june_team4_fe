import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Event } from '@angular/router';
import { createSelector, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { VendorsService } from 'src/app/core/services/vendors.service';
import { saveVendorData } from 'src/app/core/store/actions/vendor.action';
import { API_URL } from 'src/app/shared/constants';
import {
  IAppState,
  ISimpleVar,
  IVendor,
  IVendorState,
} from 'src/app/shared/interfaces';

@Component({
  selector: 'app-step-create-vendor',
  templateUrl: './step-create-vendor.component.html',
  styleUrls: ['./step-create-vendor.component.scss'],
})
export class StepCreateVendorComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  vendorForm!: FormGroup;
  vendors$: Observable<IVendor[]>;
  selectedVendor$: Observable<any>;

  vSub!: Subscription;
  svSub!: Subscription;
  subVendorId!: Subscription;
  subAddCountry!: Subscription;
  subAddCity!: Subscription;
  subFindVendor!: Subscription;
  subInitCountries!: Subscription;
  subInitCities!: Subscription;
  subDeleteVendor!: Subscription;

  latControl = new FormControl();
  longControl = new FormControl();

  countryControl = new FormControl('');
  countryOptions: { id: string; name: string }[] = [
    { id: 'One', name: 'Two' },
    { id: 'three', name: 'four' },
  ];
  filteredCountry: Observable<{ id: string; name: string }[]> | undefined;
  currentCountryId: string = '';

  cityControl = new FormControl('');
  cityOptions: { id: string; name: string }[] = [
    { id: 'One', name: 'Paris' },
    { id: 'three', name: 'Athes' },
  ];
  filteredCities: Observable<{ id: string; name: string }[]> | undefined;
  currentCityId: string = '';
  isCity: boolean = false;

  constructor(
    private vendorsService: VendorsService,
    private store: Store<IAppState>,
    private http: HttpClient
  ) {
    this.vendors$ = this.vendorsService.getVendors();

    const selectVendorState = (state: IAppState) => state.vendor;
    const selectVendorData = createSelector(
      selectVendorState,
      (state: IVendorState) => state.selectedVendor
    );
    this.selectedVendor$ = this.store.select(selectVendorData);
    //END OF CONSTRUCTOR
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.cityControl.disable();
    this.latControl.disable();
    this.longControl.disable();
    this.initCities();
    this.initCountries();
    this.countryControl.disable();

    this.vendorForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      contacts: new FormControl(null, [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    if (this.vSub) {
      this.vSub.unsubscribe();
    }
    if (this.svSub) {
      this.svSub.unsubscribe();
    }
    if (this.subVendorId) {
      this.subVendorId.unsubscribe();
    }
    if (this.subAddCountry) {
      this.subAddCountry.unsubscribe();
    }
    if (this.subAddCity) {
      this.subAddCity.unsubscribe();
    }
    if (this.subFindVendor) {
      this.subFindVendor.unsubscribe();
    }
    if (this.subInitCountries) {
      this.subInitCountries.unsubscribe();
    }
    if (this.subInitCities) {
      this.subInitCities.unsubscribe();
    }
  }

  selectCity(cityId: string) {
    this.currentCityId = cityId;
    this.cityControl.enable();
    this.initCities();
    this.latControl.enable();
    this.longControl.enable();
  }
  selectCountry(countryId: string) {
    this.currentCountryId = countryId;
    this.cityControl.enable();
    this.initCities();
  }

  removeVendor() {
   this.subDeleteVendor =   this.selectedVendor$.subscribe((vendor) => {
      if (!confirm(`Do you really want delete vendor ${vendor.name}?`)) {
        const vendorId = vendor.id;
        this.http.delete<any>(`${API_URL}/vendors/${vendorId}`);
      }
    });
    this.subDeleteVendor.unsubscribe();
  }

  selectVendor(vendor: any) {
    this.store.dispatch(saveVendorData(vendor));
    this.vendorForm.patchValue({
      description: vendor.description,
      contacts: vendor.contacts,
    });
    this.countryControl.enable();
  }

  addCoordinates() {
    let vendorid = '';
    this.subVendorId = this.selectedVendor$.subscribe(
      (selectedVendor) => (vendorid = selectedVendor.id)
    );
    const req = {
      cityId: this.currentCityId,
      latitude: this.latControl.value,
      longitude: this.longControl.value,
      vendorId: vendorid,
    };
    this.http
      .post<any>(`${API_URL}/locations`, req)
      .subscribe((resp) => console.log(resp));
  }

  removeCity() {
    const targetCity = this.cityControl.value;
    if (window.confirm(`Do you really want delete city ${targetCity}?`)) {
      this.http
        .delete<any>(`${API_URL}/cities/${targetCity}`)
        .subscribe((data) => this.initCountries());
    }
  }

  removeCountry() {
    const targetCountry = this.countryControl.value;
    if (window.confirm(`Do you really want delete country ${targetCountry}?`)) {
      this.http
        .delete<any>(`${API_URL}/countries/${targetCountry}`)
        .subscribe((data) => this.initCountries());
    }
  }

  addCity() {
    const newCity = this.cityControl.value;
    this.subAddCity = this.http
      .post<any>(`${API_URL}/countries/${this.currentCountryId}/cities`, {
        name: newCity,
      })
      .subscribe((data) => this.initCities());
  }

  addCountry() {
    const newCountry = this.countryControl.value;
    this.subAddCountry = this.http
      .post<any>(`${API_URL}/countries`, { name: newCountry })
      .subscribe((data) => this.initCountries());
  }

  reformatLocation(country: any) {
    return { id: country.id, name: country.name };
  }

  private _filter(value: string): any {
    const filterValue = value.toLowerCase();
    return this.countryOptions.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  private _filterCity(value: string): any {
    const filterValue = value.toLowerCase();
    return this.cityOptions.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  selectVendorEv(ev: any) {
    const temp = this.vendorForm.get('name')?.value;
    console.log(temp);
    console.log(ev);
  }

  displayVendorName(val: any) {
    if (val) {
      return val.name;
    }
  }

  saveVendor(): void {
    this.vendorForm.disable();

    const vendorFormData = this.vendorForm.value;
    this.svSub = this.vendorsService.createVendor(vendorFormData).subscribe(
      (data) => {
        const vendorData = {
          id: data.id,
          name: data.name,
          description: data.description,
          contacts: data.contacts,
        };
        this.store.dispatch(saveVendorData(vendorData));
      },
      (err) => {
        console.error(err);
        this.vendorForm.enable();
      },
      () => {
        console.log('All data were saved successfully');
        this.resetForm();
        this.vendorForm.enable();
      }
    );
  }

  focusOncountry() {}

  initCountries() {
    this.subInitCountries = this.http
      .get(API_URL + '/countries')
      .subscribe((data: any) => {
        this.countryOptions = data.map((el: any) => {
          return this.reformatLocation(el);
        });
        this.filteredCountry = this.countryControl.valueChanges.pipe(
          startWith(''),
          map((value) => {
            return this._filter(value);
          })
        );
      });
  }

  initCities() {
    if (!this.currentCountryId) return;
    this.subInitCities = this.http
      .get(API_URL + '/countries/' + this.currentCountryId)
      .subscribe((data: any) => {
        this.cityOptions = data.cities.map((el: any) => {
          return this.reformatLocation(el);
        });
        this.filteredCities = this.cityControl.valueChanges.pipe(
          startWith(''),
          map((value) => {
            return this._filterCity(value);
          })
        );
      });
  }

  resetForm() {
    this.vendorForm.reset();
  }

  addNewLocation(location: string) {}
}
