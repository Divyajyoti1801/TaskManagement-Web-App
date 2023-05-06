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

export const selectColumnFormToggle = createSelector(
  [SelectUIReducer],
  (ui) => ui.columnFormToggle
);

export const selectDeleteBoardFormToggle = createSelector(
  [SelectUIReducer],
  (ui) => ui.deleteBoardFormToggle
);

export const selectSubtaskFormToggle = createSelector(
  [SelectUIReducer],
  (ui) => ui.subtaskFormToggle
);

export const selectAddtaskFormToggle = createSelector(
  [SelectUIReducer],
  (ui) => ui.addTaskFormToggle
);
