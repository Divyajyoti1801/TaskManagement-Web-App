/* USER REDUCER */
import USER_ACTION_TYPES from "./user.types";

const INITIAL_STATE = {
  user: {},
  isLoading: false,
  isAuthenticated: false,
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