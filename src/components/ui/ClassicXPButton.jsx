// src/components/ui/ClassicXPButton.jsx
import React from 'react';
import { useTheme } from './ThemeProvider';

/**
 * A button component styled like classic Windows XP buttons
 * Used throughout the portfolio for consistent styling
 */
const ClassicXPButton = ({ 
  onClick, 
  children, 
  disabled = false, 
  primary = false,
  size = 'medium',
  themeOverride = null,
  className = '',
  style = {}
}) => {
  const { currentTheme } = useTheme();
  const theme = themeOverride || currentTheme;
  
  // Theme-specific colors
  const themeColors = {
    home: {
      primary: '#0058aa',
      primaryGradient: 'linear-gradient(to bottom, #0050a7, #1083d9)',
      border: '#0c61b6'
    },
    portfolio: {
      primary: '#2a8a43',
      primaryGradient: 'linear-gradient(to bottom, #266e35, #38ae57)', 
      border: '#267532'
    },
    cv: {
      primary: '#7d336a',
      primaryGradient: 'linear-gradient(to bottom, #63264f, #9a3683)',
      border: '#6e1e5a'
    },
    coverletter: {
      primary: '#aa4215',
      primaryGradient: 'linear-gradient(to bottom, #8c300e, #c15d26)',
      border: '#992a0a'
    }
  };
  
  // Size variants
  const sizeStyles = {
    small: {
      padding: '2px 8px',
      fontSize: '11px'
    },
    medium: {
      padding: '4px 10px',
      fontSize: '12px'
    },
    large: {
      padding: '6px 16px',
      fontSize: '14px'
    }
  };
  
  // Base styles for the button
  const baseStyles = {
    fontFamily: 'Tahoma, Arial, sans-serif',
    borderRadius: '3px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.7 : 1,
    border: '2px outset #ddd',
    boxShadow: '0 1px 1px rgba(0,0,0,0.15)',
    transition: 'all 0.1s ease',
    ...sizeStyles[size]
  };
  
  // Primary variant with theme-specific styling
  const primaryStyles = primary ? {
    backgroundColor: 'transparent',
    background: themeColors[theme]?.primaryGradient || themeColors.home.primaryGradient,
    borderColor: themeColors[theme]?.border || themeColors.home.border,
    color: 'white',
    fontWeight: 'bold'
  } : {
    background: 'linear-gradient(to bottom, #f6f6f6, #e4e4e4)',
    color: '#333'
  };
  
  // Active/pressed state style
  const handleMouseDown = (e) => {
    if (!disabled) {
      e.currentTarget.style.background = primary 
        ? themeColors[theme]?.primary || themeColors.home.primary
        : '#e0e0e0';
      e.currentTarget.style.borderStyle = 'inset';
      e.currentTarget.style.transform = 'translateY(1px)';
    }
  };
  
  const handleMouseUp = (e) => {
    if (!disabled) {
      e.currentTarget.style.background = primary 
        ? themeColors[theme]?.primaryGradient || themeColors.home.primaryGradient
        : 'linear-gradient(to bottom, #f6f6f6, #e4e4e4)';
      e.currentTarget.style.borderStyle = 'outset';
      e.currentTarget.style.transform = 'translateY(0)';
    }
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`xp-classic-button ${className}`}
      style={{
        ...baseStyles,
        ...primaryStyles,
        ...style
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {children}
    </button>
  );
};

export default ClassicXPButton;