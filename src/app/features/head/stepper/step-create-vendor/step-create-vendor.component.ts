import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

const API_URL = 'http://localhost:8080';

interface DefaultData {
  id: string;
  name: string;
}

@Component({
  selector: 'app-step-create-vendor',
  templateUrl: './step-create-vendor.component.html',
  styleUrls: ['./step-create-vendor.component.scss']
})
export class StepCreateVendorComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  vendorForm!: FormGroup;
  categories!: Array<Object>;
  tags!: Array<Object>;
  vendors!: Array<string>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.vendorForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      tag: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      vendorLogo: new FormControl(null, [Validators.required]),
      locations: new FormControl(null, [Validators.required]),
      schedule: new FormControl(null, [Validators.required]),
      contacts: new FormControl(null, [Validators.required])
    });

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    // //Adding default values for dropdown Vendors from server
    this.http.get<any>(`${API_URL}/vendors`).subscribe(data => {
      this.vendors = data.map((value: any) => value.name)  //TODO: rework
    });

    // //Adding default values for dropdown Categories from server
    // this.http.get<any>(`${API_URL}/categories`).subscribe(data => {
    //   this.categories = data.map((value: any) => value.name)
    // });

    // //Adding default values for dropdown Tags from server
    // this.http.get<any>(`${API_URL}/tags`).subscribe(data => {
    //   this.tags = data.map((value: any) => value.name)
    // });
  };

  saveVendor() {
    localStorage.setItem('vendorsFormData', JSON.stringify(this.vendorForm.value))
  };

  // Reset all form's fields after click button Clear
  resetForm() {
    this.vendorForm.reset();
  };

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  };
}


