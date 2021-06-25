import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from "./dialog/dialog.component";

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  constructor(config: NgbRatingConfig, public dialogRef: DialogComponent) {

    config.max = 5;
    config.readonly = true;

  }

  openDialog() {
    this.dialogRef.openDialog();
  }

  ngOnInit () : void {
  }
}
