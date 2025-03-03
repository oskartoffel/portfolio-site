// src/components/ui/Window.jsx
import React from 'react';

const Window = ({ title, children, width, height, onClose }) => {
  return (
    <div className="window" style={{ width, height }}>
      <div className="title-bar">
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close" onClick={onClose}></button>
        </div>
      </div>
      <div className="window-body">
        {children}
      </div>
    </div>
  );
};

export default Window;