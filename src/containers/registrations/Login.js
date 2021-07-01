import axios from 'axios';
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userErrors } from '../../actions';
import '../../styles/Login/Login.css';
import ErrorsComponent from '../../components/ErrorsComponent';

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

  return (
    <>
      <div className="login-cont position-relative">
        <div>
          <img className="w-100 ls-background" src="https://images.unsplash.com/photo-1501028932887-da5de53af865?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" alt="background" />
        </div>
        <div className="ls-form position-absolute d-flex p-5 justify-content-center w-100 flex-column">
          <h1 className="login-title text-center mb-4">Login</h1>

          <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
            <input id="loginInput" className="input w-100 mb-3 px-4 py-2" placeholder="Username" type="text" value={username} name="username" onChange={handleChange} />
            <input placeholder="Password" className="input w-100 mb-4 px-4 py-2" type="password" name="password" value={password} onChange={handleChange} />
            <button className="login-btn px-3 py-1 w-50 mb-2" type="submit">Login</button>
            <div className="signup-btn">
              <Link to="/signup">Sign Up</Link>
            </div>
          </form>
          <div>
            {
              session.errors ? <ErrorsComponent errors={session.errors} /> : null
            }
          </div>
        </div>
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
