import React from 'react';
import './Card.css';

const Card = ({ flipped, onClick, children }) => {
  return (
    <div className={`card ${flipped ? 'flipped' : ''}`} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front"></div>
        <div className="card-back">{children}</div>
      </div>
    </div>
  );
};

export default Card;
