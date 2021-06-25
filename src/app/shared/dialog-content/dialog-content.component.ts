import {Component, Inject, OnInit} from '@angular/core';
// import {MAT_DIALOG_DATA} from '@angular/material/dialog';

// export interface DialogData {
//   title: 'title'
// }

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss']
})
export class DialogContentComponent implements OnInit {
    constructor() {
    }
  // constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
  }

}
