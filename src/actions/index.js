export const LOGIN = 'LOGIN';
export const USER_ERRORS = 'USER_ERRORS';
export const LOGOUT = 'LOGOUT';
export const GET_LISTINGS = 'GET_LISTINGS';
export const LISTING_ERRORS = 'LISTING_ERRORS';
export const GET_USER = 'GET_USER';

export const loginUser = user => ({ type: LOGIN, user });
export const userErrors = errors => ({ type: USER_ERRORS, errors });
export const logoutUser = () => ({ type: LOGOUT });
export const getListings = listings => ({ type: GET_LISTINGS, listings });
export const getUser = user => ({ type: GET_USER, user });
export const addListingErrors = errors => ({ type: LISTING_ERRORS, errors });
