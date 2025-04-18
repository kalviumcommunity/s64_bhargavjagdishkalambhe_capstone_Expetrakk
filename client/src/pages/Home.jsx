// src/pages/Home.jsx
import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      <div>
        {/* Your page content goes here */}
        <h1>Welcome to Expetrak</h1>
        <p>Start tracking your expenses now!</p>
      </div>
    </>
  );
};

export default Home;
