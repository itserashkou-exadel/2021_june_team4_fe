import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {getDescription, requestDescription, toggleFavourite} from '../actions/description.actions';
import { DescriptionService } from '../../services/description.service';
import { map, mergeMap } from "rxjs/operators";

@Injectable()
export class DescriptionEffects {
  constructor(
    private actions$: Actions,
    private descriptionService: DescriptionService
  ) {}

  descriptionData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(getDescription),
        mergeMap((id) => this.descriptionService.getDescriptionRequest(id)
          .pipe(
            map( (data: any) => {
              const description = this.descriptionService.handleRemoteDescription(data)
              return { type: 'requestDescription', data: description};
            })
          )
      ))
    )

  toggleFavorite$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(toggleFavourite),
        mergeMap((props) => this.descriptionService.toggleFavoriteRequest({
          userId: props.userId,
          discountId: props.discountId})
          .pipe(
            map( (data: any) => {
              console.log('FAVORITEdata', data)//todo check request and update data in store
              // const description = this.descriptionService.handleRemoteDescription(data)
              return { type: 'requestDescription', data: data};
            })
          )
        ))
  )
}
