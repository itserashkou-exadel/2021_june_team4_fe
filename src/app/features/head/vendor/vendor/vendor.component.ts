import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const API_URL = 'http://localhost:8080';
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
  vendorForm!: FormGroup;
  categories!: Array<Object>;
  tags!: Array<Object>;
  vendors!: Array<Object>;

  bpForm!: FormGroup;

  constructor( private http: HttpClient ) { }

  ngOnInit(): void {
    this.vendorForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      tag: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      vendorPhotos: new FormControl(null, [Validators.required]),
      locations: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      contacts: new FormControl(null, [Validators.required])
    });

    this.bpForm = new FormGroup({
      bonusProgram: new FormControl(null, [Validators.required]),
      bpName: new FormControl(null, [Validators.required]),
      bpPhotos: new FormControl(null, [Validators.required]),
      bpDescription: new FormControl(null, [Validators.required]),
      bpStartDate: new FormControl(null, [Validators.required]),
      bpEndDate: new FormControl(null, [Validators.required]),
      bpLocations: new FormControl(null, [Validators.required]),
      bpSize: new FormControl(null, [Validators.required])
    });

    //Adding default values for dropdown Vendors from server
    this.http.get<any>(`${API_URL}/vendors`).subscribe(data => {
      this.vendors = data.map((value: any) => value.name)  
    });

    //Adding default values for dropdown Categories from server
    this.http.get<any>(`${API_URL}/categories`).subscribe(data => {
      this.categories = data.map((value: any) => value.name)
    });

    //Adding default values for dropdown Tags from server
    this.http.get<any>(`${API_URL}/tags`).subscribe(data => {
      this.tags = data.map((value: any) => value.name)
    });


  };

  saveVendor() {
    localStorage.setItem('vendorsFormData', JSON.stringify(this.vendorForm.value))
  }

  saveBP() {
    localStorage.setItem('bpFormData', JSON.stringify(this.bpForm.value))
  }

  // Reset all form's fields after click btn Clear
  resetForm() {
    this.vendorForm.reset();
  }
}


