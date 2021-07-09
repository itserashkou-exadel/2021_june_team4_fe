import {Component, Input, OnInit} from '@angular/core';
import { DialogComponent } from "../../../shared/dialog/dialog/dialog.component";
import { MapComponent } from "../../../shared/map/map.component";
import { MatDialog } from "@angular/material/dialog";
import { createSelector, Store, select} from "@ngrx/store";
import {
  IAppState,
  IDescriptionState,
  IDescription,
  IHomeState,
  IUiConfigState,
  IMapMarker
} from "../../../shared/interfaces";
import { Observable } from "rxjs";
import { getDescription } from "../../../core/store/actions/description.actions";
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})

export class DescriptionComponent implements OnInit {
  descriptionData$: Observable<IDescription>;
  markers$:any;
  id:string;
  isFavorite = false;
  markers: any;

  constructor(private activateRoute: ActivatedRoute,
              public dialog: MatDialog,
              private store: Store<IAppState>) {
    this.id = activateRoute.snapshot.params['id'];

    const selecDescription = (state: IAppState) => state.description;
    const selectDescription = createSelector(selecDescription, (state: any) => state.description)
    this.descriptionData$ = this.store.pipe(select(selectDescription));
    const selectMarkers = createSelector(selecDescription, (state) =>
      ([{cords: state.description.vendorLocations.map((el)=>[el.latitude, el.longitude]),
      text: `${state.description.description}`}])
    );

// let m =this.store.select(selectMarkers).subscribe((data)=>  console.log(data));
    // this.markers$ = this.store.select(selectMarkers).subscribe((data)=>  console.log(data));
  // this.markers = [...this.markers, m]
    this.markers$ = [
      { cords:[[50.4501, 30.5234]], text: 'This is Kyiv'},
    ]
  }

  // openDialogWithMap(data: any) {//todo bp type
  //
  //   let configDialog = {
  //     panelClass: 'map-wrapper',//add custom style
  //     width: '750px',
  //     height: '500px',
  //     data: {
  //       title: `Title for map, description:
  //        ${data}`,
  //       component: MapComponent,
  //       data: data
  //     }
  //   };
  //   this.dialog.open( DialogComponent, configDialog );
  // }

  ngOnInit(): void {
    this.store.dispatch(getDescription({id: this.id}))
  }

  addToFavorite() {
    this.isFavorite = !this.isFavorite;
  }

}
