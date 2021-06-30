import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { getDescription, requestDescription } from './actions/description.actions';
import { DescriptionService } from './description.service';
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
        mergeMap(() => this.descriptionService.getDescriptionRequest()
          .pipe(
            map(description => ({ type: 'requestDescription', data: description })
          ))
        ))

        // map(():any => {
        //   let res = this.descriptionService.getDescriptionRequest();
        //   // res.subscribe((data)=>{
        //   //   console.log('subscribe',data)
        //   // })
        //
        //    return requestDescription({
        //      data: res,
        //    })
        // }),
      )
  // )

  // newDiscounts$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(getDescription),
  //       map(() => {
  //         return requestDiscounts();
  //       })
  //     ));
  // loadDescription$ = this.actions$.ofType(descriptionActions['getDescription'], props).pipe(
  //   switchMap(() => {
  //     return this.descriptionService
  //       .getDescription(id)
  //       .pipe(
  //         map(description => new descriptionActions.LoadDescriptionSuccess(description)),
  //         catchError(error => of(new descriptionActions.LoadDescriptionFail(error)))
  //       );
  //   })
  // );
}
