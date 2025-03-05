// src/pages/EcosystemSimulation.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Window from '../components/ui/Window';
import XPBackground from '../components/ui/XPBackground';
import EcosystemVisualization from '../components/ecosystem/EcosystemVisualization';

const EcosystemSimulation = () => {
  return (
    <XPBackground>
      <Window title="Ecosystem Simulation" width="95%" height="95%">
        <div style={{ padding: '5px' }}>
          <h1 style={{ textAlign: 'center', marginTop: '0' }}>Forest Ecosystem Simulation</h1>
          <EcosystemVisualization />
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <Link to="/portfolio"><button>Back to Portfolio</button></Link>
          </div>
        </div>
      </Window>
    </XPBackground>
  );
};

export default EcosystemSimulation;