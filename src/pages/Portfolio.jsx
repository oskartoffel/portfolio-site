// src/pages/Portfolio.jsx 
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClassicWindow from '../components/ui/ClassicWindow';
import XPBackground from '../components/ui/XPBackground';
import { useTheme } from '../components/ui/ThemeProvider';

const Portfolio = () => {
  const { setTheme } = useTheme();
  
  // Set theme to portfolio when component mounts
  useEffect(() => {
    setTheme('portfolio');
  }, [setTheme]);

  return (
    <XPBackground>
      <ClassicWindow title="My Portfolio">
        <h1 style={{ 
          textAlign: 'center', 
          fontFamily: 'Tahoma, Arial, sans-serif',
          color: '#2a8a43',
          margin: '10px 0 20px'
        }}>
          Portfolio Projects
        </h1>
        
        {/* Project cards */}
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
                  <button className="xp-button" style={{ backgroundColor: '#4b9460', color: 'white', fontWeight: 'bold' }}>
                    Launch Simulation
                  </button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Project 2 Card */}
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
              Project 2
            </div>
            
            <div style={{ padding: '15px' }}>
              <p style={{ margin: '0 0 15px 0', fontSize: '13px', lineHeight: '1.4', fontFamily: 'Tahoma, Arial, sans-serif' }}>
                Coming soon! This section will showcase another exciting project from my portfolio.
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="xp-button" style={{ opacity: 0.6 }} disabled>
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Link to="/">
            <button className="xp-button">
              Back to Home
            </button>
          </Link>
        </div>
      </ClassicWindow>
    </XPBackground>
  );
};

export default Portfolio;