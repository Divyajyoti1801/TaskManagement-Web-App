import { createSelector } from "reselect";

const SelectTaskReducer = (state) => state.task;

export const selectCreateTaskMessage = createSelector(
  [SelectTaskReducer],
  (data) => data.createTaskMessage
);

export const selectTaskLoading = createSelector(
  [SelectTaskReducer],
  (data) => data.taskLoading
);

export const selectTask = createSelector(
  [SelectTaskReducer],
  (data) => data.task
);
