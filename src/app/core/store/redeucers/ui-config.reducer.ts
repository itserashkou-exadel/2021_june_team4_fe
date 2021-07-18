import { IUiConfigState } from '../../../shared/interfaces';

export const initialState: IUiConfigState = {
  searchIsActive: false,
  homeIsMap: true,
  appLanguage: 'en',
  requestConfig: {
    fiterRequestParams: '',
    sortValue: '',
  },
};

export function uiConfigReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case 'setSortValue':
      return {
        ...state,
        requestConfig: { ...state.requestConfig, sortValue: action.param },
      };
    case 'setFilterConfigRequestParam':
      return {
        ...state,
        requestConfig: {
          ...state.requestConfig,
          fiterRequestParams: action.param,
        },
      };
    case 'ToggleHomeContent': //ToggleHomeContent
      return { ...state, homeIsMap: action.isMap };
    case 'ToggleLanguage':
      return { ...state, appLanguage: action.language };
    default:
      return state;
  }
}
