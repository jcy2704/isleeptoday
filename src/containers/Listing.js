import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router';
import { getListings } from '../actions';

const Listing = ({ addListings, listings, loggedInStatus }) => {
  const getAllListings = () => {
    axios.get('http://localhost:3001/api/v1/listings')
      .then(response => {
        addListings(response.data);
      });
  };

  const history = useHistory();

  if (!loggedInStatus) {
    history.push('/login');
  }

  useEffect(() => {
    getAllListings();
  }, []);

  return (
    <>
      <div className="App">Listing</div>
      {listings.map(listing => <div key={listing.id}>{listing.name}</div>)}
    </>
  );
};

Listing.propTypes = {
  addListings: PropTypes.func.isRequired,
  listings: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  loggedInStatus: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({ listings: state.listings });

const mapDispatchToProps = dispatch => ({
  addListings: listings => dispatch(getListings(listings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
