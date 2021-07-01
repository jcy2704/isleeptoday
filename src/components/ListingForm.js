import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addListingErrors } from '../actions';
import ErrorsComponent from './ErrorsComponent';

const ListingForm = ({ addErrors, listing }) => {
  const [listingInfo, setListingInfo] = useState({
    name: '',
    description: '',
  });

  const history = useHistory();

  const {
    name, description,
  } = listingInfo;

  const handleChange = event => {
    const { name, value } = event.target;

    setListingInfo({
      ...listingInfo,
      [name]: value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    const formdata = new FormData();

    formdata.set('listing[name]', name);
    formdata.set('listing[description]', description);
    formdata.append('listing[image]', event.target[2].files[0]);

    axios.post('http://localhost:3001/api/v1/listings', formdata, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } }).then(() => {
      history.push('/');
    })
      .catch(error => {
        addErrors(error.response.data.errors);
      });
  };

  return (
    <>
      <div className="login-cont position-relative">
        <div className="ls-form position-absolute d-flex p-5 justify-content-center w-100 flex-column">
          <h1 className="login-title text-center mb-4">Add Listing</h1>

          <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
            <input id="loginInput" className="input w-100 mb-3 px-4 py-2" placeholder="Name" type="text" value={name} name="name" onChange={handleChange} />
            <input placeholder="Description" className="input w-100 mb-4 px-4 py-2" type="text" name="description" value={description} onChange={handleChange} />
            <input type="file" name="image" />
            <button className="login-btn px-3 py-1 w-50 mb-2" type="submit">Add Listing</button>
          </form>
          <div>
            {
              listing.errors ? <ErrorsComponent errors={listing.errors} /> : null
            }
          </div>
        </div>
      </div>
    </>
  );
};

ListingForm.propTypes = {
  addErrors: PropTypes.func.isRequired,
  listing: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapStateToProps = state => ({ listing: state.listings });

const mapDispatchToProps = dispatch => ({
  addErrors: errors => (dispatch(addListingErrors(errors))),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListingForm);
