// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import XPBackground from '../components/ui/XPBackground';
import ClassicWindow from '../components/ui/ClassicWindow';
import ClassicXPButton from '../components/ui/ClassicXPButton';
import { useTheme } from '../components/ui/ThemeProvider';

const Home = () => {
  const { setTheme } = useTheme();
  
  // Set theme to home when component mounts
  useEffect(() => {
    setTheme('home');
  }, [setTheme]);
  
  return (
    <XPBackground>
      <ClassicWindow 
        title="Welcome to My Portfolio" 
        width="500px" 
        height="auto"
      >
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <h1 style={{ 
            marginTop: '10px',
            color: 'var(--home-primary)',
            fontFamily: 'Popstar, Tahoma, Arial, sans-serif',
            fontSize: '28px',
            marginBottom: '30px'
          }}>
            My Portfolio
          </h1>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '15px', 
            marginTop: '25px',
            flexWrap: 'wrap'
          }}>
            
            <Link to="/cover-letter" style={{ textDecoration: 'none' }}>
              <ClassicXPButton size="large">
                Cover Letter
              </ClassicXPButton>
            </Link>
            
            <Link to="/portfolio" style={{ textDecoration: 'none' }}>
              <ClassicXPButton size="large">
                Portfolio
              </ClassicXPButton>
            </Link>
          </div>
        </div>
      </ClassicWindow>
    </XPBackground>
  );
};

export default Home;