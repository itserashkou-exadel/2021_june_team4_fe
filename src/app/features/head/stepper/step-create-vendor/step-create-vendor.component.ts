import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { VendorsService } from 'src/app/core/services/vendors.service';
import { SaveVendorId } from 'src/app/core/store/actions/vendor.action';
import { IAppState, IVendor } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-step-create-vendor',
  templateUrl: './step-create-vendor.component.html',
  styleUrls: ['./step-create-vendor.component.scss']
})
export class StepCreateVendorComponent implements OnInit, OnDestroy {
  vendorForm!: FormGroup;
  vendors$: Observable<IVendor[]>;
  vSub!: Subscription;
  svSub!: Subscription;
  vendorId$: Observable<any>;

  cityControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> | undefined;

  constructor( private vendorsService: VendorsService,
               private store: Store<IAppState> ) 
  {
    this.vendors$ = this.vendorsService.getVendors();

    const selectVendor = (state: IAppState) => state.vendor;
    this.vendorId$ = this.store.select(selectVendor);

    this.vSub = this.vendorId$.subscribe(
      data => console.log(data)
    )
  }

  ngOnInit(): void {
    this.vendorForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      vendorLogo: new FormControl(null, [Validators.required]),
      locations: new FormControl(null, [Validators.required]),
      contacts: new FormControl(null, [Validators.required])
    });

    this.filteredOptions = this.cityControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  };

  ngOnDestroy(): void {
    if (this.vSub) {
      this.vSub.unsubscribe();
    };

    if (this.svSub) {
      this.svSub.unsubscribe();
    };
  };

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  saveVendor(): void {
    this.vendorForm.disable();

    const vendorFormData = this.vendorForm.value;
    this.svSub = this.vendorsService.createVendor(vendorFormData).subscribe(
      (data) => { console.log(data)},
      err => { 
        console.error(err);
        this.vendorForm.enable();
      },
      () => {
        console.log('All data were saved successfully');
        this.resetForm();
        this.vendorForm.enable();
      }
    )

    // Function for delete vendors from BD!!!!!!!!!! Warning!!!!!
    // this.vendorsService._deleteVendor();

    // this.store.dispatch(SaveVendorId({id: }))
  };

  // Reset all form's fields after click button Clear
  resetForm() {
    this.vendorForm.reset();
  };

  addNewLocation(location: string) {

  };
}


