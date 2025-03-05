// src/components/ecosystem/controls/SimulationControls.jsx
import React from 'react';

const SimulationControls = ({
  currentYear, 
  totalYears,
  isInitialized,
  isRunning,
  isStabilizing,
  isComplete,
  simulationSpeed,
  stats,
  onStart,
  onStop,
  onStep,
  onReset,
  onSpeedChange
}) => {
  return (
    <div style={{ 
      backgroundColor: '#e0e0e0', 
      padding: '10px', 
      display: 'flex', 
      justifyContent: 'center',
      gap: '10px',
      borderTop: '2px solid #ccc',
      borderLeft: '2px solid #ccc',
      borderRight: '2px solid #888',
      borderBottom: '2px solid #888',
      marginBottom: '15px',
      flexWrap: 'wrap',
      alignItems: 'center'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
        Year: {currentYear} / {totalYears}
      </div>
      
      <button 
        onClick={onStart} 
        disabled={!isInitialized || isRunning || isStabilizing || isComplete}
        style={{ 
          backgroundColor: '#3cb371', 
          color: 'white',
          padding: '5px 10px',
          border: '2px outset #60e591',
          borderRadius: '2px',
          fontWeight: 'bold',
          fontSize: '12px',
          cursor: (!isInitialized || isRunning || isStabilizing || isComplete) ? 'default' : 'pointer',
          opacity: (!isInitialized || isRunning || isStabilizing || isComplete) ? 0.7 : 1
        }}
      >
        ▶ Play
      </button>
      
      <button 
        onClick={onStop} 
        disabled={!isInitialized || !isRunning || isStabilizing}
        style={{ 
          backgroundColor: '#cd5c5c', 
          color: 'white',
          padding: '5px 10px',
          border: '2px outset #e88080',
          borderRadius: '2px',
          fontWeight: 'bold',
          fontSize: '12px',
          cursor: (!isInitialized || !isRunning || isStabilizing) ? 'default' : 'pointer',
          opacity: (!isInitialized || !isRunning || isStabilizing) ? 0.7 : 1
        }}
      >
        ⏸ Pause
      </button>
      
      <button 
        onClick={onStep} 
        disabled={!isInitialized || isRunning || isStabilizing || isComplete}
        style={{ 
          backgroundColor: '#4169e1', 
          color: 'white',
          padding: '5px 10px',
          border: '2px outset #7191e9',
          borderRadius: '2px',
          fontWeight: 'bold',
          fontSize: '12px',
          cursor: (!isInitialized || isRunning || isStabilizing || isComplete) ? 'default' : 'pointer',
          opacity: (!isInitialized || isRunning || isStabilizing || isComplete) ? 0.7 : 1
        }}
      >
        ⏭ Step
      </button>
      
      <button 
        onClick={onReset} 
        disabled={isStabilizing}
        style={{ 
          backgroundColor: '#ff8c00', 
          color: 'white',
          padding: '5px 10px',
          border: '2px outset #ffae4c',
          borderRadius: '2px',
          fontWeight: 'bold',
          fontSize: '12px',
          opacity: isStabilizing ? 0.7 : 1,
          cursor: isStabilizing ? 'default' : 'pointer'
        }}
      >
        🔄 Reset
      </button>
      
      <div>
        <label style={{ fontSize: '12px', marginRight: '5px' }}>Speed:</label>
        <select 
          value={simulationSpeed} 
          onChange={onSpeedChange}
          disabled={isStabilizing}
          style={{ 
            border: '2px inset #ccc',
            borderRadius: '2px',
            fontSize: '12px',
            backgroundColor: 'white'
          }}
        >
          <option value="2000">Slow</option>
          <option value="1000">Normal</option>
          <option value="500">Fast</option>
          <option value="200">Very Fast</option>
          <option value="50">Ultra Fast</option>
        </select>
      </div>
      
      <div style={{ fontSize: '12px' }}>
        <span style={{ color: '#228B22', marginRight: '10px' }}>● Trees: {stats.trees.total}</span>
        <span style={{ color: '#8B4513', marginRight: '10px' }}>● Deer: {stats.deer.total}</span>
        <span style={{ color: '#555' }}>● Wolves: {stats.wolves.total}</span>
      </div>
    </div>
  );
};

export default SimulationControls;