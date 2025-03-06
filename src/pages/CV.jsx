// src/pages/CV.jsx 
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClassicWindow from '../components/ui/ClassicWindow';
import XPBackground from '../components/ui/XPBackground';
import { useTheme } from '../components/ui/ThemeProvider';

const CV = () => {
  const { setTheme } = useTheme();
  
  // Set theme to cv when component mounts
  useEffect(() => {
    setTheme('cv');
  }, [setTheme]);

  return (
    <XPBackground>
      <ClassicWindow title="My CV">
        <h1 style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>CV</h1>
        <p style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>This page will showcase my CV.</p>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Link to="/">
            <button className="xp-button">Back to Home</button>
          </Link>
        </div>
      </ClassicWindow>
    </XPBackground>
  );
};

export default CV;