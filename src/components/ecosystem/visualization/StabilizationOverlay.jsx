// src/components/ecosystem/visualization/StabilizationOverlay.jsx
import React from 'react';

const StabilizationOverlay = ({ isStabilizing, stabilizationProgress, stabilizationYears }) => {
  if (!isStabilizing) return null;
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      zIndex: 1000,
      color: 'white'
    }}>
      <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Forest Stabilization in Progress</h3>
      <div style={{ width: '300px', backgroundColor: '#333', borderRadius: '4px', padding: '3px' }}>
        <div style={{ 
          width: `${stabilizationProgress}%`, 
          backgroundColor: '#2ecc71',
          height: '20px',
          borderRadius: '2px',
          transition: 'width 0.3s'
        }}></div>
      </div>
      <p style={{ marginTop: '10px' }}>
        {stabilizationProgress}% Complete - Simulating {stabilizationYears} Years of Forest Growth
      </p>
    </div>
  );
};

export default StabilizationOverlay;