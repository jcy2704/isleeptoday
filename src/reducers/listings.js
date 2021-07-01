import { GET_LISTINGS, LISTING_ERRORS } from '../actions/index';

const listingReducer = (state = [], action) => {
  switch (action.type) {
    case GET_LISTINGS:
      return action.listings;
    case LISTING_ERRORS:
      return { ...state, errors: action.errors };
    default:
      return state;
  }
};

export default listingReducer;
