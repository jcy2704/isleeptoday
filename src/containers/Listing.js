import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { getListings } from '../actions';

const Listing = ({ addListings, listings }) => {
  const getAllListings = () => {
    axios.get('http://localhost:3001/api/v1/listings')
      .then(response => {
        addListings(response.data);
      });
  };

  useEffect(() => {
    getAllListings();
  }, []);

  return (
    <>
      <h1 className="listing-title">Listings</h1>
      {listings.map(listing => <div key={listing.id}>{listing.name}</div>)}
    </>
  );
};

Listing.propTypes = {
  addListings: PropTypes.func.isRequired,
  listings: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

const mapStateToProps = state => ({ listings: state.listings });

const mapDispatchToProps = dispatch => ({
  addListings: listings => dispatch(getListings(listings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
