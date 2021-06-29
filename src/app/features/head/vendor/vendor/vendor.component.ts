import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface IVendor {
  name: string;
  category: string;
  tag: string;
}
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
  // === Mock Data ====
  vendors: IVendor[] = [
    {name: 'Nike', category: 'Clothes', tag: 'Sport'},
    {name: 'Domino’s Pizza', category: 'Food', tag: 'Pizza'},
    {name: 'Nike', category: 'Clothes', tag: 'Sport'},
    {name: 'Domino’s Pizza', category: 'Food', tag: 'Pizza'},
  ];
  // === /Mock Data ====
  vendorForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.vendorForm = new FormGroup({
      name: new FormControl(null),
      category: new FormControl(null),
      tag: new FormControl(null),
      description: new FormControl(null),
      photos: new FormControl(null),
      locations: new FormControl(null),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      contacts: new FormControl(null)
    })
  };

  onSubmit() {
    // console.log(this.vendorForm.value)
    localStorage.setItem('vendorsFormData', JSON.stringify(this.vendorForm.value))
  }
}


