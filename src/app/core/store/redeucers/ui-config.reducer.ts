import { IAppLanguage } from 'src/app/shared/variables';

export const initialState: any = {
  homeIsMap: true,
  appLanguage: 'EN',
};

export function uiConfigReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case 'ToggleHomeContent': //ToggleHomeContent
      return { ...state, homeIsMap: action.isMap };
    default:
      return state;
  }
}
