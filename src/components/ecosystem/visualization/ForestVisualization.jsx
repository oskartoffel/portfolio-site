// src/components/ecosystem/visualization/ForestVisualization.jsx
import React from 'react';
import TreeDensityGrid from './TreeDensityGrid';

const ForestVisualization = ({ simulationManager }) => {
  return (
    <div style={{ 
      backgroundColor: '#f0f0f0',
      padding: '10px',
      border: '2px outset #ddd',
      borderRadius: '3px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h2 style={{ 
        fontSize: '16px', 
        textAlign: 'center', 
        margin: '0 0 10px 0',
        borderBottom: '1px solid #ccc',
        paddingBottom: '5px',
        width: '100%'
      }}>
        Forest Ecosystem
      </h2>
      
      <TreeDensityGrid simulationManager={simulationManager} />
    </div>
  );
};

export default ForestVisualization;