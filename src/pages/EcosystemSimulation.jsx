// src/pages/EcosystemSimulation.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClassicWindow from '../components/ui/ClassicWindow';
import ClassicXPButton from '../components/ui/ClassicXPButton';
import XPBackground from '../components/ui/XPBackground';
import { useTheme } from '../components/ui/ThemeProvider';

// Import updated ecosystem visualization
import FlatGameVisualization from '../components/ecosystem/FlatGameVisualization';

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
          <FlatGameVisualization />
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <Link to="/portfolio">
              <ClassicXPButton>
                Back to Portfolio
              </ClassicXPButton>
            </Link>
          </div>
        </div>
      </ClassicWindow>
    </XPBackground>
  );
};

export default EcosystemSimulation;