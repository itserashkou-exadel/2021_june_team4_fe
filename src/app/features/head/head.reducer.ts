import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './head.actions';
import { IHeadState } from './head.variables';
import { IAppState } from './head.variables';

export const initialState = { currentLocation: 'Vinnytsia' };

const _headReducer = createReducer(
  initialState
  // on(increment, (state) => state),
  // on(decrement, (state) => state),
  // on(reset, (state) => state)
);

export function headReducer(state: IHeadState | undefined, action: any) {
  return _headReducer(state, action);
}
