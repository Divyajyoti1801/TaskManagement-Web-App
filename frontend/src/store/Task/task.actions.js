import axios from "axios";
import createReducer from "../../utils/reducer/CreateReducer";
import { AllBoards } from "../Boards/board.actions";
import { AddtaskFormToggle } from "../UI/ui.actions";
import TASK_ACTION_TYPE from "./task.types";

export const CreateTask =
  (bid, title, description, status, subtasks) => async (dispatch) => {
    try {
      const { data } = await axios.post(`/task/new/${bid}`, {
        title,
        description,
        status,
        subtasks,
      });
      if (data.message) {
        dispatch(
          createReducer(TASK_ACTION_TYPE.CREATE_TASK_SUCCESS, data.message)
        );
        dispatch(AllBoards);
        dispatch(AddtaskFormToggle(false));
      }
    } catch (error) {
      dispatch(TASK_ACTION_TYPE.CREATE_TASK_FAILED, error);
    }
  };
