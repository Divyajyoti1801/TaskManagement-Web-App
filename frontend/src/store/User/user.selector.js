/* USER SELECTOR */
import { createSelector } from "reselect";

const SelectUserReducer = (state) => state.user;

export const selectIsLoading = createSelector(
  [SelectUserReducer],
  (userData) => userData.isLoading
);
export const selectIsAuthenticated = createSelector(
  [SelectUserReducer],
  (userData) => userData.isAuthenticated
);

export const selectUser = createSelector(
  [SelectUserReducer],
  (userData) => userData.user
);
