import React, { useState, useEffect } from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import axios from 'axios';
import App from '../components/App';
import Signup from '../components/registrations/Signup';
import Login from '../components/registrations/Login';
import Navigation from '../components/Navigation';

const Router = () => {
  const [isLogged, setLoggedIn] = useState({
    isLoggedIn: false,
    user: {},
  });

  const handleLogin = data => {
    setLoggedIn({
      isLoggedIn: true,
      user: data.user,
    });
  };

  const handleLogout = () => {
    setLoggedIn({
      isLoggedIn: false,
      user: {},
    });
    localStorage.removeItem('token');
  };

  const getLoginStatus = () => {
    if (localStorage.getItem('token')) {
      axios.get('http://localhost:3001/logged_in', { withCredentials: true, headers: { Authenticate: localStorage.token } })
        .then(response => {
          if (response.data.logged_in) {
            handleLogin(response);
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
      <Navigation loggedInStatus={isLogged.isLoggedIn} handleLogout={handleLogout} />
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/login" render={() => <Login handleLogin={handleLogin} loggedInStatus={isLogged.isLoggedIn} />} />
        <Route path="/signup" render={() => <Signup handleLogin={handleLogin} loggedInStatus={isLogged.isLoggedIn} />} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
