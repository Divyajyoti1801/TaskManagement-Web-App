/* USER ACTIONS  */
import axios from "axios";
import createReducer from "../../utils/reducer/CreateReducer";
import { ClearBoard } from "../Boards/board.actions";
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
      dispatch(ClearBoard);
    }
  } catch (err) {
    dispatch(createReducer(USER_ACTION_TYPES.USER_LOGOUT_FAILED, err));
  }
};

export const registerUser =
  (name, email, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch(createReducer(USER_ACTION_TYPES.USER_REGISTER_START));
      const data = await axios.post("/user/register", {
        name,
        email,
        password,
        confirmPassword,
      });
      dispatch(
        createReducer(USER_ACTION_TYPES.USER_REGISTER_SUCCESS, data.message)
      );
    } catch (error) {
      dispatch(createReducer(USER_ACTION_TYPES.USER_REGISTER_FAILED, error));
    }
  };
