import { createAction, props } from '@ngrx/store';
import { IDiscount } from '../../../shared/interfaces';


interface Action {
  type: string;
}

export const addChips = createAction(
  'addTag',
  props<{ tag: string}>()
);

export const removeChips = createAction(
    'removeTag',
    props<{ tag: string}>()
  );
  export const saveFormsValues = createAction(
    'removeTag',
    props<{ formsValue: any}>()
  );

