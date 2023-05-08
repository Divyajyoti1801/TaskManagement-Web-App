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

export const selectUpdateTaskMessage = createSelector(
  [SelectTaskReducer],
  (data) => data.updateTaskMessage
);

export const selectDeleteTaskMessage = createSelector(
  [SelectTaskReducer],
  (data) => data.deleteTaskMessage
);
