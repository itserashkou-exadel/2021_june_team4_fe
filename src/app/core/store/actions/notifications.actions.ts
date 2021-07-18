import { createAction, props } from '@ngrx/store';

interface Action {
  type: string;
}

export const clearNotifications = createAction('ClearNotifications');

export const getPromo = createAction('GetPromo', props<{ id: string }>());

export const requestPromo = createAction(
  'RequestPromo',
  props<{ data: string }>()
);

export const addNewNotification = createAction(
  'AddNewNotification',
  props<{ notification: any }>()
);
