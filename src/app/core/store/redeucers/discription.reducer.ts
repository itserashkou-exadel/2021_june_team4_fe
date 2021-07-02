import { createReducer, on } from '@ngrx/store';
import {IDescription} from "../../../shared/variables";

export interface DescriptionState {
  description: IDescription | [];
}

export const initialState: DescriptionState = {
  description: {
    id: "b28349b5-0b39-45ee-bb3c-4f96c1abfe75",
    active: true,
    category: {id: 'hgdgfjrhg', name: 'Sport'},
    description: "string",
    name: "Default name",
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVe9r47bhQVcZJ4jEd4wQuYH0LsAz5qKOTBATYRG8c7C3waYKbB2Z1My-HtoY2nzv4XmY&usqp=CAU',
    endTime: "2021-06-20T12:00:00",
    startTime: '2021-06-20T12:00:00',
    percent: 25,
    promo: 'jdfhgjh',
    tags: [{name:'Yoga'}],
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
