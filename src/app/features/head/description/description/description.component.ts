import {Component, Input, OnInit} from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from "../../../../shared/dialog/dialog/dialog.component";
import { MapComponent } from "../../../../shared/map/map.component";
import { MatDialog } from "@angular/material/dialog";
import { createSelector, Store, select} from "@ngrx/store";
import { IAppState, IDescriptionState, IDescription, IHomeState, IUiConfigState} from "../../../../shared/interfaces";
import { Observable } from "rxjs";
import {getDescription} from "../../../../core/store/actions/description.actions";
import {setContent} from "../../../../core/store/actions/ui-config.actions";

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})

export class DescriptionComponent implements OnInit {
  descriptionData$: Observable<IDescription>;

  constructor(config: NgbRatingConfig,
              public dialog: MatDialog,
              private store: Store<{ home: IHomeState, uiConfig: IUiConfigState, description: IDescriptionState }>) {

    config.max = 5;
    config.readonly = true;

    const selecDescription = (state: IAppState) => state.description;
    const selectDescription = createSelector(selecDescription, (state: IDescriptionState) => state.description)
    this.descriptionData$ = this.store.pipe(select(selectDescription));
  }

  openDialogWithMap() {
    let configDialog = {
      panelClass: 'map-wrapper',//add custom style
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
    // let descriptionId = '5f69268b-705e-4fb9-8147-722b4ec1d9da';
    this.store.dispatch(getDescription())
  }
}
