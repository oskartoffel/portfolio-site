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
            justifyContent: 'center',
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
                    <ClassicXPButton>
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