import React, { useState } from 'react';

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    errors: '',
  });

  const {
    username, email, password,
  } = userInfo;

  const validateInput = () => {
    const field = document.getElementById('loginInput');

    if (/@/.test(field.value)) {
      field.type = 'email';
      field.value = email;
      field.name = 'email';
    } else {
      field.type = 'text';
      field.value = username;
      field.name = 'password';
    }
  };

  const handleChange = event => {
    validateInput();

    const { name, value } = event.target;

    setUserInfo({
      [name]: value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input id="loginInput" placeholder="Username or Email" onChange={handleChange} />
        <input placeholder="Password" type="password" name="password" value={password} onChange={handleChange} />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default Signup;
