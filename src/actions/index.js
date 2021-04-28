export const LOGIN = 'LOGIN';
export const USER_ERRORS = 'USER_ERRORS';
export const LOGOUT = 'LOGOUT';

export const loginUser = user => ({ type: LOGIN, user });
export const userErrors = errors => ({ type: USER_ERRORS, errors });
export const logoutUser = () => ({ type: LOGOUT });
