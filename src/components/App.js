import React, { useState, useEffect } from 'react';
import getLoginStatus from '../helpers/api_methods';

const App = () => {
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
      })
      .catch(error => console.log(error));
  }, [isLogged]);

  return (
    <div className="App" />
  );
};

export default App;
