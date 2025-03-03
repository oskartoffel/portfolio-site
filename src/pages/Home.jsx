// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Window from '../components/ui/Window';
import XPBackground from '../components/ui/XPBackground';

const Home = () => {
  return (
    <XPBackground>
      <Window title="Welcome to My Portfolio">
        <h1>My Portfolio</h1>
        <p>Explore my work and learn more about my ecosystem simulation project.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
          <Link to="/cv"><button>My CV</button></Link>
          <Link to="/cover-letter"><button>Cover Letter</button></Link>
          <Link to="/portfolio"><button>Portfolio</button></Link>
        </div>
      </Window>
    </XPBackground>
  );
};

export default Home;