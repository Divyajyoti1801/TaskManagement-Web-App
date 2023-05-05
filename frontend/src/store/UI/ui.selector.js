import { createSelector } from "reselect";

const SelectUIReducer = (state) => state.ui;

export const selectChangeTheme = createSelector(
  [SelectUIReducer],
  (ui) => ui.changeTheme
);

export const selectSidebarToggle = createSelector(
  [SelectUIReducer],
  (ui) => ui.sidebarToggle
);

export const selectBoardFormToggle = createSelector(
  [SelectUIReducer],
  (ui) => ui.boardFormToggle
);
