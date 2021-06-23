import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './head.actions';
import { IHeadState } from '../../shared/variables';
import { IAppState } from '../../shared/variables';
import { IDiscount } from '../../shared/variables';

export const initialState = {
  discounts: [
    {
      id: 0,
      name: 'Huawei',
      vendor: 'Discount vendor0',
      added: '21-06-2021',
      expired: '21-11-2021',
      location: 'kharkiv',
      tag: 'tag',
      cathegory: 'cathegory',
      isActive: true,
      description: 'string',
      percent: 10,
    },
    {
      id: 1,
      name: 'Discount',
      vendor: 'Discount vendor',
      added: '21-06-2021',
      expired: '21-11-2021',
      location: 'Kyiv',
      tag: 'tag',
      cathegory: 'cathegory',
      isActive: true,
      description: 'string',
      percent: 10,
    },
  ],
};

const _headReducer = createReducer(
  initialState
  // on(increment, (state) => state),
  // on(decrement, (state) => state),
  // on(reset, (state) => state)
);

export function headReducer(state: IHeadState | undefined, action: any) {
  return _headReducer(state, action);
}
