import React from 'react';
import './Button.css';

export function Button({ onClick, children, className = '' }) {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
