import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { DialogContentComponent } from "../dialog-content/dialog-content.component";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '750px',
      height:'500px'
    });

    // openDialog(config: MatDialogConfig<any> | undefined) {
    //   const dialogRef = this.dialog.open(DialogContentComponent, config);
    // }
  }
}


