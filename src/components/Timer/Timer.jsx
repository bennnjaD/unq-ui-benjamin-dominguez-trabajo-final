import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({ initialTime, isPlaying, onTimeUp }) => {
  const [timer, setTimer] = useState(initialTime);

  useEffect(() => {
    let interval;

    if (isPlaying && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval); 
            onTimeUp(); 
            return 0;
          }
          return prevTimer - 1; 
        });
      }, 1000);
    } else {
      setTimer(initialTime); 
    }

    return () => clearInterval(interval);
  }, [isPlaying, timer, onTimeUp]); 

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="timer-container">
      <div className="time">
        <span>{formatTime(timer)}</span>
      </div>
    </div>
  );
};

export default Timer;
