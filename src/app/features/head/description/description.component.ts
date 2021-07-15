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
import { getDescription, addToFavourite, removeFromFavourite } from "../../../core/store/actions/description.actions";
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})

export class DescriptionComponent implements OnInit {
  descriptionData$: Observable<IDescription>;
  markers$:any;
  discountId:string;

  constructor(private activateRoute: ActivatedRoute,
              private store: Store<IAppState>) {
    this.discountId = activateRoute.snapshot.params['id'];

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
    this.store.dispatch(getDescription({id: this.discountId}))
  }

  addToFavorite(data:IDescription) {
    if (data.favorite) {
      this.store.dispatch(removeFromFavourite({discountId: data.id}))
    } else {
      this.store.dispatch(addToFavourite({discountId: data.id}))
    }

  }

}
