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
    categories: [],
    city: '',
    vendors: [],
    chips: [],
  },
};

export function filterReducer(state: IFilterState = initialState, action: any) {
  switch (action.type) {
    case 'requestFilteredData':
      // console.log(action.data);
      return state;

    case 'getFilteredData':
      return state;

    case 'saveControls':
      return { ...state, formValues: action.values };

    case 'requestControlsValues':
      return { ...state, controlsValues: action.data };

    case 'getControls':
      return state;

    case 'addTag':
      if(!state.formValues.chips)return;
      if (
        state.formValues.chips.includes(action.tag) ||
        action.tag === 'none'
      ) {
        return state;
      }
      if (action.tag === 'resetSelectedTags') {
        return { ...state, formValues: { ...state.formValues, chips: [] } };
      }

      return {
        ...state,
        formValues: {
          ...state.formValues,
          chips: [...state.formValues.chips, action.tag],
        },
      };
    case 'removeTag':
      return {
        ...state,
        formValues: {
          ...state.formValues,
          chips: [
            ...state.formValues.chips.filter((el: string) => el !== action.tag),
          ],
        },
      };
    default:
      return state;
  }
}
