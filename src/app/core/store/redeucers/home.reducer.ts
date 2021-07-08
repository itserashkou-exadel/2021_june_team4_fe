import { IHomeState, IDiscount } from '../../../shared/interfaces';

export const initialState: IHomeState = {
  user: 'UserName',
  discounts: [
    {
      id: 0,
      name: 'Very long discount name very long discount name',
      vendor: 'Discount vendor0',
      added: '2021-06-20T12:00:00',
      expired: '2021-07-20T12:00:00',
      location: 'Vitebsk',
      tag: 'tag',
      category: 'category',
      isActive: true,
      description:
        'Here is a short description Here is a short description Here is a short description Here is a short description',
      percent: 10,
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      coordinates: [[49.094, 28.981]]
    },
    {
      id: 0,
      name: 'Very long discount name very long discount name',
      vendor: 'Discount vendor0',
      added: '2021-06-20T12:00:00',
      expired: '2021-07-20T12:00:00',
      location: 'Vitebsk',
      tag: 'tag',
      category: 'category',
      isActive: true,
      description:
        ' Here is a short description Here is a short description',
      percent: 10,
      image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      coordinates: [[50.094, 26.981]]
    },
  ],
};

export function headReducer(state: IHomeState = initialState, action: any) {
  switch (action.type) {
    case 'sortDiscounts':
      const newState1 = sortState(state.discounts, action.sortType);
      return { ...state, discounts: newState1 };
    case 'requestDiscounts':
      return { ...state, discounts: action.data };
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

const sortState = (src: IDiscount[], sortFlag: string) => {
  switch (sortFlag) {
    case 'percent_down':
      const newState5 = src.slice().sort((a, b): number => {
        if (a.percent > b.percent) return -1;
        if (a.percent < b.percent) return 1;
        else return 0;
      });
      return newState5;

    case 'percent_up':
      const newState4 = src.slice().sort((a, b): number => {
        if (a.percent > b.percent) return 1;
        if (a.percent < b.percent) return -1;
        else return 0;
      });
      return newState4;

    case 'expire':
      const newState3 = src.slice().sort((a, b): number => {
        const endA = new Date(a.expired);
        const endB = new Date(b.expired);
        if (endA > endB) return -1;
        if (endA < endB) return 1;
        else return 0;
      });
      return newState3;

    case 'addition':
      const newState2 = src.slice().sort((a, b): number => {
        const endA = new Date(a.added);
        const endB = new Date(b.added);
        if (endA > endB) return -1;
        if (endA < endB) return 1;
        else return 0;
      });
      return newState2;

    case 'name':
      const newState1 = src.slice().sort((a, b): number => {
         if (a.name > b.name) return -1;
        if (a.name < b.name) return 1;
        else return 0;
      });
      return newState1;

    default:
      return src;
  }
};
