import { combineReducers } from "@reduxjs/toolkit";
import boardReducer from "./Boards/board.reducer";
import userReducer from "./User/user.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  board: boardReducer,
});

export default rootReducer;
