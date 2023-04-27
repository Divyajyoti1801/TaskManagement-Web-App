import { createSelector } from "reselect";

const selectUserReducer = (state) => state.user;

export const selectIsLoading = createSelector(
  [selectUserReducer],
  (authData) => authData.loading
);

export const selectIsAuthenticated = createSelector(
  [selectUserReducer],
  (authDate) => authDate.isAuthenticated
);

export const selectUser = createSelector(
  [selectUserReducer],
  (authData) => authData.user
);
