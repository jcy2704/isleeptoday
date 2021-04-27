import React, { useState, useEffect } from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import getLoginStatus from '../helpers/api_methods';
import App from '../components/App';
import Signup from '../components/registrations/Signup';

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

  useEffect(() => {
    getLoginStatus()
      .then(response => {
        if (response.data.logged_in) {
          handleLogin(response);
        } else {
          handleLogout();
        }
      });
  }, [isLogged]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/login" component={App} />
        <Route path="/signup" component={Signup} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
