// src/components/ecosystem/GameVisualization.jsx
import React, { useState } from 'react';
import useSimulation from './hooks/useSimulation';
import simulationConfig from './config/SimulationConfig';
import ClassicXPButton from '../ui/ClassicXPButton';

// Import visualization components
import SimulationControls from './controls/SimulationControls';
import PopulationCharts from './visualization/PopulationCharts';
import ForestVisualization from './visualization/ForestVisualization';
import StatisticsPanel from './visualization/StatisticsPanel';
import LogsPanel from './visualization/LogsPanel';
import StatisticsCard from './visualization/StatisticsCard';
import StabilizationOverlay from './visualization/StabilizationOverlay';
import CompletionOverlay from './visualization/CompletionOverlay';
import FeedbackBoard from './visualization/FeedbackBoard'; // New component for player feedback

const GameVisualization = () => {
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

  // Placeholder functions for interaction buttons
  const handleShootDeer = () => {
    addLog("User attempted to shoot a deer", "system");
    // Actual implementation will come later
  };
  
  const handleShootWolf = () => {
    addLog("User attempted to shoot a wolf", "system");
    // Actual implementation will come later
  };
  
  const handleHarvestTree = () => {
    addLog("User attempted to harvest a tree", "system");
    // Actual implementation will come later
  };
  
  const handlePlantSeedling = () => {
    addLog("User attempted to plant a seedling", "system");
    // Actual implementation will come later
  };
  
  // Placeholder player stats
  const playerStats = {
    carbonCaptured: "245 tons",
    moneyEarned: "$1,250",
    animalsKilled: 3,
    treesPlanted: 25,
    ecosystemHealth: "Stable",
    sustainabilityScore: 72
  };
  
  return (
    <div className="game-visualization" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
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
      
      {/* Page Title */}
      <h1 style={{ 
        textAlign: 'center', 
        fontFamily: 'Husky Stash, Tahoma, Arial, sans-serif',
        color: '#228B22',
        fontSize: '26px',
        margin: '5px 0 15px'
      }}>
        The Game
      </h1>
      
      {/* Control Panel */}
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
          Year: {currentYear} / {simulationConfig.years}
        </div>
        
        <ClassicXPButton 
          onClick={startSimulation}
          disabled={!isInitialized || isRunning || isStabilizing || isComplete}
          primary
          size="medium"
        >
          ▶ Play
        </ClassicXPButton>
        
        <ClassicXPButton 
          onClick={stopSimulation}
          disabled={!isInitialized || !isRunning || isStabilizing}
          primary
          size="medium"
          style={{ backgroundColor: '#cd5c5c' }}
        >
          ⏸ Pause
        </ClassicXPButton>
        
        <ClassicXPButton 
          onClick={stepSimulation}
          disabled={!isInitialized || isRunning || isStabilizing || isComplete}
          primary
          size="medium"
        >
          ⏭ Step
        </ClassicXPButton>
        
        <ClassicXPButton 
          onClick={resetSimulation}
          disabled={isStabilizing}
          primary
          size="medium"
          style={{ backgroundColor: '#ff8c00' }}
        >
          🔄 Reset
        </ClassicXPButton>
        
        <div>
          <label style={{ fontSize: '12px', marginRight: '5px' }}>Speed:</label>
          <select 
            value={simulationSpeed} 
            onChange={handleSpeedChange}
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
      
      {/* Main visualization area - new layout according to screenshot */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '3fr 2fr 1fr', 
        gridGap: '10px',
        margin: '0 auto',
        maxWidth: '1400px',
        height: 'calc(100vh - 210px)', /* Adjusts for header, controls, and some padding */
        minHeight: '500px',
        overflow: 'hidden'
      }}>
        {/* Left column - Forest View */}
        <div style={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ 
            flex: '1 1 auto',
            maxHeight: 'calc(100% - 60px)',
            maxWidth: 'calc(100% - 200px)',
            overflow: 'hidden'
          }}>
            <ForestVisualization 
              simulationManager={simulationManager} 
            />
          </div>
        </div>
        
        {/* Center column - Population Charts */}
        <div style={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <div style={{ 
            flex: '1 1 auto',
            maxHeight: '100%',
            overflow: 'hidden'
          }}>
            <PopulationCharts 
              currentYear={currentYear}
              populationData={populationData}
              maxTreePopulation={simulationConfig.graph.MAX_TREE_POPULATION}
              maxDeerPopulation={simulationConfig.graph.MAX_DEER_POPULATION}
              maxWolfPopulation={simulationConfig.graph.MAX_WOLF_POPULATION}
            />
          </div>
        </div>
        
        {/* Right column - Action Buttons and Feedback */}
        <div style={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}>
          {/* Action Buttons */}
          <div style={{ 
            padding: '10px',
            backgroundColor: '#f0f0f0',
            border: '2px outset #ddd',
            borderRadius: '3px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <h3 style={{ 
              textAlign: 'center', 
              margin: '0 0 5px 0',
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '16px',
              borderBottom: '1px solid #ccc',
              paddingBottom: '5px'
            }}>
              Actions
            </h3>
            
            <ClassicXPButton 
              onClick={handleShootDeer}
              primary
              size="medium"
              style={{ 
                backgroundColor: '#8B4513', 
                borderColor: '#5e2d0d',
                color: 'white',
                boxShadow: 'inset 0 1px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
                fontWeight: 'bold',
                padding: '6px 0'
              }}
            >
              🦌 Shoot Deer
            </ClassicXPButton>
            
            <ClassicXPButton 
              onClick={handleShootWolf}
              primary
              size="medium"
              style={{ 
                backgroundColor: '#555', 
                borderColor: '#333',
                color: 'white',
                boxShadow: 'inset 0 1px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
                fontWeight: 'bold',
                padding: '6px 0'
              }}
            >
              🐺 Shoot Wolf
            </ClassicXPButton>
            
            <ClassicXPButton 
              onClick={handleHarvestTree}
              primary
              size="medium"
              style={{ backgroundColor: '#2e7d32', padding: '6px 0' }}
            >
              🌲 Harvest Tree
            </ClassicXPButton>
            
            <ClassicXPButton 
              onClick={handlePlantSeedling}
              primary
              size="medium"
              style={{ backgroundColor: '#4caf50', padding: '6px 0' }}
            >
              🌱 Plant Seedling
            </ClassicXPButton>
          </div>
          
          {/* Feedback board */}
          <div style={{ 
            flex: '1 1 auto',
            backgroundColor: '#f0f0f0',
            border: '2px outset #ddd',
            borderRadius: '3px',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              height: '100%'
            }}>
              {/* Just the stats without the title */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '5px',
                height: '100%'
              }}>
                {Object.entries(playerStats).map(([key, value]) => (
                  <div key={key} style={{
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <div style={{ fontSize: '16px' }}>
                      {key === 'carbonCaptured' ? '🌿' : 
                       key === 'moneyEarned' ? '💰' : 
                       key === 'animalsKilled' ? '🩸' : 
                       key === 'treesPlanted' ? '🌱' : 
                       key === 'ecosystemHealth' ? '❤️' : 
                       key === 'sustainabilityScore' ? '♻️' : '📊'}
                    </div>
                    <div style={{
                      flex: '1',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        fontFamily: 'Tahoma, Arial, sans-serif',
                        fontSize: '12px',
                        color: '#666',
                        textTransform: 'capitalize'
                      }}>
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}:
                      </span>
                      <span style={{
                        fontFamily: 'Tahoma, Arial, sans-serif',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: '#333'
                      }}>
                        {value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Detailed Statistics - Horizontal arrangement */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        margin: '15px auto 0',
        maxWidth: '600px'
      }}>
        <div>
          <StatisticsCard 
            title="TREES" 
            stats={{
              total: stats.trees.total,
              "Avg Age": stats.trees.averageAge?.toFixed(1) || 0,
              Seedlings: stats.trees.ageDistribution?.seedling || 0,
              Young: stats.trees.ageDistribution?.young || 0,
              Mature: stats.trees.ageDistribution?.mature || 0,
              Deaths: stats.trees.totalDeaths || 0,
              "By Age": stats.trees.ageDeaths || 0,
              "By Stress": stats.trees.stressDeaths || 0,
              Eaten: stats.trees.consumedByDeer || 0
            }} 
            color="#228B22" 
            iconEmoji="🌲"
          />
        </div>
        
        <div>
          <StatisticsCard 
            title="DEER" 
            stats={{
              total: stats.deer.total,
              "Avg Age": stats.deer.averageAge?.toFixed(1) || 0,
              "Reproduced": stats.deer.reproducedCount || 0,
              "Migrated": stats.deer.migratedCount || 0,
              "Foraging": stats.deer.averageForagingSuccess || 'N/A',
              Deaths: (stats.deer.starvationDeaths || 0) + (stats.deer.ageDeaths || 0) + (stats.deer.predationDeaths || 0),
              "By Age": stats.deer.ageDeaths || 0,
              "By Starvation": stats.deer.starvationDeaths || 0,
              "By Predation": stats.deer.predationDeaths || 0
            }} 
            color="#8B4513" 
            iconEmoji="🦌"
          />
        </div>
        
        <div>
          <StatisticsCard 
            title="WOLVES" 
            stats={{
              total: stats.wolves.total,
              "Avg Age": stats.wolves.averageAge?.toFixed(1) || 0,
              "Reproduced": stats.wolves.reproducedCount || 0,
              "Migrated": stats.wolves.migratedCount || 0,
              "Hunting": stats.wolves.averageHuntingSuccess || 'N/A',
              "Prey Killed": stats.wolves.preyKilled || 0,
              Deaths: (stats.wolves.starvationDeaths || 0) + (stats.wolves.ageDeaths || 0),
              "By Age": stats.wolves.ageDeaths || 0,
              "By Starvation": stats.wolves.starvationDeaths || 0
            }} 
            color="#555" 
            iconEmoji="🐺"
          />
        </div>
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

export default GameVisualization;