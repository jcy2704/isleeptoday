import { combineReducers } from 'redux';
import session from './session';
import listings from './listings';
import user from './user';

export default combineReducers({ session, listings, user });
