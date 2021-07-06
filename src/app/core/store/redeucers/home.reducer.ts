import { IHomeState } from '../../../shared/interfaces';
import { HomeService } from '../../services/home/home.service';

export const initialState: IHomeState = {
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
      category: 'category',
      isActive: true,
      description:
        'Here is a short description Here is a short description Here is a short description Here is a short description',
      percent: 10,
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    },
    {
      id: 1,
      name: 'DiscountDiscountDiscountDiscountDiscountDiscountDiscountDiscountDiscount',
      vendor: 'Vendor',
      added: '21-06-2021',
      expired: '21-11-2021',
      location: 'Kyiv',
      tag: 'tag',
      category: 'category',
      isActive: true,
      description:
        'Best_product_everBest_product_everBest_product_everBest_product_everBest_prodedsf ffffffffffffffffffffffffffffffffffffffffffffffffffuct_everBest_product_everBest_product_ever ',
      percent: 10,
      image: 'https://www.any.do/images/logo.png',
    },
    {
      id: 2,
      name: 'Discount',
      vendor: 'Vendor',
      added: '21-06-2021',
      expired: '21-11-2021',
      location: 'Kyiv',
      tag: 'tag',
      category: 'category',
      isActive: true,
      description: 'Best product ever ',
      percent: 10,
      image:
        'https://www.estradasurfing.co.nz/wp-content/uploads/2017/12/rambo-estrada-surf-and-ocean-photography-lightroom-preset-pack-sq.jpg',
    },
    {
      id: 3,
      name: 'Discount',
      vendor: 'Vendor',
      added: '21-06-2021',
      expired: '21-11-2021',
      location: 'Kyiv',
      tag: 'tag',
      category: 'category',
      isActive: true,
      description: 'Best product ever ',
      percent: 10,
      image:
        'data:image/jpeg;base64,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',
    },
    {
      id: 1,
      name: 'Discount',
      vendor: 'Vendor',
      added: '21-06-2021',
      expired: '21-11-2021',
      location: 'Kyiv',
      tag: 'tag',
      category: 'category',
      isActive: true,
      description: 'Best product ever ',
      percent: 10,
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    },
    {
      id: 1,
      name: 'Discount',
      vendor: 'Vendor',
      added: '21-06-2021',
      expired: '21-11-2021',
      location: 'Kyiv',
      tag: 'tag',
      category: 'category',
      isActive: true,
      description: 'Best product ever ',
      percent: 10,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Minecraft_cube.svg/1200px-Minecraft_cube.svg.png',
    },
    {
      id: 1,
      name: 'Discount',
      vendor: 'Vendor',
      added: '21-06-2021',
      expired: '21-11-2021',
      location: 'Kyiv',
      tag: 'tag',
      category: 'category',
      isActive: true,
      description: 'Best product ever ',
      percent: 10,
      image: 'https://images-na.ssl-images-amazon.com/images/I/41gAZdQUyZL.jpg',
    },
    {
      id: 1,
      name: 'Discount',
      vendor: 'Vendor',
      added: '21-06-2021',
      expired: '21-11-2021',
      location: 'Kyiv',
      tag: 'tag',
      category: 'category',
      isActive: true,
      description: 'Best product ever ',
      percent: 10,
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    },
  ],
};

export function headReducer(state: IHomeState = initialState, action: any) {
  switch (action.type) {
    case 'requestDiscounts':
      return {...state ,  discounts : action.data};
    case 'getNewDiscounts':
      return state;
    case 'addDiscount':
      const newState = {
        ...state,
        ...{ discounts: [...state.discounts, action.newDiscount] },
      };
      return newState;
    default:
      return state;
  }
}
