export const initialState: any = {
  homeIsMap: true,
};

export function configReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case 'ToggleHomeContent':
      return { ...state, homeIsMap: action.isMap };
    default:
      return state;
  }
}
