import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from "../../../../shared/dialog/dialog/dialog.component";
import { MapComponent } from "../../../../shared/map/map.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  constructor(config: NgbRatingConfig, public dialog: MatDialog) {

    config.max = 5;
    config.readonly = true;

  }

  openDialogWithMap() {
    let configDialog = {
      panelClass: 'map-wrapper',//add custom stile
      width: '750px',
      height: '500px',
      data: {
        title: 'Title for map, description',
        component: MapComponent
      }
    };
    this.dialog.open( DialogComponent, configDialog );
  }

  ngOnInit () : void {
  }
}
