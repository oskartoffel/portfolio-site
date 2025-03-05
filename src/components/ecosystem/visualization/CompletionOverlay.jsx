// src/components/ecosystem/visualization/CompletionOverlay.jsx
import React from 'react';

const CompletionOverlay = ({ isComplete, years }) => {
  if (!isComplete) return null;
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: '20px', 
      left: '50%', 
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(0,0,0,0.8)',
      padding: '10px 20px',
      borderRadius: '5px',
      color: 'white',
      zIndex: 999,
      fontSize: '16px',
      fontWeight: 'bold'
    }}>
      Simulation Complete - {years} Years
    </div>
  );
};

export default CompletionOverlay;