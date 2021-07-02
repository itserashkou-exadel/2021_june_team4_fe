import {Component, Input, OnInit} from '@angular/core';
import { DialogComponent } from "../../../../shared/dialog/dialog/dialog.component";
import { MapComponent } from "../../../../shared/map/map.component";
import { MatDialog } from "@angular/material/dialog";
import { createSelector, Store, select} from "@ngrx/store";
import { IAppState, IDescriptionState, IDescription, IHomeState, IUiConfigState} from "../../../../shared/variables";
import { Observable } from "rxjs";
import { getDescription } from "../../../../core/store/actions/description.actions";

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})

export class DescriptionComponent implements OnInit {
  descriptionData$: Observable<IDescription>;
  marker:any;

  constructor(public dialog: MatDialog,
              private store: Store<{
                home: IHomeState,
                uiConfig: IUiConfigState,
                description: IDescriptionState }>) {

    const selecDescription = (state: IAppState) => state.description;
    const selectDescription = createSelector(selecDescription, (state: IDescriptionState) => state.description)
    this.descriptionData$ = this.store.pipe(select(selectDescription));

    this.marker = {
      markers:[
        { cords:[50.4501, 30.5234], text: 'This is Kyiv'},
        { cords:[49.2331, 28.4682], text: 'This is Vinnytsia'},
        // { cords:[48.5079, 32.2623], text: 'This is Kropyntytskyi'},
        // { cords:[46.4825, 30.7233], text: 'This is Odessa'},

      ],
      center: [49.2331, 28.4682],
      zoom: 13,
    }
  }

  openDialogWithMap(data: any) {//todo bp type

    let configDialog = {
      panelClass: 'map-wrapper',//add custom style
      width: '750px',
      height: '500px',
      data: {
        title: `Title for map, description:
         ${data.locations}`,
        component: MapComponent,
        data: data
      }
    };
    this.dialog.open( DialogComponent, configDialog );
  }

  ngOnInit () : void {
    this.store.dispatch(getDescription())
  }

}
