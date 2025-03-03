// src/pages/EcosystemSimulation.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Window from '../components/ui/Window';

const EcosystemSimulation = () => {
  return (
    <div className="xp-desktop">
      <Window title="Ecosystem Simulation" width="800px">
        <h1>Ecosystem Simulation</h1>
        <p>
          This is where the ecosystem simulation will be displayed.
          We'll integrate your existing simulation code here.
        </p>
        
        {/* Placeholder for simulation UI */}
        <div style={{ 
          height: '400px', 
          background: '#f0f0f0', 
          margin: '20px 0', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}>
          Simulation will be loaded here
        </div>
        
        <div className="field-row" style={{ justifyContent: 'center' }}>
          <Link to="/portfolio"><button>Back to Portfolio</button></Link>
        </div>
      </Window>
    </div>
  );
};

export default EcosystemSimulation;