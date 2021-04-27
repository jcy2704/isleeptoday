import axios from 'axios';
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Signup = ({ handleLogin }) => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    errors: '',
  });

  const handleChange = event => {
    const { name, value } = event.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const history = useHistory();

  const {
    username, email, password, password_confirmation: confirmation,
  } = userInfo;

  const handleSubmit = event => {
    event.preventDefault();

    const user = {
      username, email, password, password_confirmation: confirmation,
    };

    axios.post('http://localhost:3001/users', { user }, { withCredentials: true }).then(response => {
      if (response.data.status === 'created') {
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
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <input placeholder="Username" name="username" type="text" value={username} onChange={handleChange} />
        <input placeholder="Email;" type="email" name="email" value={email} onChange={handleChange} />
        <input placeholder="Password" type="password" name="password" value={password} onChange={handleChange} />
        <input placeholder="Password Confirmation" type="password" name="password_confirmation" value={confirmation} onChange={handleChange} />
        <button type="submit">Sign Up</button>
      </form>
      <div>
        <Link to="/login">Log In</Link>
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
