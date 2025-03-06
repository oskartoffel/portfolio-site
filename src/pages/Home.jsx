// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import XPBackground from '../components/ui/XPBackground';
import ClassicWindow from '../components/ui/ClassicWindow';
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
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '24px'
          }}>
            Hi, welcome to my portfolio!
          </h1>
          
          <p style={{ 
            color: '#333',
            lineHeight: '1.5',
            fontSize: '15px',
            marginBottom: '30px',
            fontFamily: 'Tahoma, Arial, sans-serif'
          }}>
            Please feel free to explore my work, learn about my background, or check out my 
            forest ecosystem simulation project. Enjoy your stay!
          </p>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '15px', 
            marginTop: '25px',
            flexWrap: 'wrap'
          }}>
            <Link to="/cv" style={{ textDecoration: 'none' }}>
              <button className="xp-button" style={buttonStyle('cv')}>
                My CV
              </button>
            </Link>
            
            <Link to="/cover-letter" style={{ textDecoration: 'none' }}>
              <button className="xp-button" style={buttonStyle('coverletter')}>
                Cover Letter
              </button>
            </Link>
            
            <Link to="/portfolio" style={{ textDecoration: 'none' }}>
              <button className="xp-button" style={buttonStyle('portfolio')}>
                Portfolio
              </button>
            </Link>
          </div>
        </div>
      </ClassicWindow>
    </XPBackground>
  );
};

// Custom button styles that match XP theme but with custom colors
const buttonStyle = (type) => {
  const styles = {
    cv: {
      background: 'linear-gradient(to bottom, #9a3683, #6e1e5a)',
      borderColor: '#6e1e5a',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '14px',
      padding: '6px 16px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
    },
    coverletter: {
      background: 'linear-gradient(to bottom, #c15d26, #992a0a)',
      borderColor: '#992a0a',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '14px',
      padding: '6px 16px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
    },
    portfolio: {
      background: 'linear-gradient(to bottom, #38ae57, #267532)',
      borderColor: '#267532',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '14px',
      padding: '6px 16px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
    }
  };
  
  return styles[type];
};

export default Home;