import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from '../../../features/head/head.actions';
import { IHeadState } from '../../../shared/variables';
import { IAppState } from '../../../shared/variables';
import { IDiscount } from '../../../shared/variables';
import { Action } from 'rxjs/internal/scheduler/Action';

export const initialState : IHeadState= {
  user: 'UserName',
  discounts: [
    {
      id: 0,
      name: 'Very long discount name very long discount name',
      vendor: 'Discount vendor0',
      added: '21-06-2021',
      expired: '21-11-2021',
      location: 'Vitebsk',
      tag: 'tag',
      cathegory: 'cathegory',
      isActive: true,
      description: 'Here is a short description Here is a short description Here is a short description Here is a short description',
      percent: 10,
      image:'https://material.angular.io/assets/img/examples/shiba2.jpg'
    },
    {
      id: 1,
      name: 'DiscountDiscountDiscountDiscountDiscountDiscountDiscountDiscountDiscount',
      vendor: 'Vendor',
      added: '21-06-2021',
      expired: '21-11-2021',
      location: 'Kyiv',
      tag: 'tag',
      cathegory: 'cathegory',
      isActive: true,
      description: 'Best_product_everBest_product_everBest_product_everBest_product_everBest_prodedsf ffffffffffffffffffffffffffffffffffffffffffffffffffuct_everBest_product_everBest_product_ever ',
      percent: 10,
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
    },
    {
      id: 1,
      name: 'Discount',
      vendor: 'Vendor',
      added: '21-06-2021',
      expired: '21-11-2021',
      location: 'Kyiv',
      tag: 'tag',
      cathegory: 'cathegory',
      isActive: true,
      description: 'Best product ever ',
      percent: 10,
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
    },
    {
      id: 1,
      name: 'Discount',
      vendor: 'Vendor',
      added: '21-06-2021',
      expired: '21-11-2021',
      location: 'Kyiv',
      tag: 'tag',
      cathegory: 'cathegory',
      isActive: true,
      description: 'Best product ever ',
      percent: 10,
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
    },
    {
      id: 1,
      name: 'Discount',
      vendor: 'Vendor',
      added: '21-06-2021',
      expired: '21-11-2021',
      location: 'Kyiv',
      tag: 'tag',
      cathegory: 'cathegory',
      isActive: true,
      description: 'Best product ever ',
      percent: 10,
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
    },
    {
      id: 1,
      name: 'Discount',
      vendor: 'Vendor',
      added: '21-06-2021',
      expired: '21-11-2021',
      location: 'Kyiv',
      tag: 'tag',
      cathegory: 'cathegory',
      isActive: true,
      description: 'Best product ever ',
      percent: 10,
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
    },
    {
      id: 1,
      name: 'Discount',
      vendor: 'Vendor',
      added: '21-06-2021',
      expired: '21-11-2021',
      location: 'Kyiv',
      tag: 'tag',
      cathegory: 'cathegory',
      isActive: true,
      description: 'Best product ever ',
      percent: 10,
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
    },
    {
      id: 1,
      name: 'Discount',
      vendor: 'Vendor',
      added: '21-06-2021',
      expired: '21-11-2021',
      location: 'Kyiv',
      tag: 'tag',
      cathegory: 'cathegory',
      isActive: true,
      description: 'Best product ever ',
      percent: 10,
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg'
    },
  ],
};




export function headReducer(state: IHeadState  = initialState, action:any) {
  switch (action.type) {
    default:
        return state;
    }
}
// const _headReducer = createReducer(
//   initialState
//   // on(increment, (state) => state),
//   // on(decrement, (state) => state),
//   // on(reset, (state) => state)
// );




// export function headReducer(state: IHeadState | undefined, action: any) {
//   return _headReducer(state, action);
// }
