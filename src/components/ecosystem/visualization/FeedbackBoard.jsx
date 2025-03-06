// src/components/ecosystem/visualization/FeedbackBoard.jsx
import React from 'react';

// Icons for the different stats
const statIcons = {
  carbonCaptured: '🌿',
  moneyEarned: '💰',
  animalsKilled: '🩸',
  treesPlanted: '🌱',
  ecosystemHealth: '❤️',
  sustainabilityScore: '♻️'
};

const FeedbackBoard = ({ playerStats }) => {
  return (
    <div style={{ 
      backgroundColor: '#f0f0f0',
      padding: '10px',
      border: '2px outset #ddd',
      borderRadius: '3px',
      height: '100%'
    }}>
      <h2 style={{ 
        fontSize: '16px', 
        textAlign: 'center', 
        margin: '0 0 15px 0',
        borderBottom: '1px solid #ccc',
        paddingBottom: '5px',
        fontFamily: 'Tahoma, Arial, sans-serif'
      }}>
        Player Feedback
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '15px',
        justifyContent: 'center'
      }}>
        {Object.entries(playerStats).map(([key, value]) => (
          <div key={key} style={{
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '8px',
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <div style={{ 
              fontSize: '20px', 
              marginBottom: '5px'
            }}>
              {statIcons[key] || '📊'}
            </div>
            
            <div style={{
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '12px',
              color: '#666',
              textTransform: 'capitalize'
            }}>
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
            </div>
            
            <div style={{
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#333',
              marginTop: '5px'
            }}>
              {value}
            </div>
          </div>
        ))}
      </div>
      
      <div style={{
        marginTop: '15px',
        padding: '8px',
        backgroundColor: '#e8f5e9',
        border: '1px solid #c8e6c9',
        borderRadius: '4px',
        fontFamily: 'Tahoma, Arial, sans-serif',
        fontSize: '12px',
        color: '#2e7d32',
        textAlign: 'center'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '3px' }}>Ecosystem Tip:</div>
        <div>Maintaining biodiversity is key to a sustainable forest. Try to keep a balance between predators and prey.</div>
      </div>
    </div>
  );
};

export default FeedbackBoard;