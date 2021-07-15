import { createAction, props } from '@ngrx/store';

interface Action {
  type: string;
}

export const getPromo = createAction(
  'GetPromo',
  props<{ id: string }>()
);

export const getDescription = createAction(
  'getDescription',
  props<{ id: string }>()
);

export const requestDescription = createAction(
  'requestDescription',
  props<{ data: any }>()
);

export const toggleFavourite = createAction(
  'toggleFavourite',
  props<{ userId: string, discountId: string}>()
);
