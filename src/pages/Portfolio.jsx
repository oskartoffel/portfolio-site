// src/pages/Portfolio.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Window from '../components/ui/Window';

const Portfolio = () => {
  return (
    <div className="xp-desktop">
      <Window title="My Portfolio">
        <h1>Portfolio Projects</h1>
        <div className="field-row" style={{ justifyContent: 'center', marginTop: '20px' }}>
          <Link to="/ecosystem-simulation"><button>Ecosystem Simulation</button></Link>
          <Link to="/behind-the-game"><button>Behind the Game</button></Link>
          <Link to="/"><button>Back to Home</button></Link>
        </div>
      </Window>
    </div>
  );
};

export default Portfolio;