// src/components/ui/XPBackground.jsx
import React from 'react';
import { useTheme } from './ThemeProvider';

// Background style maps for each theme
const backgroundStyles = {
  home: {
    backgroundColor: '#245edb',
    backgroundImage: "url('/images/xp-bliss.jpg')",
  },
  portfolio: {
    backgroundColor: '#1b4d2e',
    backgroundImage: "url('/images/forest-bg.jpg')",
  },
  cv: {
    backgroundColor: '#42275a',
    backgroundImage: "url('/images/purple-bg.jpg')",
  },
  coverletter: {
    backgroundColor: '#6b2113',
    backgroundImage: "url('/images/red-bg.jpg')",
  }
};

const XPBackground = ({ children }) => {
  const { currentTheme } = useTheme();
  
  // Default to home theme if current theme is not found
  const bgStyle = backgroundStyles[currentTheme] || backgroundStyles.home;
  
  return (
    <div style={{ 
      ...bgStyle,
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