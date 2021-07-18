import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { getPromo } from '../actions/notifications.actions';
import { NotificationsService } from '../../services/notifications.service';


@Injectable()
export class NotificationsEffects {
  constructor(private actions$: Actions,
    private notificationsService : NotificationsService
    ) {}

  newDiscounts$ = createEffect(
    ()=> this.actions$.pipe(
      ofType(getPromo),
      mergeMap((action)=> this.notificationsService.requestPromo(action.id)
      .pipe(
         map( (data: any) => {
           const newData =  {promo : data.promo, discountName: data.name };
          return { type: 'RequestPromo',data: newData};
          }))
    )
  ))

}
