// src/pages/EcosystemSimulation.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClassicWindow from '../components/ui/ClassicWindow';
import XPBackground from '../components/ui/XPBackground';
import EcosystemVisualization from '../components/ecosystem/EcosystemVisualization';
import { useTheme } from '../components/ui/ThemeProvider';

const EcosystemSimulation = () => {
  const { setTheme } = useTheme();
  
  // Set theme to portfolio when component mounts
  useEffect(() => {
    setTheme('portfolio');
  }, [setTheme]);

  return (
    <XPBackground>
      <ClassicWindow title="Forest Ecosystem Simulation" width="95%" height="95%">
        <div style={{ padding: '5px' }}>
          <h1 style={{ 
            textAlign: 'center', 
            marginTop: '0',
            fontFamily: 'Tahoma, Arial, sans-serif',
            color: '#2a8a43'
          }}>
            Forest Ecosystem Simulation
          </h1>
          <EcosystemVisualization />
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <Link to="/portfolio">
              <button className="xp-button">Back to Portfolio</button>
            </Link>
          </div>
        </div>
      </ClassicWindow>
    </XPBackground>
  );
};

export default EcosystemSimulation;