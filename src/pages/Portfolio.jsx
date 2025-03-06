// src/pages/Portfolio.jsx 
import React from 'react';
import { Link } from 'react-router-dom';
import ClassicWindow from '../components/ui/ClassicWindow';
import ClassicXPButton from '../components/ui/ClassicXPButton';
import XPBackground from '../components/ui/XPBackground';
import { useTheme } from '../components/ui/ThemeProvider';

const Portfolio = () => {
  const { setTheme } = useTheme();
  
  React.useEffect(() => {
    setTheme('portfolio');
  }, [setTheme]);

  return (
    <XPBackground>
      <ClassicWindow title="My Portfolio">
        <div style={{ padding: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <h1 style={{ 
              fontFamily: 'Husky Stash, Tahoma, Arial, sans-serif',
              color: '#2a8a43',
              margin: '0 0 20px',
              fontSize: '26px'
            }}>
              Portfolio Projects
            </h1>
            
            <ClassicXPButton onClick={() => {
              // Create a link to download the PDF
              const link = document.createElement('a');
              link.href = '/documents/portfolio-oskar-wasmer.pdf';
              link.setAttribute('download', 'portfolio-oskar-wasmer.pdf');
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}>
              Download Portfolio PDF
            </ClassicXPButton>
          </div>
          
          {/* Projects section */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '20px', 
            justifyContent: 'flex-start',
            marginBottom: '30px'
          }}>
            {/* Ecosystem Simulation Project Card */}
            <div style={{ 
              width: '300px', 
              backgroundColor: '#f5f5f5',
              border: '1px solid #ccc',
              borderRadius: '3px',
              overflow: 'hidden',
              boxShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                backgroundColor: '#2a8a43', 
                color: 'white',
                padding: '8px 15px',
                borderBottom: '1px solid #1d6631',
                fontWeight: 'bold',
                fontFamily: 'Tahoma, Arial, sans-serif'
              }}>
                Ecosystem Simulation
              </div>
              
              <div style={{ padding: '15px' }}>
                <p style={{ margin: '0 0 15px 0', fontSize: '13px', lineHeight: '1.4', fontFamily: 'Tahoma, Arial, sans-serif' }}>
                  An interactive simulation of a forest ecosystem with trees, deer, and wolves.
                  Observe how these species interact and affect each other over time.
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Link to="/ecosystem-simulation">
                    <ClassicXPButton primary>
                      Launch Simulation
                    </ClassicXPButton>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Behind My Works Card */}
            <div style={{ 
              width: '300px', 
              backgroundColor: '#f5f5f5',
              border: '1px solid #ccc',
              borderRadius: '3px',
              overflow: 'hidden',
              boxShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                backgroundColor: '#8b5a2b', 
                color: 'white',
                padding: '8px 15px',
                borderBottom: '1px solid #6d4522',
                fontWeight: 'bold',
                fontFamily: 'Tahoma, Arial, sans-serif'
              }}>
                Behind My Works
              </div>
              
              <div style={{ padding: '15px' }}>
                <p style={{ margin: '0 0 15px 0', fontSize: '13px', lineHeight: '1.4', fontFamily: 'Tahoma, Arial, sans-serif' }}>
                  Learn about the inspiration, development journey, and future vision behind my ecosystem simulation project.
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Link to="/behind-works">
                    <ClassicXPButton>
                      Explore Background
                    </ClassicXPButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Behind My Works content */}
          <div style={{ marginTop: '40px', marginBottom: '40px' }}>
            <h2 style={{ 
              fontFamily: 'Hybrid, Tahoma, Arial, sans-serif',
              color: '#2a8a43',
              fontSize: '22px',
              borderBottom: '2px solid #2a8a43',
              paddingBottom: '5px',
              marginBottom: '25px'
            }}>
              Behind My Works
            </h2>
            
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ 
                fontFamily: 'Octuple Max, Tahoma, Arial, sans-serif',
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
                fontFamily: 'Bubblicious, Tahoma, Arial, sans-serif',
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
                fontFamily: 'Popstar Pop, Tahoma, Arial, sans-serif',
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
          </div>
          
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <Link to="/">
              <ClassicXPButton>
                Back to Home
              </ClassicXPButton>
            </Link>
          </div>
        </div>
      </ClassicWindow>
    </XPBackground>
  );
};

export default Portfolio;