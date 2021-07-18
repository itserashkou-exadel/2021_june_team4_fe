import { createAction, props } from '@ngrx/store';

export const SaveVendorId = createAction(
  'saveVendorId',
  props<{ id: string }>()
);

