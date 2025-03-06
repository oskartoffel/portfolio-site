// src/components/ui/ClassicWindow.jsx
import React from 'react';
import { useTheme } from './ThemeProvider';

// Theme-specific window styles
const windowStyles = {
  home: {
    titleBarBg: '#0058aa',
    titleBarGradient: 'linear-gradient(to right, #0050a7, #1083d9)',
    borderOuter: '#0c61b6',
    borderInner: '#ffffff',
    buttonColor: '#c3dbf8'
  },
  portfolio: {
    titleBarBg: '#2a8a43',
    titleBarGradient: 'linear-gradient(to right, #266e35, #38ae57)',
    borderOuter: '#267532',
    borderInner: '#ffffff',
    buttonColor: '#c4f0c8'
  },
  cv: {
    titleBarBg: '#7d336a',
    titleBarGradient: 'linear-gradient(to right, #63264f, #9a3683)',
    borderOuter: '#6e1e5a',
    borderInner: '#ffffff',
    buttonColor: '#f3c4e5'
  },
  coverletter: {
    titleBarBg: '#aa4215',
    titleBarGradient: 'linear-gradient(to right, #8c300e, #c15d26)',
    borderOuter: '#992a0a',
    borderInner: '#ffffff',
    buttonColor: '#ffdbc8'
  }
};

const ClassicWindow = ({ 
  title, 
  children, 
  width, 
  height
}) => {
  const { currentTheme } = useTheme();
  const themeStyle = windowStyles[currentTheme];
  
  return (
    <div 
      style={{ 
        width, 
        height, 
        minWidth: '300px',
        position: 'relative',
        /* Classic XP double-border effect */
        border: `1px solid ${themeStyle.borderOuter}`,
        boxShadow: `0 0 0 1px ${themeStyle.borderInner}, 2px 2px 8px rgba(0,0,0,0.3)`,
        borderRadius: '3px',
        overflow: 'hidden',
        backgroundColor: '#f0f0f0'
      }}
    >
      {/* Title bar - No buttons */}
      <div 
        style={{
          background: themeStyle.titleBarGradient,
          color: 'white',
          padding: '4px 10px',
          display: 'flex',
          alignItems: 'center',
          fontFamily: 'Tahoma, Arial, sans-serif',
          fontSize: '13px',
          fontWeight: 'bold',
          height: '25px',
          userSelect: 'none'
        }}
      >
        <span>{title}</span>
      </div>
      
      {/* Window body with classic XP inset border */}
      <div 
        style={{ 
          padding: '10px', 
          height: 'calc(100% - 25px)',
          overflowY: 'auto',
          border: '2px solid',
          borderColor: '#dfdfdf #fefefe #fefefe #dfdfdf'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ClassicWindow;