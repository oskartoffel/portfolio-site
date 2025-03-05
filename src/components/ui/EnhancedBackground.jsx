// src/components/ui/EnhancedBackground.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

// Animation variants
const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.6,
      when: "beforeChildren"
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 } 
  }
};

// Background style maps for each theme
const backgroundStyles = {
  home: {
    backgroundColor: 'var(--home-secondary)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  portfolio: {
    backgroundColor: 'var(--eco-secondary)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  cv: {
    backgroundColor: 'var(--cv-secondary)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  coverletter: {
    backgroundColor: 'var(--cl-secondary)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
};

const EnhancedBackground = ({ children, style = {} }) => {
  const { currentTheme } = useTheme();
  
  // Combine the theme style with any custom styles
  const combinedStyle = {
    ...backgroundStyles[currentTheme],
    minHeight: '100vh',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...style
  };
  
  return (
    <motion.div 
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={combinedStyle}
    >
      {children}
    </motion.div>
  );
};

export default EnhancedBackground;