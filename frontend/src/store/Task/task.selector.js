import { createSelector } from "reselect";

const SelectTaskReducer = (state) => state.task;

export const selectCreateTaskMessage = createSelector(
  [SelectTaskReducer],
  (data) => data.createTaskMessage
);
