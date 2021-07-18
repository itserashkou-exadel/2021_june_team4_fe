export const initialState: any = {
  notificationsUnread: [
    { nType: 'New promo received', nName: 'A some discount', nPromo: 'word' },
  ],
  notificationsRead :[]
};

export function notificationsReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case 'ClearNotifications':
      const curentUnread = state.notificationsUnread;
      return {...state, notificationsUnread : [], notificationsRead : [...state.notificationsRead, curentUnread]};
    case 'GetPromo':
      return state;
    case 'RequestPromo':
      return {
        ...state,
        notificationsUnread: [
          ...state.notificationsUnread,
          makeMessageGetPromo(action.data),
        ],
      };
    default:
      return state;
  }
}

const makeMessageGetPromo = (param: {
  promo: string;
  discountName: string;
}) => {
  return {
    nType: 'You have received a promo code',
    nName: param.discountName,
    nPromo: param.promo,
  };
};
