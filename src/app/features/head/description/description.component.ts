import {Component, Input, OnInit} from '@angular/core';
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
import {getDescription, toggleFavourite} from "../../../core/store/actions/description.actions";
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
  markers: any;

  constructor(private activateRoute: ActivatedRoute,
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

  ngOnInit(): void {
    this.store.dispatch(getDescription({id: this.id}))
  }

  addToFavorite(data:IDescription) {
    let userId = 'e1deda2f-d976-4022-9fee-ec9cae0b1cf4';//todo get live id
    console.log('favorite', userId, data.id);
    this.store.dispatch(toggleFavourite({userId: userId, discountId: data.id}))
  }

}
