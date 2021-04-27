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
  };

  const getLoginStatus = () => {
    axios.get('http://localhost:3001/logged_in', { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          handleLogin(response);
        } else {
          handleLogout();
        }
      });
  };

  useEffect(() => {
    getLoginStatus();
  }, [isLogged]);

  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
