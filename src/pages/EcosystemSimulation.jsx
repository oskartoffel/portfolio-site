// src/pages/EcosystemSimulation.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Window from '../components/ui/Window';
import XPBackground from '../components/ui/XPBackground';
import EcosystemVisualization from '../components/EcosystemVisualization';

const EcosystemSimulation = () => {
  return (
    <XPBackground>
      <Window 
        title="Ecosystem Simulator v1.0" 
        width="900px"
        icon="🌲"
      >
        <div style={{ padding: '5px' }}>
          <EcosystemVisualization />
          
          <div style={{ 
            marginTop: '15px', 
            backgroundColor: '#f0f0f0', 
            padding: '10px',

            border: '1px solid #ccc',
            borderRadius: '3px',
            fontSize: '12px',
            lineHeight: '1.4'
          }}>
            <h3 style={{ margin: '0 0 5px 0', fontSize: '14px' }}>About This Simulation</h3>
            <p>
              This ecosystem simulator models interactions between trees, deer, and wolves.
              Each species follows realistic lifecycle rules:
            </p>
            <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
              <li>Trees grow, reproduce, and can die from age, stress, or being eaten by deer</li>
              <li>Deer forage for young trees and can die from starvation, age, or wolf predation</li>
              <li>Wolves hunt deer and can die from starvation or age</li>
            </ul>
            <p>
              The simulation tracks population dynamics over time, allowing you to observe how
              changes in one species affect the others.
            </p>
          </div>

          <div className="field-row" style={{ justifyContent: 'center', marginTop: '15px' }}>
            <Link to="/portfolio">
              <button style={{ 
                backgroundColor: '#e0e0e0', 
                border: '2px outset #f0f0f0',
                borderRadius: '2px',
                padding: '3px 10px',
                fontSize: '12px',
                fontFamily: 'Tahoma, Arial, sans-serif',
                cursor: 'pointer'
              }}>
                Back to Portfolio
              </button>
            </Link>
          </div>
        </div>
      </Window>
    </XPBackground>
  );
};

export default EcosystemSimulation;