import axios from "axios";
import createReducer from "../../utils/reducer/CreateReducer";
import BOARD_ACTION_TYPES from "./board.types";

export const AllBoards = async (dispatch) => {
  try {
    dispatch(createReducer(BOARD_ACTION_TYPES.FETCH_BOARDS_START));
    const { data } = await axios.get("/board/all", { withCredentials: true });
    dispatch(createReducer(BOARD_ACTION_TYPES.FETCH_BOARDS_SUCCESS, data));
  } catch (error) {
    dispatch(createReducer(BOARD_ACTION_TYPES.FETCH_BOARDS_FAILED, error));
  }
};

export const CreateBoard = (name, columns) => async (dispatch) => {
  try {
    const { data } = await axios.post("/board/new", {
      name,
      columns,
    });
    if (data.message) {
      dispatch(
        createReducer(BOARD_ACTION_TYPES.CREATE_BOARD_SUCCESS, data.message)
      );
      dispatch(AllBoards);
    }
  } catch (error) {
    dispatch(createReducer(BOARD_ACTION_TYPES.CREATE_BOARD_FAILED, error));
  }
};

export const OneBoard = (id) => async (dispatch) => {
  try {
    dispatch(createReducer(BOARD_ACTION_TYPES.LOAD_CURRENT_BOARD));
    const { data } = await axios.get(`/board/${id}`);
    dispatch(createReducer(BOARD_ACTION_TYPES.SET_CURRENT_BOARD, data));
  } catch (error) {
    dispatch(createReducer(BOARD_ACTION_TYPES.ERROR_CURRENT_BOARD, error));
  }
};

export const DeleteBoard = (id) => async (dispatch) => {
  try {
    dispatch(createReducer(BOARD_ACTION_TYPES.DELETE_BOARD_START));
    const { data } = await axios.delete(`/board/delete/${id}`);
    if (data.message) {
      dispatch(
        createReducer(BOARD_ACTION_TYPES.DELETE_BOARD_SUCCESS, data.message)
      );
      dispatch(AllBoards);
    }
  } catch (error) {
    dispatch(createReducer(BOARD_ACTION_TYPES.DELETE_BOARD_FAILED, error));
  }
};

export const CreateColumn = (bid, name) => async (dispatch) => {
  try {
    const { data } = await axios.post(`/column/new/${bid}`, {
      name,
    });
    if (data.message) {
      dispatch(BOARD_ACTION_TYPES.CREATE_COLUMN_SUCCESS);
      dispatch(AllBoards);
    }
  } catch (error) {
    dispatch(createReducer(BOARD_ACTION_TYPES.CREATE_COLUMN_FAILED, error));
  }
};

export const ClearBoard = (dispatch) => {
  dispatch(createReducer(BOARD_ACTION_TYPES.CLEAR_CURRENT_BOARD, null));
};
