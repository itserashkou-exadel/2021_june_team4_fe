import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { FilterService } from '../../services/filter.service';
import { getControlsValues } from '../actions/filter.actions';

@Injectable()
export class FilterEffects {
  constructor(
    private actions$: Actions,
    private filterService: FilterService
  ) {}

  //requestFilteredDiscounts$ = createEffect

  newControlsValues$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getControlsValues),
      mergeMap(() =>
        this.filterService.requestRawData().pipe(
          map((data: any) => {
           // console.log(data);
            const processedData = {
              locations: this.filterService.handleCountries(data[0]),
              categories: this.filterService.handleCategories(data[1]),
              tags: this.filterService.handleTags(data[2]),
              vendors: this.filterService.handleVendors(data[3]),
            };
            return { type: 'requestControlsValues', data: processedData };
          })
        )
      )
    )
  );
}
