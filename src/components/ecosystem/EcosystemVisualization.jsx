// src/components/ecosystem/EcosystemVisualization.jsx
import React, { useState } from 'react';
import useSimulation from './hooks/useSimulation';
import simulationConfig from './config/SimulationConfig';

// Import visualization components
import SimulationControls from './controls/SimulationControls';
import PopulationCharts from './visualization/PopulationCharts';
import ForestVisualization from './visualization/ForestVisualization';
import StatisticsPanel from './visualization/StatisticsPanel';
import LogsPanel from './visualization/LogsPanel';
import StabilizationOverlay from './visualization/StabilizationOverlay';
import CompletionOverlay from './visualization/CompletionOverlay';

const EcosystemVisualization = () => {
  // State for showing logs
  const [showLogs, setShowLogs] = useState(false);
  
  // Use the simulation hook
  const {
    simulationManager,
    isInitialized,
    isStabilizing,
    isRunning,
    isComplete,
    currentYear,
    stabilizationProgress,
    simulationSpeed,
    stats,
    populationData,
    logs,
    startSimulation,
    stopSimulation,
    stepSimulation,
    resetSimulation,
    setSpeed,
    exportLogs,
    addLog
  } = useSimulation(simulationConfig);
  
  // Event handlers
  const handleToggleLogs = () => {
    setShowLogs(!showLogs);
  };
  
  const handleSpeedChange = (e) => {
    setSpeed(Number(e.target.value));
  };
  
  return (
    <div className="ecosystem-visualization" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
      {/* Stabilization overlay */}
      <StabilizationOverlay 
        isStabilizing={isStabilizing} 
        stabilizationProgress={stabilizationProgress}
        stabilizationYears={simulationConfig.stabilizationYears}
      />
      
      {/* Simulation complete overlay */}
      <CompletionOverlay 
        isComplete={isComplete} 
        years={simulationConfig.years} 
      />
      
      {/* Control Panel */}
      <SimulationControls
        currentYear={currentYear}
        totalYears={simulationConfig.years}
        isInitialized={isInitialized}
        isRunning={isRunning}
        isStabilizing={isStabilizing}
        isComplete={isComplete}
        simulationSpeed={simulationSpeed}
        stats={stats}
        onStart={startSimulation}
        onStop={stopSimulation}
        onStep={stepSimulation}
        onReset={resetSimulation}
        onSpeedChange={handleSpeedChange}
      />
      
      {/* Main visualization area */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {/* Left column - Population Charts */}
        <PopulationCharts 
          currentYear={currentYear}
          populationData={populationData}
          maxTreePopulation={simulationConfig.graph.MAX_TREE_POPULATION}
          maxDeerPopulation={simulationConfig.graph.MAX_DEER_POPULATION}
          maxWolfPopulation={simulationConfig.graph.MAX_WOLF_POPULATION}
        />
        
        {/* Center column - Forest View */}
        <ForestVisualization 
          simulationManager={simulationManager} 
        />
        
        {/* Right column - Statistics */}
        <StatisticsPanel 
          stats={stats}
          showLogs={showLogs}
          onToggleLogs={handleToggleLogs}
          onExportLogs={exportLogs}
          logs={logs}
        />
      </div>
      
      {/* Logs panel (collapsible) */}
      <LogsPanel 
        logs={logs}
        showLogs={showLogs}
        onToggleLogs={handleToggleLogs}
        onExportLogs={exportLogs}
      />
    </div>
  );
};

export default EcosystemVisualization;