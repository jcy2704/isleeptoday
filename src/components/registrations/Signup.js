import axios from 'axios';
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userErrors } from '../../actions';

const Signup = ({ handleLogin, session, addErrors }) => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
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
        addErrors(response.data.errors);
      }
    });
  };

  const handleErrors = () => (
    <div>
      <ul>
        {session.errors.map(error => <li key={error}>{error}</li>)}
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
          session.errors ? handleErrors() : null
        }
      </div>
    </>
  );
};

Signup.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  session: PropTypes.oneOfType([PropTypes.object]).isRequired,
  addErrors: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ session: state.session });

const mapDispatchToProps = dispatch => ({
  addErrors: errors => (dispatch(userErrors(errors))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
