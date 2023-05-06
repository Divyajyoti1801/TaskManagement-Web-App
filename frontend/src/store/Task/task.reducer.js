import TASK_ACTION_TYPE from "./task.types";

const INITIAL_STATE = {
  createTaskMessage: "",
  error: null,
};

const taskReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case TASK_ACTION_TYPE.CREATE_TASK_SUCCESS:
      return { ...state, createTaskMessage: payload };
    case TASK_ACTION_TYPE.CREATE_TASK_FAILED:
      return { ...state, error: payload };
    default:
      return state;
  }
};

export default taskReducer;
