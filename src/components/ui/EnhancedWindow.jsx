// src/components/ui/EnhancedWindow.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

// Animation variants
const windowVariants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { 
    scale: 1,
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 20 
    }
  },
  exit: { 
    scale: 0.95, 
    opacity: 0,
    transition: { duration: 0.2 } 
  }
};

// Theme-specific window styles
const windowStyles = {
  home: {
    borderColor: 'var(--home-accent)',
    boxShadow: '0 5px 15px rgba(10, 32, 41, 0.4)'
  },
  portfolio: {
    borderColor: 'var(--eco-accent-1)',
    boxShadow: '0 5px 15px rgba(15, 46, 27, 0.4)'
  },
  cv: {
    borderColor: 'var(--cv-accent-1)',
    boxShadow: '0 5px 15px rgba(44, 26, 61, 0.4)'
  },
  coverletter: {
    borderColor: 'var(--cl-accent-1)',
    boxShadow: '0 5px 15px rgba(66, 20, 12, 0.4)'
  }
};

// Theme-specific title bar colors
const titleBarStyles = {
  home: {
    background: 'linear-gradient(to right, var(--home-primary), var(--home-accent))'
  },
  portfolio: {
    background: 'linear-gradient(to right, var(--eco-primary), var(--eco-accent-1))'
  },
  cv: {
    background: 'linear-gradient(to right, var(--cv-primary), var(--cv-accent-1))'
  },
  coverletter: {
    background: 'linear-gradient(to right, var(--cl-primary), var(--cl-accent-1))'
  }
};

const EnhancedWindow = ({ title, children, width, height, onClose, hideControls = false, icon }) => {
  const { currentTheme } = useTheme();
  
  return (
    <motion.div 
      className="window"
      variants={windowVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ 
        width, 
        height, 
        minWidth: '300px',
        backgroundColor: 'rgba(240, 240, 240, 0.95)',
        borderRadius: '3px',
        border: '1px solid',
        ...windowStyles[currentTheme]
      }}
    >
      <div 
        className="title-bar"
        style={{
          display: 'flex',
          alignItems: 'center',
          ...titleBarStyles[currentTheme]
        }}
      >
        {icon && (
          <span style={{ marginRight: '8px', fontSize: '16px' }}>
            {icon}
          </span>
        )}
        <div className="title-bar-text">{title}</div>
        
        {!hideControls && (
          <div className="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close" onClick={onClose}></button>
          </div>
        )}
      </div>
      
      <div className="window-body" style={{ padding: '10px' }}>
        {children}
      </div>
    </motion.div>
  );
};

export default EnhancedWindow;