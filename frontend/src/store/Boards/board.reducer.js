import BOARD_ACTION_TYPES from "./board.types";

const INITIAL_STATE = {
  isBoardsLoading: false,
  isBoardLoading: false,
  Boards: [],
  board: {},
  error: null,
};

const boardReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case BOARD_ACTION_TYPES.FETCH_BOARDS_START:
      return { ...state, isBoardsLoading: true };
    case BOARD_ACTION_TYPES.FETCH_BOARDS_SUCCESS:
      return { ...state, isBoardsLoading: false, Boards: payload };
    case BOARD_ACTION_TYPES.FETCH_BOARDS_FAILED:
      return {
        ...state,
        error: payload,
      };
    case BOARD_ACTION_TYPES.LOAD_CURRENT_BOARD:
      return { ...state, isBoardLoading: true };
    case BOARD_ACTION_TYPES.SET_CURRENT_BOARD:
      return { ...state, isBoardLoading: false, board: payload };
    case BOARD_ACTION_TYPES.ERROR_CURRENT_BOARD:
      return { ...state, error: payload };
    case BOARD_ACTION_TYPES.DELETE_BOARD_START:
      return state;
    case BOARD_ACTION_TYPES.DELETE_BOARD_SUCCESS:
      return { ...state, board: null };
    case BOARD_ACTION_TYPES.DELETE_BOARD_FAILED:
      return { ...state, error: payload };
    default:
      return state;
  }
};

export default boardReducer;
