import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({ timeLeft }) => {
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="timer-container">
      <div className="time">
        <span>{formatTime(timeLeft)}</span>
      </div>
    </div>
  );
};

export default Timer;
