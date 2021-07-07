import { createAction, props } from '@ngrx/store';

interface Action {
    type: string;
  }

export const setContent = createAction(
  'ToggleHomeContent',
  props<{ isMap: boolean;  }>()
);
export const setLanguage = createAction(
  'ToggleLanguage',
  props<{ language: string;  }>()
);
