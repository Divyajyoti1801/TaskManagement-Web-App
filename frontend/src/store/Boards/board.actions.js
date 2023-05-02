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
