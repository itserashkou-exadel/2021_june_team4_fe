import { createAction, props } from '@ngrx/store';

// export interface Description {
//   id: string;
//   active: boolean;
//   category: any;
//   description: string;
//   name: string;
//   img: string;
//   endTime: string;
//   startTime: string;
//   percent: number;
//   promo: string;
//   tags: any;
//   vendor: string;
//   vendorLocation: any;
// }

export const getDescription = createAction(
  'getDescription',
  props<{ id: string }>()
);

export const requestDescription = createAction(
  'requestDescription',
  props<{ data: any }>()
);
