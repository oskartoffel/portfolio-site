// src/pages/CV.jsx 
import React from 'react';
import { Link } from 'react-router-dom';
import Window from '../components/ui/Window';
import XPBackground from '../components/ui/XPBackground';

const CV = () => {
  return (
    <XPBackground>
      <Window title="My CV">
        <h1>CV</h1>
        <p>This page will showcase my CV.</p>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Link to="/"><button>Back to Home</button></Link>
        </div>
      </Window>
    </XPBackground>
  );
};

export default CV;