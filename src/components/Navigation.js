import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

const Navigation = ({ loggedInStatus, handleLogout }) => {
  const history = useHistory();

  const handleClick = () => {
    axios.delete('http://localhost:3001/logout', { withCredentials: true })
      .then(() => {
        handleLogout();
        history.push('/');
      });
  };

  const isLoggedIn = () => {
    if (loggedInStatus) {
      return (
        <>
          <Link to="/logout" onClick={handleClick}>Logout</Link>
        </>
      );
    }

    return (
      <>
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
      </>
    );
  };

  return (
    <div>
      {isLoggedIn()}
    </div>
  );
};

Navigation.propTypes = {
  loggedInStatus: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Navigation;
