import axios from "axios";
import createReducer from "../../utils/reducer/CreateReducer";
import BOARD_ACTION_TYPES from "./board.types";

export const AllBoards = async (dispatch) => {
  try {
    dispatch(createReducer(BOARD_ACTION_TYPES.FETCH_BOARDS_START));
    const { data } = await axios.get("/board/all");
    dispatch(createReducer(BOARD_ACTION_TYPES.FETCH_BOARDS_SUCCESS, data));
  } catch (error) {
    dispatch(createReducer(BOARD_ACTION_TYPES.FETCH_BOARDS_FAILED, error));
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
    dispatch(BOARD_ACTION_TYPES.DELETE_BOARD_START);
    await axios.delete(`/board/delete/:${id}`);
    dispatch(BOARD_ACTION_TYPES.DELETE_BOARD_SUCCESS);
  } catch (error) {
    dispatch(BOARD_ACTION_TYPES.DELETE_BOARD_FAILED, error);
  }
};
