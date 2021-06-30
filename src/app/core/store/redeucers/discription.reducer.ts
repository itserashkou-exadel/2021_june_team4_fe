import { createReducer, on } from '@ngrx/store';
import {IDescription} from "../../../shared/variables";

export interface DescriptionState {
  description: IDescription | [];
}

export const initialState: DescriptionState = {
  description: {
    id: "hjfkjdhg",
    active: true,
    category: {id: 'hgdgfjrhg', name: 'jhdfgjh'},
    description: "string",
    name: "NAme",
    img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    endTime: "22-32-33",
    startTime: '22-32-33',
    percent: 25,
    promo: 'jdfhgjh',
    tags: {id:'jhdfgjhr', name:'jdfhgj'},
    vendor: "string",
    vendorLocation: {}
  }
};

export function descriptionReducer(state: DescriptionState = initialState, action: any) {
  switch (action.type) {
    case 'getDescription':
      return state;
    case 'requestDescription':
      console.log('desc', action.data)
      return {
        ...state,
        description: action.data
      };
    default:
      return state;
  }
}
