import TASK_ACTION_TYPE from "./task.types";

const INITIAL_STATE = {
  createTaskMessage: "",
  updateTaskMessage: "",
  deleteTaskMessage: "",
  error: null,
  taskLoading: false,
  task: {},
};

const taskReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case TASK_ACTION_TYPE.CREATE_TASK_SUCCESS:
      return { ...state, createTaskMessage: payload };
    case TASK_ACTION_TYPE.CREATE_TASK_FAILED:
      return { ...state, error: payload };
    case TASK_ACTION_TYPE.SELECT_TASK_LOADING:
      return { ...state, taskLoading: true };
    case TASK_ACTION_TYPE.SELECT_TASK_SUCCESS:
      return { ...state, taskLoading: false, task: payload };
    case TASK_ACTION_TYPE.SELECT_TASK_FAILED:
      return { ...state, taskLoading: false, error: payload };
    case TASK_ACTION_TYPE.UPDATE_TASK_LOADING:
      return { ...state };
    case TASK_ACTION_TYPE.UPDATE_TASK_SUCCESS:
      return { ...state, updateTaskMessage: payload };
    case TASK_ACTION_TYPE.UPDATE_TASK_FAILED:
      return { ...state, error: payload };
    case TASK_ACTION_TYPE.DELETE_TASK_SUCCESS:
      return { ...state, deleteTaskMessage: payload, task: null };
    case TASK_ACTION_TYPE.DELETE_TASK_FAILED:
      return { ...state, error: payload };
    default:
      return state;
  }
};

export default taskReducer;
