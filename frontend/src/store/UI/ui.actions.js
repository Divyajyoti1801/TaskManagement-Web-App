import createReducer from "../../utils/reducer/CreateReducer";
import UI_ACTION_TYPES from "./ui.types";

export const changeTheme = (boolean) =>
  createReducer(UI_ACTION_TYPES.UI_THEME_MODE, boolean);

export const toggleSidebar = (boolean) =>
  createReducer(UI_ACTION_TYPES.UI_SIDEBAR_TOGGLE, boolean);

export const BoardFormToggle = (boolean) =>
  createReducer(UI_ACTION_TYPES.UI_BOARD_FORM_TOGGLE, boolean);

export const ColumnFormToggle = (boolean) =>
  createReducer(UI_ACTION_TYPES.UI_COLUMN_FORM_TOGGLE, boolean);

export const DeleteBoardFormToggle = (boolean) =>
  createReducer(UI_ACTION_TYPES.UI_DELETE_BOARD_FORM_TOGGLE, boolean);

export const SubtaskFormToggle = (boolean) =>
  createReducer(UI_ACTION_TYPES.UI_SUBTASK_FORM_TOGGLE, boolean);

export const AddtaskFormToggle = (boolean) =>
  createReducer(UI_ACTION_TYPES.UI_ADDTASK_FORM_TOGGLE, boolean);
