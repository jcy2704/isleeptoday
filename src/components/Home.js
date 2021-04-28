/* eslint-disable max-len */
import React from 'react';

const Home = () => {
  const imgs = {
    small: 'https://images.unsplash.com/photo-1611602132416-da2045990f76?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    regular: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  };

  return (
    <section className="hero">
      <div className="position-relative">
        <div>
          <img className="hero-img w-100" src={window.innerWidth < 728 ? imgs.small : imgs.regular} alt="hero" />
        </div>

        <div className="position-absolute hero-info">
          <h1>Feel like home from anywhere</h1>
          <p>
            A place with the best offers. Find a place to sleep no matter where you are and feel alway like home.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Home;
