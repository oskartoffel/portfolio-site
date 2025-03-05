// src/components/ecosystem/visualization/PopulationCharts.jsx
import React from 'react';
import PopulationGraph from './PopulationGraph';

const PopulationCharts = ({ 
  currentYear, 
  populationData, 
  maxTreePopulation, 
  maxDeerPopulation, 
  maxWolfPopulation 
}) => {
  return (
    <div style={{ 
      width: '380px',
      padding: '10px',
      backgroundColor: '#f0f0f0',
      border: '2px outset #ddd',
      borderRadius: '3px'
    }}>
      <h2 style={{ 
        fontSize: '16px', 
        textAlign: 'center', 
        margin: '0 0 15px 0',
        borderBottom: '1px solid #ccc',
        paddingBottom: '5px'
      }}>
        Population Dynamics
      </h2>
      
      <PopulationGraph 
        title="Trees" 
        dataKey="trees" 
        color="#228B22" 
        maxPopulation={maxTreePopulation} 
        yLabel="Trees"
        currentYear={currentYear}
        populationData={populationData}
      />
      
      <PopulationGraph 
        title="Deer" 
        dataKey="deer" 
        color="#8B4513" 
        maxPopulation={maxDeerPopulation} 
        yLabel="Deer"
        currentYear={currentYear}
        populationData={populationData}
      />
      
      <PopulationGraph 
        title="Wolves" 
        dataKey="wolves" 
        color="#555" 
        maxPopulation={maxWolfPopulation} 
        yLabel="Wolves"
        currentYear={currentYear}
        populationData={populationData}
      />
    </div>
  );
};

export default PopulationCharts;