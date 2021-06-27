import { createAction, props } from '@ngrx/store';
import { IDiscount, IHeadState, IAppState } from '../../../shared/variables';

interface Action {
    type: string;
  }

export const addDiscount = createAction(
  'addDiscount',
  props<{ newDiscount: IDiscount;  }>()
);