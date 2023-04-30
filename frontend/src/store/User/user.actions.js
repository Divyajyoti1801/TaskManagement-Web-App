/* USER ACTIONS  */
import axios from "axios";
import createReducer from "../../utils/reducer/CreateReducer";
import USER_ACTION_TYPES from "./user.types";

export const LoginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(createReducer(USER_ACTION_TYPES.USER_LOGIN_START));
    const { data } = await axios.post("/user/login", { email, password });
    dispatch(createReducer(USER_ACTION_TYPES.USER_LOGIN_SUCCESS, data.user));
  } catch (error) {
    dispatch(createReducer(USER_ACTION_TYPES.USER_LOGOUT_FAILED, error));
  }
};

export const LogoutUser = async (dispatch) => {
  try {
    dispatch(createReducer(USER_ACTION_TYPES.USER_LOGOUT_START));
    const { data } = await axios.get("/user/logout");
    if (data.message) {
      dispatch(createReducer(USER_ACTION_TYPES.USER_LOGOUT_SUCCESS));
    }
  } catch (err) {
    dispatch(createReducer(USER_ACTION_TYPES.USER_LOGOUT_FAILED, err));
  }
};
