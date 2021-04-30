import axios from 'axios';
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userErrors } from '../../actions';
import '../../styles/Login/Login.css';

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
      <div className="login-cont position-relative">
        <div>
          <img className="w-100 ls-background" src="https://images.unsplash.com/photo-1501028932887-da5de53af865?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" alt="background" />
        </div>
        <div className="ls-form position-absolute d-flex p-5 justify-content-center w-100 flex-column">
          <h1 className="login-title text-center mb-4">Sign Up</h1>

          <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
            <input placeholder="Username" className="input w-100 mb-3 px-4 py-2" name="username" type="text" value={username} onChange={handleChange} />
            <input placeholder="Email" className="input w-100 mb-3 px-4 py-2" type="email" name="email" value={email} onChange={handleChange} />
            <input placeholder="Password" className="input w-100 mb-3 px-4 py-2" type="password" name="password" value={password} onChange={handleChange} />
            <input placeholder="Password Confirmation" className="input w-100 mb-4 px-4 py-2" type="password" name="password_confirmation" value={confirmation} onChange={handleChange} />
            <button className="login-btn px-3 py-1 w-50 mb-2" type="submit">Sign Up</button>
            <div className="signup-btn">
              <Link to="/login">Log In</Link>
            </div>
          </form>
        </div>
        <div>
          {
            session.errors ? handleErrors() : null
          }
        </div>
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
