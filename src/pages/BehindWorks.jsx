// src/pages/BehindWorks.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClassicWindow from '../components/ui/ClassicWindow';
import ClassicXPButton from '../components/ui/ClassicXPButton';
import XPBackground from '../components/ui/XPBackground';
import { useTheme } from '../components/ui/ThemeProvider';

const BehindWorks = () => {
  const { setTheme } = useTheme();
  
  // Set theme to portfolio when component mounts
  useEffect(() => {
    setTheme('portfolio');
  }, [setTheme]);

  return (
    <XPBackground>
      <ClassicWindow title="Behind My Works">
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ 
            fontFamily: 'Popstar, Tahoma, Arial, sans-serif',
            color: '#2a8a43',
            fontSize: '26px',
            marginBottom: '25px',
            textAlign: 'center'
          }}>
            Behind My Works
          </h1>
          
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              color: '#2a8a43',
              fontSize: '20px',
              paddingBottom: '5px',
              borderLeft: '4px solid #2a8a43',
              paddingLeft: '10px'
            }}>
              What Led to the Project
            </h3>
            <p style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5'
            }}>
              My interest in ecosystem dynamics began during my environmental engineering studies at ETH Lausanne. 
              The complex interactions between species and their environment fascinated me, especially how small 
              changes can lead to significant ecological shifts. I was particularly drawn to forest ecosystems 
              because of their rich biodiversity and critical role in climate regulation.
            </p>
            <p style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5'
            }}>
              Having worked in environmental conservation during my civil service at Oekoskop, I witnessed 
              firsthand the delicate balance of natural systems. This simulation project emerged from my desire 
              to visually demonstrate these principles and make ecological concepts more accessible to others.
            </p>
          </div>
          
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              color: '#2a8a43',
              fontSize: '20px',
              paddingBottom: '5px',
              borderLeft: '4px solid #2a8a43',
              paddingLeft: '10px'
            }}>
              What the Project is Now
            </h3>
            <p style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5'
            }}>
              The current simulation demonstrates a forest ecosystem with three key species: trees, deer, and wolves. 
              Each species has its own lifecycle, including growth, reproduction, and mortality. The simulation 
              tracks population dynamics, showing how these species interact and affect each other over time.
            </p>
            <p style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5'
            }}>
              Technical aspects include:
            </p>
            <ul style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5',
              paddingLeft: '20px'
            }}>
              <li>Realistic modeling of species interactions (predator-prey dynamics)</li>
              <li>Visual representation of forest density and population changes</li>
              <li>Statistical tracking of ecosystem metrics</li>
              <li>Real-time graphing of population trends</li>
            </ul>
          </div>
          
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              color: '#2a8a43',
              fontSize: '20px',
              paddingBottom: '5px',
              borderLeft: '4px solid #2a8a43',
              paddingLeft: '10px'
            }}>
              What the Project Could Be in the Future
            </h3>
            <p style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5'
            }}>
              I envision expanding this simulation to include:
            </p>
            <ul style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5',
              paddingLeft: '20px'
            }}>
              <li>A more comprehensive educational tool with guided scenarios</li>
              <li>Climate change simulation effects on the ecosystem</li>
              <li>Additional species and more complex interaction webs</li>
              <li>3D visualization of the forest environment</li>
              <li>Interactive elements allowing users to actively manage the ecosystem</li>
              <li>Research applications for testing ecological theories</li>
            </ul>
            <p style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5'
            }}>
              The ultimate goal would be to create a powerful yet accessible tool for both education and 
              research in ecosystem dynamics and conservation management.
            </p>
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '20px',
            marginTop: '40px'
          }}>
            <Link to="/portfolio">
              <ClassicXPButton>
                Back to Portfolio
              </ClassicXPButton>
            </Link>
            <Link to="/ecosystem-simulation">
              <ClassicXPButton primary>
                Launch Simulation
              </ClassicXPButton>
            </Link>
          </div>
        </div>
      </ClassicWindow>
    </XPBackground>
  );
};

export default BehindWorks;