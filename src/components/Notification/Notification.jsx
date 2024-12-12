import React, { useState, useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, type }) => {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (message) {
      setHide(false);
    }
  }, [message]);

  const getClassNames = () => {
    if (type === 'win') return 'game-notification win';
    if (type === 'time-up') return 'game-notification time-up';
    return 'game-notification';
  };

  return (
    <div className={`${getClassNames()} ${hide ? 'hide' : ''}`}>
      {message}
    </div>
  );
};

export default Notification;
