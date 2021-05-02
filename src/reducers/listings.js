import { GET_LISTINGS } from '../actions/index';

const listingReducer = (state = [], action) => {
  switch (action.type) {
    case GET_LISTINGS:
      return action.listings;
    default:
      return state;
  }
};

export default listingReducer;
