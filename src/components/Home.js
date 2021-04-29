/* eslint-disable max-len */
import React from 'react';
import '../styles/Home/Home.css';

const Home = () => {
  const imgs = {
    small: 'https://images.unsplash.com/photo-1602081850519-24694aee87e1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    regular: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  };

  return (
    <>
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

      <div className="mid-break">
        <p>
          SIMPLE AND FAST WAY TO RENT
        </p>
        <h4>
          Comfortable home from reliable people
        </h4>
      </div>

      <section className="listing">
        <div />

        <div className="ad-listing-info d-flex justify-content-center flex-column">
          <div className="image-placeholder col-md w-100 d-flex justify-content-center">
            <img src="https://via.placeholder.com/256" alt="" />
          </div>
          <div className="col-md">
            <h2 className="text-center">Only best places for your rest</h2>
            <p className="text-justify">
              More than ten thousand house at your disposal. Only the best and checked landlords. We will find the best place for you and the conditions for a safe transaction and comfortable stay.
            </p>
            <div className="text-center">
              <button type="button">Sign Up Now</button>
            </div>
          </div>
        </div>
      </section>

      <div className="mid-break">
        <p>
          PEOPLE ARE ALREADY ENJOYING THE SERVICE
        </p>
        <h4>
          Look what these have to say
        </h4>
      </div>
    </>
  );
};

export default Home;
