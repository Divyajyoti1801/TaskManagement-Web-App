import axios from "axios";
import { API_URL } from "../../utils/API.utils";
import createAction from "../../utils/reducer.utils";
import USER_ACTION_TYPES from "./user.types";

export const LoginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(createAction(USER_ACTION_TYPES.USER_LOGIN_REQUEST));
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.post(
      `${API_URL}/user/login`,
      { email, password },
      config
    );
    dispatch(
      createAction(USER_ACTION_TYPES.USER_LOGIN_SUCCESS, data.data.user)
    );
  } catch (err) {
    dispatch(createAction(USER_ACTION_TYPES.USER_LOGIN_FAILED, err));
  }
};

export const RegisterUser = (userData) => async (dispatch) => {
  try {
    dispatch(createAction(USER_ACTION_TYPES.USER_REGISTER_REQUEST));

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const data = await axios.post(`${API_URL}/user/register`, userData, config);

    dispatch(createAction(USER_ACTION_TYPES.USER_REGISTER_SUCCESS, data));
  } catch (err) {
    dispatch(createAction(USER_ACTION_TYPES.USER_REGISTER_FAILED, err));
  }
};

export const LogoutUser = async (dispatch) => {
  try {
    await axios.get(`${API_URL}/user/logout`);
    dispatch(createAction(USER_ACTION_TYPES.USER_LOGOUT_SUCCESS));
  } catch (err) {
    dispatch(createAction(USER_ACTION_TYPES.USER_LOGOUT_FAILED, err));
  }
};
