const initialState = {
  vendor: {vendorId: 'string'},
};

export function vendorReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case 'saveVendorId': 
      return { ...state, vendor: {vendorId: action.id} };
    default:
      return state;
  }
};