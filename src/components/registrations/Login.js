import axios from 'axios';
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Signup = ({ handleLogin }) => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    errors: '',
  });

  const history = useHistory();

  const {
    username, password,
  } = userInfo;

  const handleChange = event => {
    const { name, value } = event.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const user = {
      username, password,
    };

    axios.post('http://localhost:3001/login', { user }, { withCredentials: true }).then(response => {
      if (response.data.logged_in) {
        handleLogin(response.data);
        history.push('/');
      } else {
        setUserInfo({
          errors: response.data.errors,
        });
      }
    });
  };

  const handleErrors = () => (
    <div>
      <ul>
        {userInfo.errors.map(error => <li key={error}>{error}</li>)}
      </ul>
    </div>
  );

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input id="loginInput" placeholder="Username" type="text" value={username} name="username" onChange={handleChange} />
        <input placeholder="Password" type="password" name="password" value={password} onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      <div>
        <Link to="/signup">Sign Up</Link>
      </div>
      <div>
        {
          userInfo.errors ? handleErrors() : null
        }
      </div>
    </>
  );
};

Signup.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default Signup;
