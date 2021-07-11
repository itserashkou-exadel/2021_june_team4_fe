import { FormControl } from '@angular/forms';
import { IFilterState } from 'src/app/shared/interfaces';

export const initialState: IFilterState = {
  controlsValues: {
    locations: [
      {
        countryName: 'Belarus',
        cities: ['Minsk', 'Mogilev', 'Grodno', 'Gomel'],
      },
      {
        countryName: 'Ukraine',
        cities: ['Kyiv', 'Vinnytsia', 'Odesa', 'Kharkiv'],
      },
    ],
    categories: ['Food', 'Fashion', 'Gadgets', 'Health '],
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
    vendors: [
      'Vylka',
      'Pizzas without borders',
      'Fitness assembly',
      'Stara poshta',
    ],
  },

  formValues: {
    categories: ['Sport'],
    city: 'Minsk',
    vendors: ['Flow'],
  },
  chips: ['Yoga'],
};

export function filterReducer(state: IFilterState = initialState, action: any) {
  switch (action.type) {
    case 'saveControls':
     // console.log(action.values);
      return { ...state, formValues: action.values };

    case 'requestControlsValues':
      return { ...state, controlsValues: action.data };

    case 'getControls':
      return state;

    case 'addTag':
      if (state.chips.includes(action.tag) || action.tag === 'None') {
        return state;
      }
      if(action.tag === 'resetSelectedTags'){
        return { ...state, chips: [] };
      }

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
