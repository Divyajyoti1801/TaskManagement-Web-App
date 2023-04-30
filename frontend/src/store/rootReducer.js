import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./User/user.reducer";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
