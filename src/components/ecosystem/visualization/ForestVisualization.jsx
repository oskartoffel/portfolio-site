// src/components/ecosystem/visualization/ForestVisualization.jsx
import React, { useState } from 'react';
import TreeDensityGrid from './TreeDensityGrid';
import CanvasTreeDensityGrid from './CanvasTreeDensityGrid';

const ForestVisualization = ({ simulationManager }) => {
  const [useCanvasView, setUseCanvasView] = useState(true);
  
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
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: '10px',
        borderBottom: '1px solid #ccc',
        paddingBottom: '5px'
      }}>
        <h2 style={{ 
          fontSize: '16px', 
          margin: 0
        }}>
          Forest Ecosystem
        </h2>
        
        <div style={{
          display: 'flex',
          gap: '5px',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '11px' }}>View:</span>
          <button 
            onClick={() => setUseCanvasView(true)}
            style={{
              backgroundColor: useCanvasView ? '#2874A6' : '#e0e0e0',
              color: useCanvasView ? 'white' : 'black',
              border: '2px outset #ddd',
              borderRadius: '2px',
              padding: '2px 8px',
              fontSize: '11px',
              cursor: 'pointer'
            }}
          >
            Enhanced
          </button>
          <button 
            onClick={() => setUseCanvasView(false)}
            style={{
              backgroundColor: !useCanvasView ? '#2874A6' : '#e0e0e0',
              color: !useCanvasView ? 'white' : 'black',
              border: '2px outset #ddd',
              borderRadius: '2px',
              padding: '2px 8px',
              fontSize: '11px',
              cursor: 'pointer'
            }}
          >
            Grid
          </button>
        </div>
      </div>
      
      {useCanvasView ? (
        <CanvasTreeDensityGrid simulationManager={simulationManager} />
      ) : (
        <TreeDensityGrid simulationManager={simulationManager} />
      )}
      
      <div style={{ 
        marginTop: '10px', 
        fontSize: '11px', 
        fontStyle: 'italic',
        textAlign: 'center',
        color: '#666'
      }}>
        {useCanvasView 
          ? "Enhanced view shows the forest with natural tree distribution patterns." 
          : "Grid view divides the forest into regions by tree density."}
      </div>
    </div>
  );
};

export default ForestVisualization;