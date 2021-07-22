import { createReducer, on } from '@ngrx/store';
import { addSubscribe, removeSubscribe } from '../actions/profile.actions';
import { IProfileSubscription } from '../../../features/head/profile/profile/profile.component';

export const initialState = 'white';

export const _profileReducers = createReducer(
  initialState,
  on(addSubscribe, (state) => (state = 'green')),
  on(removeSubscribe, (state) => (state = 'red'))
);

export function profileReducers(state = initialState, action: any) {
  return _profileReducers(state, action);
}
