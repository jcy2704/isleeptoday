import React from 'react';
import PropTypes from 'prop-types';
import { SwiperSlide } from 'swiper/react';
import '../styles/Listings/listings.css';

const ListingCard = ({ name }) => (
  <>
    <SwiperSlide tag="li">
      <div className="d-flex justify-content-center align-items-center h-100vh">
        <div className="w-75">
          <div>
            <img className="w-100" src="https://via.placeholder.com/500x800" alt="placeholder" />
          </div>

          <div className="listing-info position-absolute w-100 p-2">
            <h4>{name}</h4>
          </div>
        </div>
      </div>
    </SwiperSlide>
  </>
);

ListingCard.propTypes = {
  name: PropTypes.string.isRequired,
  // user: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ListingCard;
