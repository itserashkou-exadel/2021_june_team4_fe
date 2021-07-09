import { createSelector, Store } from '@ngrx/store';
import {
  IAppState,
  IFilterControls,
  IFilterState,
  ILocationsGroup,
} from 'src/app/shared/interfaces';

export const selectFilter = (state: IAppState) => state.filter;
export const selectChips = createSelector(
  selectFilter,
  (state: IFilterState) => state.chips
);

export const selectControls = createSelector(
  selectFilter,
  (state: IFilterState) => state.controlsValues
);
export const selectControlsLocations = createSelector(
  selectControls,
  (state: IFilterControls) => state.locations
);
export const selectControlsCathegories = createSelector(
  selectControls,
  (state: IFilterControls) => state.categories
);
export const selectControlsTags = createSelector(
  selectControls,
  (state: IFilterControls) => state.tags
);
export const selectControlsVendors = createSelector(
  selectControls,
  (state: IFilterControls) => state.vendors
);
