// src/pages/Portfolio.jsx 
import React from 'react';
import { Link } from 'react-router-dom';
import Window from '../components/ui/Window';
import XPBackground from '../components/ui/XPBackground';

const Portfolio = () => {
  return (
    <XPBackground>
      <Window title="My Portfolio" icon="📂">
        <h1 style={{ 
          textAlign: 'center', 
          fontFamily: 'Tahoma, Arial, sans-serif',
          color: '#0058aa',
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
            border: '2px outset #ddd',
            borderRadius: '3px',
            overflow: 'hidden',
            boxShadow: '3px 3px 5px rgba(0,0,0,0.2)'
          }}>
            <div style={{ 
              backgroundColor: '#2874A6', 
              color: 'white',
              padding: '8px 15px',
              borderBottom: '1px solid #1A5276',
              fontWeight: 'bold',
              fontFamily: 'Tahoma, Arial, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              <span style={{ fontSize: '18px' }}>🌲</span>
              <span>Ecosystem Simulation</span>
            </div>
            
            <div style={{ padding: '15px' }}>
              <p style={{ margin: '0 0 15px 0', fontSize: '13px', lineHeight: '1.4' }}>
                An interactive simulation of a forest ecosystem with trees, deer, and wolves.
                Observe how these species interact and affect each other over time.
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link to="/ecosystem-simulation">
                  <button style={{ 
                    backgroundColor: '#2874A6', 
                    color: 'white',
                    border: '2px outset #5499C7',
                    borderRadius: '2px',
                    padding: '5px 15px',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}>
                    Launch Simulation
                  </button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* You can add more project cards here */}
          <div style={{ 
            width: '300px', 
            backgroundColor: '#f5f5f5',
            border: '2px outset #ddd',
            borderRadius: '3px',
            overflow: 'hidden',
            boxShadow: '3px 3px 5px rgba(0,0,0,0.2)'
          }}>
            <div style={{ 
              backgroundColor: '#C0392B', 
              color: 'white',
              padding: '8px 15px',
              borderBottom: '1px solid #922B21',
              fontWeight: 'bold',
              fontFamily: 'Tahoma, Arial, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}>
              <span style={{ fontSize: '18px' }}>💻</span>
              <span>Project 2</span>
            </div>
            
            <div style={{ padding: '15px' }}>
              <p style={{ margin: '0 0 15px 0', fontSize: '13px', lineHeight: '1.4' }}>
                Coming soon! This section will showcase another exciting project from my portfolio.
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button style={{ 
                  backgroundColor: '#C0392B', 
                  color: 'white',
                  border: '2px outset #E74C3C',
                  borderRadius: '2px',
                  padding: '5px 15px',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  cursor: 'pointer',
                  opacity: 0.6
                }} disabled>
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Link to="/">
            <button style={{ 
              backgroundColor: '#e0e0e0', 
              border: '2px outset #f0f0f0',
              borderRadius: '2px',
              padding: '3px 10px',
              fontSize: '12px',
              fontFamily: 'Tahoma, Arial, sans-serif',
              cursor: 'pointer'
            }}>
              Back to Home
            </button>
          </Link>
        </div>
      </Window>
    </XPBackground>
  );
};

export default Portfolio;