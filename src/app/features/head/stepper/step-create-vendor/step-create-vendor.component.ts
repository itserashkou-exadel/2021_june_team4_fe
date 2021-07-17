import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { VendorsService } from 'src/app/core/services/vendors.service';
import { SaveVendorId } from 'src/app/core/store/actions/vendor.action';
import { API_URL } from 'src/app/shared/constants';
import { IAppState, ISimpleVar, IVendor } from 'src/app/shared/interfaces';

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
  vSub!: Subscription;
  svSub!: Subscription;
  subVendorId!: Subscription;
  vendorId$: Observable<any>;
  subAddCountry!: Subscription;

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

    const selectVendor = (state: IAppState) => state.vendor;
    this.vendorId$ = this.store.select(selectVendor);

    this.vSub = this.vendorId$.subscribe((data) => console.log(data));
  }
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.cityControl.disable();
    this.latControl.disable();
    this.longControl.disable();
    this.initCities();
    this.initCountries();

    this.vendorForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      vendorLogo: new FormControl(null, [Validators.required]),
      locations: new FormControl(null, [Validators.required]),
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
    if (this.subVendorId){this.subVendorId.unsubscribe()}
    if( this.subAddCountry){ this.subAddCountry.unsubscribe()}
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

// isCity(){
//   return this.currentCityId.length >0? true: false;
// }
addCoordinates(){
  let vendorid ='';
  this.subVendorId =  this.vendorId$.subscribe(id => vendorid = id.vendor.vendorid)
  const req = {
    "cityId": this.currentCityId,
    "latitude": this.latControl.value,
    "longitude": this.longControl.value,
    "vendorId": vendorid
  }
  this.http.post<any>(`${API_URL}/locations`, req).subscribe(resp => console.log(resp));

}
  addCountry() {
    const newCountry = this.countryControl.value;
    this.subAddCountry = this.http
      .post<any>(`${API_URL}/countries`, { name: newCountry })
      .subscribe((data) => this.initCountries());
  }
  removeCountry() {
    const targetCountry = this.countryControl.value;
    this.http
      .delete<any>(`${API_URL}/countries/${targetCountry}`)
      .subscribe((data) => this.initCountries());
  }

  addCity() {
    const newCity = this.cityControl.value;
    this.http
      .post<any>(`${API_URL}/countries/${this.currentCountryId}/cities`, {
        name: newCity,
      })
      .subscribe((data) => this.initCities());
  }

  reformatCity(country: any) {
    return { id: country.id, name: country.name };
  }

  reformatCountry(country: any) {
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

  saveVendor(): void {  
    this.vendorForm.disable();

    const vendorFormData = this.vendorForm.value;
    this.svSub = this.vendorsService.createVendor(vendorFormData).subscribe(
      (data) => {
        console.log(data);
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

    // Function for delete vendors from BD!!!!!!!!!! Warning!!!!!
    // this.vendorsService._deleteVendor();

    // this.store.dispatch(SaveVendorId({id: }))
  }

  focusOncountry() {}

  initCountries() {
    this.http.get(API_URL + '/countries').subscribe((data: any) => {
      this.countryOptions = data.map((el: any) => {
        return this.reformatCountry(el);
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
    this.http
      .get(API_URL + '/countries/' + this.currentCountryId)
      .subscribe((data: any) => {
        this.cityOptions = data.cities.map((el: any) => {
          return this.reformatCountry(el);
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
