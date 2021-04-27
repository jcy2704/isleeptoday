import React, { useState } from 'react';

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    errors: '',
  });

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
  };

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input id="loginInput" placeholder="Username" type="text" value={username} name="username" onChange={handleChange} />
        <input placeholder="Password" type="password" name="password" value={password} onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Signup;
