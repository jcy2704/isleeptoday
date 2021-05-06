import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Listings/listings.css';

const ListingCont = ({ name }) => (
  <>
    <div className="listing-cont position-relative mb-5">
      <div>
        <img className="w-100 listing-img" src="https://via.placeholder.com/500x800" alt="placeholder" />
      </div>

      <div className="listing-info position-absolute w-100 p-2">
        <h4>{name}</h4>
      </div>
    </div>
  </>
);

ListingCont.propTypes = {
  name: PropTypes.string.isRequired,
  // user: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ListingCont;
