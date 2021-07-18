import {createAction, props} from '@ngrx/store';

interface Action {
  type: string;
}

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');

export const searchDiscount = createAction(
  'searchDiscount',
  props<{ searchText: string }>()
);
