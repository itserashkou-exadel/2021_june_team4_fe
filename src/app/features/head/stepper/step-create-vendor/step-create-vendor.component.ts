import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { VendorsService } from 'src/app/core/services/vendors.service';
import { IVendor } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-step-create-vendor',
  templateUrl: './step-create-vendor.component.html',
  styleUrls: ['./step-create-vendor.component.scss']
})
export class StepCreateVendorComponent implements OnInit {
  vendorForm!: FormGroup;
  vendors$: Observable<IVendor[]>;

  aSub!: Subscription;

  constructor( private vendorsService: VendorsService ) 
  {
    this.vendors$ = this.vendorsService.getVendors();
  }

  ngOnInit(): void {
    this.vendorForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      vendorLogo: new FormControl(null, [Validators.required]),
      locations: new FormControl(null, [Validators.required]),
      schedule: new FormControl(null, [Validators.required]),
      contacts: new FormControl(null, [Validators.required])
    });
  };

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  };

  saveVendor(): void {
    localStorage.setItem('vendorsFormData', JSON.stringify(this.vendorForm.value))
  };

  // Reset all form's fields after click button Clear
  resetForm(): void {
    this.vendorForm.reset();
  };

}


