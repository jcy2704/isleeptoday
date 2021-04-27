import React, { useState } from 'react';

const Signup = () => {
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

  const handleSubmit = event => {
    event.preventDefault();
  };

  const {
    username, email, password, password_confirmation: confirmation,
  } = userInfo;

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
    </>
  );
};

export default Signup;
