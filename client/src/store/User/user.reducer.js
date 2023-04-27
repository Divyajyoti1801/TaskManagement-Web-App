import USER_ACTION_TYPES from "./user.types";
const INITIAL_STATE = {
  loading: false,
  isAuthenticated: false,
  user: {},
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.USER_LOGIN_REQUEST:
    case USER_ACTION_TYPES.USER_REGISTER_REQUEST:
      return { ...state, loading: true, isAuthenticated: false };

    case USER_ACTION_TYPES.USER_LOGIN_SUCCESS:
    case USER_ACTION_TYPES.USER_REGISTER_SUCCESS:
      return { ...state, loading: false, isAuthenticated: true, user: payload };

    case USER_ACTION_TYPES.USER_LOGIN_FAILED:
    case USER_ACTION_TYPES.USER_REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: payload,
      };

    case USER_ACTION_TYPES.USER_LOGOUT_SUCCESS:
      return { loading: false, isAuthenticated: false, user: null };

    case USER_ACTION_TYPES.USER_LOGOUT_FAILED:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

export default userReducer;
