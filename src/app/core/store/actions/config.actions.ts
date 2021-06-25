import { createAction, props } from '@ngrx/store';

interface Action {
    type: string;
  }

export const setContent = createAction(
  'ToggleHomeContent',
  props<{ isMap: boolean;  }>()
);
