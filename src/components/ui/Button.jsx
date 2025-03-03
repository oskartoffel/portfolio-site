// src/components/ui/Button.jsx
import React from 'react';

const Button = ({ onClick, children, disabled }) => {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className="xp-button"
    >
      {children}
    </button>
  );
};

export default Button;