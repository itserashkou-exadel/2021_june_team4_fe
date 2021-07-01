import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import {
  IDiscount,
  IHomeState,
  IAppState,
  IUiConfigState,
  // IInputTile,
} from 'src/app/shared/variables';

import { Store } from '@ngrx/store';
import { addDiscount } from 'src/app/core/store/actions/home.actions';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss'],
})
export class VendorComponent implements OnInit {
  constructor(
    private _ngZone: NgZone,
    private store: Store<IAppState>
  ) {
    // this.autosize = null;
  }

  @ViewChild('autosize')
  autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit(): void {}

  vendorForm = new FormGroup({
    discountName: new FormControl(''),
    vendorName: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
    discountLocation: new FormControl(''),
    discountTag: new FormControl(''),
    category: new FormControl(''),
    discountDescription: new FormControl(''),
    discountPercent: new FormControl(''),
    discountPromo: new FormControl(''),
    discountPicture: new FormControl('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVe9r47bhQVcZJ4jEd4wQuYH0LsAz5qKOTBATYRG8c7C3waYKbB2Z1My-HtoY2nzv4XmY&usqp=CAU'),
  });

  formSubmit(): void {
   // console.log(this.vendorForm.value);
    const tr = this.vendorForm.value;
    const newDiscount: IDiscount = {
      id: 0,
      name: tr.discountName,
      vendor: tr.vendorName,
      added: tr.startTime,
      expired: tr.endTime,
      location: tr.discountLocation,
      tag: tr.discountTag,
      category: tr.category,
      isActive: true,
      description: tr.discountDescription,
      percent: tr.discountPercent,
      image: tr.discountPicture,
    };

    this.store.dispatch(addDiscount({newDiscount}));
  }
}
