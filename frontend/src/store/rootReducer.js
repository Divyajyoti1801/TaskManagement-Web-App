import { combineReducers } from "@reduxjs/toolkit";
import boardReducer from "./Boards/board.reducer";
import taskReducer from "./Task/task.reducer";
import UiReducer from "./UI/ui.reducer";
import userReducer from "./User/user.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  board: boardReducer,
  ui: UiReducer,
  task: taskReducer,
});

export default rootReducer;
