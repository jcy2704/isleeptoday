import axios from 'axios';
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userErrors } from '../../actions';

const Login = ({ handleLogin, session, addErrors }) => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
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
        localStorage.setItem('token', response.data.token);
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
          session.errors ? handleErrors() : null
        }
      </div>
    </>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  session: PropTypes.oneOfType([PropTypes.object]).isRequired,
  addErrors: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ session: state.session });

const mapDispatchToProps = dispatch => ({
  addErrors: errors => (dispatch(userErrors(errors))),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
