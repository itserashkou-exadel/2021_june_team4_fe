import { FormControl } from '@angular/forms';
import { IFilterState } from 'src/app/shared/interfaces';

export const initialState: IFilterState = {
  controlsValues: {
    locations: [
      {
        countryName: 'Belarus',
        cities: ['Minsk', 'Mogilev', 'Grodno', 'Gomel'],
      },
      { countryName: 'Ukraine', cities: ['Kyiv', 'Vinnytsia', 'Odesa'] },
    ],
    cathegories: ['Food', 'Fashion', 'Gadgets', 'Health '],
    tags: [
      'Apple',
      'Samsung',
      'Manicure',
      'Vocation',
      'Cinema',
      'Yoga',
      'Fitness',
      'Sushi',
      'Pizza',
    ],
  },
  formValues: {
    cathegory: ['Fashion'],
    cities: '',
    tags: '',
    vendors: new FormControl(),
  },
  chips: ['Yoga'],
};

export function filterReducer(state: IFilterState = initialState, action: any) {
  switch (action.type) {
    case 'addTag':
      return { ...state, chips: [...state.chips, action.tag] };
    case 'removeTag':
      return {
        ...state,
        chips: [...state.chips.filter((el: string) => el !== action.tag)],
      };
    default:
      return state;
  }
}
