import { createSelector } from "reselect";

const selectBoardReducer = (state) => state.board;

export const selectIsBoardsLoading = createSelector(
  [selectBoardReducer],
  (data) => data.isBoardsLoading
);

export const selectBoards = createSelector(
  [selectBoardReducer],
  (data) => data.Boards
);

export const selectBoard = createSelector(
  [selectBoardReducer],
  (data) => data.board
);

export const selectIsBoardLoading = createSelector(
  [selectBoardReducer],
  (data) => data.isBoardLoading
);
