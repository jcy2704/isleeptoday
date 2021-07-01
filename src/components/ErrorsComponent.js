import React from 'react';
import PropTypes from 'prop-types';

const ErrorsComponent = ({ errors }) => (
  <div>
    <ul>
      {errors.map(error => <li key={error}>{error}</li>)}
    </ul>
  </div>
);

ErrorsComponent.propTypes = {
  errors: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

export default ErrorsComponent;
