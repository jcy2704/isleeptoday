/* eslint-disable max-len */
import React, { useEffect } from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Home from '../components/Home';
import Listing from '../components/Listing';
import Signup from '../containers/registrations/Signup';
import Login from '../containers/registrations/Login';
import Navigation from '../components/Navigation';
import { loginUser, logoutUser } from '../actions';

const Router = ({ session, login, logout }) => {
  const handleLogin = data => {
    login(data.user);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
  };

  const getLoginStatus = () => {
    if (localStorage.getItem('token')) {
      axios.get('http://localhost:3001/logged_in', { withCredentials: true, headers: { Authenticate: localStorage.token } })
        .then(response => {
          if (response.data.logged_in) {
            handleLogin(response.data);
          } else {
            handleLogout();
          }
        });
    }
  };

  useEffect(() => {
    getLoginStatus();
  }, []);

  return (
    <BrowserRouter>
      <Navigation user={session.user} loggedInStatus={session.isLoggedIn} handleLogout={handleLogout} />
      <Switch>
        <Route path="/" component={session.isLoggedIn ? Listing : Home} exact />
        <Route path="/login" render={() => <Login handleLogin={handleLogin} loggedInStatus={session.isLoggedIn} />} />
        <Route path="/signup" render={() => <Signup handleLogin={handleLogin} loggedInStatus={session.isLoggedIn} />} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

Router.propTypes = {
  session: PropTypes.oneOfType([PropTypes.object]).isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ session: state.session });

const mapDispatchToProps = dispatch => ({
  login: user => (dispatch(loginUser(user))),
  logout: () => (dispatch(logoutUser())),
});

export default connect(mapStateToProps, mapDispatchToProps)(Router);
