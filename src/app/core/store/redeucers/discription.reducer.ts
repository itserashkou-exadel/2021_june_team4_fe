import { createReducer, on } from '@ngrx/store';
import {IDescription} from "../../../shared/interfaces";

export interface DescriptionState {
  description: IDescription | [];
}

export const initialState: DescriptionState = {
  description: {
    id: "b28349b5-0b39-45ee-bb3c-4f96c1abfe75",
    active: true,
    category: {id: 'hgdgfjrhg', name: 'jhdfgjh'},
    description: "string",
    name: "NAme",
    img: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    endTime: "2021-06-20T12:00:00",
    startTime: '2021-06-20T12:00:00',
    percent: 25,
    promo: 'jdfhgjh',
    tags: {id:'jhdfgjhr', name:'jdfhgj'},
    vendor: "string",
    vendorLocations: []
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
