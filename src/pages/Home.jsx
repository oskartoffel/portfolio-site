// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Window from '../components/ui/Window';

const Home = () => {
  return (
    <div className="xp-desktop">
      <Window title="Welcome to My Portfolio">
        <h1>Welcome to My Portfolio</h1>
        <p>
          Explore my work and learn more about my ecosystem simulation project.
        </p>
        <div className="field-row" style={{ justifyContent: 'center', marginTop: '20px' }}>
          <Link to="/cv"><button>My CV</button></Link>
          <Link to="/cover-letter"><button>Cover Letter</button></Link>
          <Link to="/portfolio"><button>Portfolio</button></Link>
        </div>
      </Window>
    </div>
  );
};

export default Home;