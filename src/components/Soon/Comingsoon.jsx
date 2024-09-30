// ComingSoon.js
import React from 'react';
import './Comingsoon.css'; // Use a unique CSS file
import Header from '../home/Header';

const ComingSoon = () => {
  return (
    <>
    <Header/>
    <div className="coming-soon-container">
      <h1 className="coming-soon-title">Coming Soon</h1>
      <p className="coming-soon-message">We're working hard to launch our website. Stay tuned!</p>
      <div className="coming-soon-countdown">
        <p>Launching in:</p>
        <span className="countdown-days">30</span> days
      </div>
    </div>
    </>
  );
};

export default ComingSoon;
