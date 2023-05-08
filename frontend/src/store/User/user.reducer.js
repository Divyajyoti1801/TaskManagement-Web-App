/* USER REDUCER */
import USER_ACTION_TYPES from "./user.types";

const INITIAL_STATE = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  isRegistered: false,
  registerMessage: "",
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.USER_LOGIN_START:
      return { ...state, isLoading: true, isAuthenticated: false };
    case USER_ACTION_TYPES.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: payload,
      };
    case USER_ACTION_TYPES.USER_LOGIN_FAILED: {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: payload,
      };
    }
    case USER_ACTION_TYPES.USER_REGISTER_START:
      return { ...state };
    case USER_ACTION_TYPES.USER_REGISTER_SUCCESS:
      return { ...state, isRegistered: true, registerMessage: payload };
    case USER_ACTION_TYPES.USER_REGISTER_FAILED:
      return {
        ...state,
        isRegistered: false,
        registerMessage: null,
        error: payload,
      };
    case USER_ACTION_TYPES.USER_LOGOUT_START:
      return { ...state, isLoading: true };
    case USER_ACTION_TYPES.USER_LOGOUT_SUCCESS:
      return { ...state, isLoading: false, isAuthenticated: false, user: null };
    case USER_ACTION_TYPES.USER_LOGOUT_FAILED:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};

export default userReducer;
