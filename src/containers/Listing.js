/* eslint-disable max-len */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { getListings } from '../actions';
import ListingCont from '../components/ListingCont';
import '../styles/Listings/listings.css';

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
      <section className="listing-sect d-flex justify-content-center">
        <div className="w-75">
          {listings.map(listing => <ListingCont key={listing.id} name={listing.name} description={listing.description} />)}
        </div>
      </section>
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
