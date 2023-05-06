import UI_ACTION_TYPES from "./ui.types";

const INITIAL_STATE = {
  changeTheme: false,
  sidebarToggle: false,
  boardFormToggle: false,
  columnFormToggle: false,
  deleteBoardFormToggle: false,
  subtaskFormToggle: false,
  addTaskFormToggle: false,
};

const UiReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case UI_ACTION_TYPES.UI_THEME_MODE:
      return { ...state, changeTheme: payload };
    case UI_ACTION_TYPES.UI_SIDEBAR_TOGGLE:
      return { ...state, sidebarToggle: payload };
    case UI_ACTION_TYPES.UI_BOARD_FORM_TOGGLE:
      return { ...state, boardFormToggle: payload };
    case UI_ACTION_TYPES.UI_COLUMN_FORM_TOGGLE:
      return { ...state, columnFormToggle: payload };
    case UI_ACTION_TYPES.UI_DELETE_BOARD_FORM_TOGGLE:
      return { ...state, deleteBoardFormToggle: payload };
    case UI_ACTION_TYPES.UI_SUBTASK_FORM_TOGGLE:
      return { ...state, subtaskFormToggle: payload };
    case UI_ACTION_TYPES.UI_ADDTASK_FORM_TOGGLE:
      return { ...state, addTaskFormToggle: payload };
    default:
      return state;
  }
};

export default UiReducer;
