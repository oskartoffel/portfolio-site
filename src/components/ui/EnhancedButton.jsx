// src/components/ui/EnhancedButton.jsx
import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { useTheme } from './ThemeProvider';

const buttonVariants = {
  // Y2K-style hover effect with slight bounce
  hover: { 
    scale: 1.05,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    }
  },
  // Press effect
  tap: { 
    scale: 0.95 
  }
};

// Predefined theme color mappings
const themeColors = {
  home: {
    background: 'var(--home-accent)',
    hover: 'var(--home-primary)'
  },
  portfolio: {
    background: 'var(--eco-accent-1)',
    hover: 'var(--eco-primary)'
  },
  cv: {
    background: 'var(--cv-accent-1)',
    hover: 'var(--cv-primary)'
  },
  coverletter: {
    background: 'var(--cl-accent-1)',
    hover: 'var(--cl-primary)'
  }
};

const EnhancedButton = ({ 
  onClick, 
  children, 
  disabled = false, 
  primary = false,
  themeOverride = null,  // Manually set a theme
  className = '',
  ...props
}) => {
  const { currentTheme } = useTheme();
  
  // Determine which theme colors to use
  const theme = themeOverride || currentTheme;
  
  return (
    <motion.button 
      onClick={onClick} 
      disabled={disabled}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      className={classNames(
        'xp-button enhanced-button',
        {
          'primary': primary,
          [theme]: true
        },
        className
      )}
      style={{
        ...(primary && {
          backgroundColor: themeColors[theme]?.background,
          color: 'white',
          fontWeight: 'bold'
        })
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default EnhancedButton;