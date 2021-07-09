import {IUiConfigState} from "../../../shared/interfaces";

export const initialState: IUiConfigState = {
  homeIsMap: true,
  appLanguage: 'en',
};

export function uiConfigReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case 'ToggleHomeContent': //ToggleHomeContent
      return { ...state, homeIsMap: action.isMap };
    case 'ToggleLanguage':
      return { ...state, appLanguage: action.language };
    default:
      return state;
  }
}
