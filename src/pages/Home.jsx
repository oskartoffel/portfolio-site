// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import EnhancedBackground from '../components/ui/EnhancedBackground';
import EnhancedWindow from '../components/ui/EnhancedWindow';
import EnhancedButton from '../components/ui/EnhancedButton';
import { useTheme } from '../components/ui/ThemeProvider';

// Animation variants for staggered button appearance
const buttonContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const buttonVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  }
};

const Home = () => {
  const { setTheme } = useTheme();
  
  // Set theme to home when component mounts
  useEffect(() => {
    setTheme('home');
  }, [setTheme]);
  
  return (
    <EnhancedBackground>
      <EnhancedWindow 
        title="Welcome to My Portfolio" 
        width="500px" 
        height="auto"
        hideControls={true}
        icon="👋"
      >
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <h1 style={{ 
            marginTop: '0',
            color: 'var(--home-primary)',
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '24px'
          }}>
            Hi, welcome to my portfolio!
          </h1>
          
          <p style={{ 
            color: '#333',
            lineHeight: '1.5',
            fontSize: '15px',
            marginBottom: '30px'
          }}>
            Please feel free to explore my work, learn about my background, or check out my 
            forest ecosystem simulation project. Enjoy your stay! ✨
          </p>
          
          <motion.div 
            variants={buttonContainerVariants}
            initial="initial"
            animate="animate"
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '15px', 
              marginTop: '25px',
              flexWrap: 'wrap'
            }}
          >
            <motion.div variants={buttonVariants}>
              <Link to="/cv" style={{ textDecoration: 'none' }}>
                <EnhancedButton primary themeOverride="cv">
                  💼 My CV
                </EnhancedButton>
              </Link>
            </motion.div>
            
            <motion.div variants={buttonVariants}>
              <Link to="/cover-letter" style={{ textDecoration: 'none' }}>
                <EnhancedButton primary themeOverride="coverletter">
                  🔥 Cover Letter
                </EnhancedButton>
              </Link>
            </motion.div>
            
            <motion.div variants={buttonVariants}>
              <Link to="/portfolio" style={{ textDecoration: 'none' }}>
                <EnhancedButton primary themeOverride="portfolio">
                  🌲 Portfolio
                </EnhancedButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </EnhancedWindow>
    </EnhancedBackground>
  );
};

export default Home;