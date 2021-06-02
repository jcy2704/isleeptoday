import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import axios from 'axios';
import SwiperCore, {
  Navigation, EffectCoverflow, A11y,
} from 'swiper';
import PropTypes from 'prop-types';
import { Swiper } from 'swiper/react';
import ListingCard from '../components/ListingCard';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/effect-coverflow/effect-coverflow.scss';
import '../styles/Listings/listings.css';
import { getListings } from '../actions';

SwiperCore.use([Navigation, EffectCoverflow, A11y]);

const Listings = ({ listings, getAllListings }) => {
  useEffect(() => {
    axios.get('http://localhost:3001/api/v1/listings')
      .then(response => {
        getAllListings(response.data);
      });
  }, []);

  return (
    <Swiper
      className="w-100"
      navigation
      tag="section"
      wrapperTag="ul"
      effect="coverflow"
      coverflowEffect={{
        rotate: 10,
        slideShadows: false,
        stretch: 0,
        depth: 150,
        modifier: 4,
      }}
      centeredSlides
    >
      {listings.map(listing => <ListingCard key={listing.id} name={listing.name} />)}
    </Swiper>
  );
};

Listings.propTypes = {
  listings: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  getAllListings: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ listings: state.listings });

const mapDispatchToProps = dispatch => ({
  getAllListings: listings => dispatch(getListings(listings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Listings);
