import { createAction, props } from '@ngrx/store';
import { IDiscount, ILocationsGroup } from '../../../shared/interfaces';

interface Action {
  type: string;
}

export const getFilteredData = createAction('getFilteredData', props<{data: any}>());

export const requestFilteredData = createAction(
  'requestFilteredData',
  props<{ data: any }>()
);

export const getControlsValues = createAction('getControls');

export const requestControlsValues = createAction(
  'requestControls',
  props<{ data: ILocationsGroup }>()
);

export const addChips = createAction('addTag', props<{ tag: string }>());

export const removeChips = createAction('removeTag', props<{ tag: string }>());

export const saveFormsValues = createAction(
  'saveControls',
  props<{ values: any }>()
);
