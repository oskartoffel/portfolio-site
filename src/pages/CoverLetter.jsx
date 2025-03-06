// src/pages/CoverLetter.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClassicWindow from '../components/ui/ClassicWindow';
import XPBackground from '../components/ui/XPBackground';
import { useTheme } from '../components/ui/ThemeProvider';

const CoverLetter = () => {
  const { setTheme } = useTheme();
  
  // Set theme to coverletter when component mounts
  useEffect(() => {
    setTheme('coverletter');
  }, [setTheme]);

  return (
    <XPBackground>
      <ClassicWindow title="My Cover Letter">
        <h1 style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>Cover Letter</h1>
        <p style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>This page will showcase my Cover Letter.</p>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Link to="/">
            <button className="xp-button">Back to Home</button>
          </Link>
        </div>
      </ClassicWindow>
    </XPBackground>
  );
};

export default CoverLetter;