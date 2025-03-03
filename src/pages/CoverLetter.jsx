// src/pages/CoverLetter.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Window from '../components/ui/Window';
import XPBackground from '../components/ui/XPBackground';

const CoverLetter = () => {
  return (
    <XPBackground>
      <Window title="My CoverLetter">
        <h1>Cover Letter</h1>
        <p>This page will showcase my Cover Letter.</p>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Link to="/"><button>Back to Home</button></Link>
        </div>
      </Window>
    </XPBackground>
  );
};

export default CoverLetter;