// src/components/ui/XPBackground.jsx
import React from 'react';

const XPBackground = ({ children }) => {
  return (
    <div style={{ 
      backgroundColor: '#3a6ea5', // Fallback color
      backgroundImage: "url('/images/xp-background.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {children}
    </div>
  );
};

export default XPBackground;