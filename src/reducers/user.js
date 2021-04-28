import { LOGIN, LOGOUT, USER_ERRORS } from '../actions/index';

const initalState = {
  isLoggedIn: false,
  user: {},
};

const userReducer = (state = initalState, action) => {
  switch (action.type) {
    case LOGIN:
      return { isLoggedIn: true, user: action.user };
    case USER_ERRORS:
      return { ...state, errors: action.errors };
    case LOGOUT:
      return { isLoggedIn: false, user: {} };
    default:
      return state;
  }
};

export default userReducer;
