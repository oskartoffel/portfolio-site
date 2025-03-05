// src/pages/EcosystemSimulation.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Window from '../components/ui/Window';
import XPBackground from '../components/ui/XPBackground';
import { SimulationManager } from '../simulation/SimulationManager';

const EcosystemSimulation = () => {
  // We'll render the ecosystem visualization component here
  return (
    <XPBackground>
      <Window title="Ecosystem Simulation" width="95%" height="95%">
        <div style={{ padding: '5px' }}>
          <h1 style={{ textAlign: 'center', marginTop: '0' }}>Forest Ecosystem Simulation</h1>
          <EcosystemVisualization />
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <Link to="/portfolio"><button>Back to Portfolio</button></Link>
          </div>
        </div>
      </Window>
    </XPBackground>
  );
};

// This is the component with the fixes
const EcosystemVisualization = () => {
  // Simulation state
  const [simulationManager, setSimulationManager] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isStabilizing, setIsStabilizing] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentYear, setCurrentYear] = useState(0);
  const [stabilizationProgress, setStabilizationProgress] = useState(0);
  const [simulationSpeed, setSimulationSpeed] = useState(500);
  
  // Stats for display
  const [stats, setStats] = useState({
    trees: { total: 0, averageAge: 0, deaths: 0, youngTrees: 0 },
    deer: { total: 0, averageAge: 0, deaths: 0 },
    wolves: { total: 0, averageAge: 0, deaths: 0 }
  });
  
  // Population data for graphs
  const [populationData, setPopulationData] = useState([]);
  
  // Logs system
  const [logs, setLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  
  // Graph constants
  const MAX_YEARS = 50;
  const MAX_TREE_POPULATION = 5000;
  const MAX_DEER_POPULATION = 100;
  const MAX_WOLF_POPULATION = 50;
  
  // Refs
  const simRef = useRef(null);
  const logsRef = useRef([]);
  const timeoutRef = useRef(null); // Changed from intervalRef to timeoutRef
  const isRunningRef = useRef(false);
  const currentYearRef = useRef(0); // Add a ref to track current year
  
  // Simulation configuration
  const config = {
    gridSize: 10000,
    years: 50,
    stabilizationYears: 10,
    tree: {
      initial: 5000, 
      arraySize: 10000,
      density: 15,
      ageAvg: 30,
      ageSigma: 20,
      maturity: 10,
      stressLevel: 3,
      reproductionFactor: 6,
      edibleAge: 2
    },
    deer: {
      initial: 20,
      arraySize: 500,
      maturity: 2,
      staminaFactor: 5,
      hungerFactor: 3,
      reproductionFactor: 5,
      migrationFactor: 5
    },
    wolf: {
      initial: 5,
      arraySize: 200,
      maturity: 2,
      staminaFactor: 5,
      hungerFactor: 4,
      reproductionFactor: 4,
      migrationFactor: 5
    }
  };
  
  // Add a log entry
  const addLog = (message, type = 'info') => {
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      year: currentYearRef.current, // Use ref instead of state
      type,
      message
    };
    
    logsRef.current = [...logsRef.current, newLog];
    setLogs(logsRef.current);
  };
  
  // Create a data point for population graphs
  const createDataPoint = (year, stats) => {
    return {
      year,
      trees: stats.trees.total,
      deer: stats.deer.total,
      wolves: stats.wolves.total,
      treeAvgAge: stats.trees.averageAge || 0,
      deerAvgAge: stats.deer.averageAge || 0,
      wolfAvgAge: stats.wolves.averageAge || 0,
      youngTrees: stats.trees.youngTrees || stats.trees.ageDistribution?.seedling || 0,
      treeDeaths: stats.trees.totalDeaths || stats.trees.deaths || 0,
      deerDeaths: stats.deer.deaths || 0,
      wolfDeaths: stats.wolves.deaths || 0,
      treeConsumedByDeer: stats.trees.consumedByDeer || 0
    };
  };
  
  // Initialize the simulation
  const initializeSimulation = async () => {
    // Reset state
    setIsInitialized(false);
    setIsStabilizing(true);
    setStabilizationProgress(0);
    setCurrentYear(0);
    currentYearRef.current = 0; // Reset the ref too
    setIsComplete(false);
    setPopulationData([]);
    logsRef.current = [];
    setLogs([]);
    
    try {
      // STEP 1: Create a new simulation manager
      addLog("Creating new simulation manager...", 'system');
      const sim = new SimulationManager(config, 'visualization');
      setSimulationManager(sim);
      simRef.current = sim;
      
      // STEP 2: Initialize the forest (includes stabilization period)
      addLog("Starting simulation initialization and forest stabilization...", 'system');
      
      // Initialize forest
      sim.initialize();
      
      // Simulate the stabilization progress for UI feedback
      for (let i = 0; i <= config.stabilizationYears; i++) {
        setStabilizationProgress(Math.floor((i / config.stabilizationYears) * 100));
        
        if (i % 5 === 0 || i === config.stabilizationYears) {
          const stats = sim.getCurrentStats();
          addLog(`Stabilization Year ${i}: Trees=${stats.trees.total} (Avg Age: ${stats.trees.averageAge.toFixed(1)})`, 'system');
        }
        
        await new Promise(resolve => setTimeout(resolve, 10));
      }
      
      // STEP 3: Get initial stats after stabilization
      const initialStats = sim.getCurrentStats();
      setStats(initialStats);
      
      // STEP 4: Add the first data point (year 0) to the graph data
      const initialDataPoint = createDataPoint(0, initialStats);
      setPopulationData([initialDataPoint]);
      
      addLog("Initialization complete!", 'system');
      addLog(`Initial population: ${initialStats.trees.total} trees, ${initialStats.deer.total} deer, ${initialStats.wolves.total} wolves`, 'system');
      
      // Mark initialization as complete
      setIsStabilizing(false);
      setIsInitialized(true);
    } catch (error) {
      console.error("Simulation initialization error:", error);
      addLog(`Error during initialization: ${error.message}`, 'error');
      setIsStabilizing(false);
    }
  };
  
  // Run a single year of the simulation
  const runSimulationYear = () => {
    if (!simRef.current || !isInitialized || isStabilizing || isComplete) {
      return null;
    }
    
    try {
      // Get the current year from ref (more reliable)
      const nextYear = currentYearRef.current + 1;
      
      // Log year start
      addLog(`Starting Year ${nextYear}`, 'system');
      
      // Run one simulation year
      const yearStats = simRef.current.simulateYear();
      
      // Update year counter in BOTH state and ref
      currentYearRef.current = nextYear;
      setCurrentYear(nextYear);
      
      // Update stats display
      setStats({...yearStats});
      
      // Log detailed statistics
      logDetailedStats(yearStats);
      
      // Create and add new data point to graph data
      const newDataPoint = createDataPoint(nextYear, yearStats);
      setPopulationData(prevData => [...prevData, newDataPoint]);
      
      // Check if simulation is complete
      if (nextYear >= config.years) {
        addLog("Simulation complete!", 'system');
        setIsRunning(false);
        isRunningRef.current = false;
        setIsComplete(true);
        
        // Clean up timeout if running
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      }
      
      return yearStats;
    } catch (error) {
      console.error("Error running simulation year:", error);
      addLog(`Error during simulation: ${error.message}`, 'error');
      setIsRunning(false);
      isRunningRef.current = false;
      
      // Clean up timeout if running
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      return null;
    }
  };
  
  // Log detailed statistics
  const logDetailedStats = (yearStats) => {
    // Tree stats
    addLog(`Trees: ${yearStats.trees.total} (Avg Age: ${yearStats.trees.averageAge?.toFixed(1)})`, 'tree');
    addLog(`  - Young: ${yearStats.trees.youngTrees || yearStats.trees.ageDistribution?.seedling || 0}`, 'tree');
    addLog(`  - Deaths: ${yearStats.trees.totalDeaths || yearStats.trees.deaths || 0}`, 'tree');
    addLog(`  - Eaten by deer: ${yearStats.trees.consumedByDeer || 0}`, 'tree');
    
    // Deer stats
    addLog(`Deer: ${yearStats.deer.total} (Avg Age: ${yearStats.deer.averageAge?.toFixed(1)})`, 'deer');
    addLog(`  - Migrated: ${yearStats.deer.migratedCount || 0}`, 'deer');
    addLog(`  - Reproduced: ${yearStats.deer.reproducedCount || 0}`, 'deer');
    addLog(`  - Deaths: Age=${yearStats.deer.ageDeaths || 0}, Starvation=${yearStats.deer.starvationDeaths || 0}, Predation=${yearStats.deer.predationDeaths || 0}`, 'deer');
    
    // Wolf stats
    addLog(`Wolves: ${yearStats.wolves.total} (Avg Age: ${yearStats.wolves.averageAge?.toFixed(1)})`, 'wolf');
    addLog(`  - Migrated: ${yearStats.wolves.migratedCount || 0}`, 'wolf');
    addLog(`  - Reproduced: ${yearStats.wolves.reproducedCount || 0}`, 'wolf');
    addLog(`  - Prey killed: ${yearStats.wolves.preyKilled || 0}`, 'wolf');
    addLog(`  - Deaths: Age=${yearStats.wolves.ageDeaths || 0}, Starvation=${yearStats.wolves.starvationDeaths || 0}`, 'wolf');
  };
  
  // Initialize on component mount
  useEffect(() => {
    initializeSimulation();
    
    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  // MAJOR CHANGE: Changed from setInterval to recursive setTimeout
  const runContinuously = () => {
    // Check if we should still be running
    if (!isRunningRef.current || currentYearRef.current >= config.years) {
      isRunningRef.current = false;
      setIsRunning(false);
      if (currentYearRef.current >= config.years) {
        setIsComplete(true);
      }
      return;
    }
    
    // Run one simulation year
    const yearStats = runSimulationYear();
    
    // If we should continue running, schedule the next iteration
    if (isRunningRef.current && currentYearRef.current < config.years) {
      timeoutRef.current = setTimeout(runContinuously, simulationSpeed);
    }
  };
  
  // Start button handler - completely rewritten
  const handleStart = () => {
    if (!isInitialized || isStabilizing || isComplete || isRunningRef.current) return;
    
    // Set running flags
    isRunningRef.current = true;
    setIsRunning(true);
    
    addLog("Simulation running", 'system');
    
    // Start the recursive process
    runContinuously();
  };
  
  // Stop the simulation
  const handleStop = () => {
    isRunningRef.current = false;
    setIsRunning(false);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    addLog("Simulation paused", 'system');
  };
  
  // Step button handler
  const handleStep = () => {
    if (!isInitialized || isStabilizing || isComplete) return;
    
    // If currently running, stop first
    if (isRunningRef.current) {
      handleStop();
    }
    
    // Run one year
    runSimulationYear();
  };
  
  // Reset button handler
  const handleReset = () => {
    handleStop();
    initializeSimulation();
  };
  
  const handleSpeedChange = (e) => {
    const newSpeed = Number(e.target.value);
    setSimulationSpeed(newSpeed);
  };
  
  const handleToggleLogs = () => {
    setShowLogs(!showLogs);
  };
  
  const handleExportLogs = () => {
    const logData = JSON.stringify(logs, null, 2);
    const blob = new Blob([logData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ecosystem-simulation-logs-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addLog("Logs exported", 'system');
  };
  
  // Render tree density grid
  const renderTreeDensityGrid = () => {
    if (!simulationManager?.treeManager) return null;
    
    // Create a density map from the 100x100 grid
    // For visualization, we'll use a 20x20 density grid (5x5 cells aggregated)
    const gridDimension = 100; // Original 100x100 grid
    const densityGridSize = 20; // 20x20 visualization grid
    const cellSize = 15; // Display cell size
    
    const densityGrid = Array(densityGridSize).fill().map(() => Array(densityGridSize).fill(0));
    const maxTreesPerCell = 25; // 5x5 cells could have at most 25 trees
    
    // Calculate tree density
    simulationManager.treeManager.trees.forEach((tree, index) => {
      if (tree && tree.position !== 0) {
        // Convert linear position to x,y in 100x100 grid
        const x = index % gridDimension;
        const y = Math.floor(index / gridDimension);
        
        // Map to density grid position
        const densityX = Math.floor(x / (gridDimension / densityGridSize));
        const densityY = Math.floor(y / (gridDimension / densityGridSize));
        
        // Increment density counter if within bounds
        if (densityX < densityGridSize && densityY < densityGridSize) {
          densityGrid[densityY][densityX]++;
        }
      }
    });
    
    const gridStyle = {
      display: 'grid',
      gridTemplateColumns: `repeat(${densityGridSize}, ${cellSize}px)`,
      gap: '1px',
      margin: '0 auto',
      border: '2px solid #888',
      padding: '2px',
      backgroundColor: '#c0c0c0',
      width: `${cellSize * densityGridSize + densityGridSize}px`,
      height: `${cellSize * densityGridSize + densityGridSize}px`,
      boxShadow: 'inset 2px 2px 3px rgba(0,0,0,0.3)'
    };
    
    // Color function for density
    const getDensityColor = (density) => {
      // Calculate density percentage
      const percentage = Math.min(1, density / maxTreesPerCell);
      
      if (percentage === 0) {
        return '#a0a0a0'; // Empty cell
      }
      
      // Green shades based on density
      if (percentage < 0.2) {
        return '#dab88b'; // Light brown for very sparse
      } else if (percentage < 0.4) {
        return '#c2e088'; // Light green-yellow for sparse
      } else if (percentage < 0.6) {
        return '#8ed861'; // Light green for medium
      } else if (percentage < 0.8) {
        return '#4caf50'; // Green for dense
      } else {
        return '#2e7d32'; // Dark green for very dense
      }
    };
    
    return (
      <div style={gridStyle}>
        {densityGrid.flatMap((row, y) => 
          row.map((density, x) => {
            return (
              <div 
                key={`${x}-${y}`} 
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  backgroundColor: getDensityColor(density),
                  border: '1px outset #ddd',
                  boxSizing: 'border-box'
                }} 
                title={`Density: ${density} trees`}
              />
            );
          })
        )}
      </div>
    );
  };
  
  // Render species statistics card
  const renderStatCard = (title, stats, color, iconEmoji) => {
    return (
      <div style={{ 
        backgroundColor: '#f0f0f0', 
        border: `1px solid ${color}`,
        borderRadius: '2px',
        padding: '8px',
        fontSize: '12px',
        width: '100%',
        marginBottom: '10px'
      }}>
        <div style={{ 
          fontWeight: 'bold', 
          backgroundColor: color, 
          color: 'white',
          padding: '4px', 
          marginBottom: '5px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}>
          <span>{iconEmoji}</span>
          <span>{title}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px' }}>
          {Object.entries(stats).map(([key, value]) => (
            <React.Fragment key={key}>
              <div style={{ textAlign: 'left', fontSize: '11px' }}>{key}:</div>
              <div style={{ textAlign: 'right', fontWeight: key === 'total' ? 'bold' : 'normal', fontSize: '11px' }}>
                {typeof value === 'number' ? 
                  (Number.isInteger(value) ? value : value.toFixed(1)) : 
                  value}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };
  
  // Render population graphs with sliding window approach
  const renderPopulationGraph = (title, dataKey, color, maxPopulation, yLabel) => {
    // Graph dimensions
    const graphWidth = 360;
    const graphHeight = 150;
    const padding = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = graphWidth - padding.left - padding.right;
    const innerHeight = graphHeight - padding.top - padding.bottom;
    
    // Determine visible window for the graph - exactly like in debuginterface
    const visibleYears = 20; // Show 20 years at a time
    
    // Calculate visible data range
    const startYear = Math.max(0, currentYear - visibleYears + 1);
    const visibleData = populationData.filter(d => d.year >= startYear && d.year <= currentYear);
    
    // Define scales based on visible window
    const xScale = innerWidth / (visibleYears - 1 || 1); // Avoid division by zero
    const yScale = innerHeight / maxPopulation;
    
    // Generate line points for visible data only
    const points = visibleData.map((d) => {
      // Map year to x position relative to the visible window
      const x = padding.left + ((d.year - startYear) * xScale);
      const y = padding.top + innerHeight - (d[dataKey] * yScale);
      return `${x},${y}`;
    }).join(' ');
    
    // Current value is the latest data point
    const currentValue = populationData.length > 0 
      ? populationData[populationData.length - 1][dataKey] 
      : 0;
    
    // Calculate visible x-axis labels based on current window
    const visibleXLabels = [];
    const numLabels = 6;
    for (let i = 0; i < numLabels; i++) {
      const yearOffset = Math.floor(i * (visibleYears - 1) / (numLabels - 1));
      visibleXLabels.push(startYear + yearOffset);
    }
    
    return (
      <div style={{ marginBottom: '15px' }}>
        <div style={{ 
          fontSize: '12px', 
          fontWeight: 'bold', 
          backgroundColor: color, 
          color: 'white',
          padding: '4px',
          marginBottom: '5px',
          textAlign: 'center'
        }}>
          {title}
        </div>
        
        <div style={{
          position: 'relative',
          width: `${graphWidth}px`,
          height: `${graphHeight}px`,
          border: '2px inset #aaa',
          backgroundColor: '#f8f8f8',
          margin: '0 auto'
        }}>
          {/* Y-axis grid lines */}
          {Array.from({ length: 5 }).map((_, i) => {
            const y = padding.top + i * (innerHeight / 4);
            const label = maxPopulation - i * (maxPopulation / 4);
            return (
              <React.Fragment key={`grid-y-${i}`}>
                <line 
                  x1={padding.left} 
                  y1={y} 
                  x2={graphWidth - padding.right} 
                  y2={y} 
                  stroke="#ddd" 
                  strokeWidth="1"
                  style={{ position: 'absolute' }}
                />
                <div style={{ 
                  position: 'absolute', 
                  left: '2px', 
                  top: `${y - 8}px`, 
                  fontSize: '10px',
                  color: '#666'
                }}>
                  {label}
                </div>
              </React.Fragment>
            );
          })}
          
          {/* X-axis grid lines and labels - now based on visible window */}
          {visibleXLabels.map((year, i) => {
            const x = padding.left + (i * innerWidth / (numLabels - 1));
            return (
              <React.Fragment key={`grid-x-${i}`}>
                <line 
                  x1={x} 
                  y1={padding.top} 
                  x2={x} 
                  y2={graphHeight - padding.bottom} 
                  stroke="#ddd" 
                  strokeWidth="1"
                  style={{ position: 'absolute' }}
                />
                <div style={{ 
                  position: 'absolute', 
                  left: `${x - 10}px`, 
                  bottom: '2px', 
                  fontSize: '10px',
                  color: '#666'
                }}>
                  {year}
                </div>
              </React.Fragment>
            );
          })}
          
          {/* Y-axis label */}
          <div style={{ 
            position: 'absolute', 
            left: '-25px',
            top: '50%',
            transform: 'rotate(-90deg) translateX(50%)',
            fontSize: '10px',
            color: '#666'
          }}>
            {yLabel}
          </div>
          
          {/* X-axis label */}
          <div style={{ 
            position: 'absolute', 
            bottom: '0px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '10px',
            color: '#666'
          }}>
            Year
          </div>
          
          {/* Population line - only for visible data */}
          {visibleData.length > 1 && (
            <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
              <polyline 
                points={points} 
                fill="none" 
                stroke={color} 
                strokeWidth="2" 
              />
              
              {/* Current value marker */}
              {visibleData.length > 0 && (
                <circle 
                  cx={padding.left + ((visibleData[visibleData.length - 1].year - startYear) * xScale)}
                  cy={padding.top + innerHeight - (visibleData[visibleData.length - 1][dataKey] * yScale)}
                  r="4"
                  fill="white"
                  stroke={color}
                  strokeWidth="2"
                />
              )}
            </svg>
          )}
          
          {/* Current value text */}
          <div style={{
            position: 'absolute',
            top: '5px',
            right: '10px',
            fontSize: '12px',
            fontWeight: 'bold',
            padding: '2px 5px',
            backgroundColor: 'rgba(255,255,255,0.7)',
            border: `1px solid ${color}`,
            borderRadius: '3px',
            color: color
          }}>
            {currentValue}
          </div>
        </div>
      </div>
    );
  };
  
  // Render logs with color coding
  const renderLogs = () => {
    const getLogColor = (type) => {
      switch (type) {
        case 'error': return '#f44336';
        case 'system': return '#2196f3';
        case 'tree': return '#4caf50';
        case 'deer': return '#8B4513';
        case 'wolf': return '#555';
        default: return '#666';
      }
    };
    
    return (
      <div style={{
        maxHeight: '300px',
        overflowY: 'auto',
        border: '2px inset #aaa',
        backgroundColor: '#f8f8f8',
        padding: '10px',
        fontFamily: 'monospace',
        fontSize: '12px',
        lineHeight: '1.3'
      }}>
        {logs.map(log => (
          <div key={log.id} style={{ 
            marginBottom: '2px',
            paddingBottom: '2px',
            borderBottom: '1px solid #eee',
            color: getLogColor(log.type)
          }}>
            <span style={{ fontWeight: 'bold' }}>
              [Year {log.year}]
            </span> {log.message}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="ecosystem-visualization" style={{ fontFamily: 'Tahoma, Arial, sans-serif' }}>
      {/* Stabilization overlay */}
      {isStabilizing && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center',
          zIndex: 1000,
          color: 'white'
        }}>
          <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Forest Stabilization in Progress</h3>
          <div style={{ width: '300px', backgroundColor: '#333', borderRadius: '4px', padding: '3px' }}>
            <div style={{ 
              width: `${stabilizationProgress}%`, 
              backgroundColor: '#2ecc71',
              height: '20px',
              borderRadius: '2px',
              transition: 'width 0.3s'
            }}></div>
          </div>
          <p style={{ marginTop: '10px' }}>
            {stabilizationProgress}% Complete - Simulating {config.stabilizationYears} Years of Forest Growth
          </p>
        </div>
      )}
      
      {/* Simulation complete overlay */}
      {isComplete && (
        <div style={{ 
          position: 'fixed', 
          top: '20px', 
          left: '50%', 
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0,0,0,0.8)',
          padding: '10px 20px',
          borderRadius: '5px',
          color: 'white',
          zIndex: 999,
          fontSize: '16px',
          fontWeight: 'bold'
        }}>
          Simulation Complete - {config.years} Years
        </div>
      )}
      
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
          Year: {currentYear} / {config.years}
        </div>
        
        <button 
          onClick={handleStart} 
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
          onClick={handleStop} 
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
          onClick={handleStep} 
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
          onClick={handleReset} 
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
      
      {/* Main visualization area */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {/* Left column - Population Charts */}
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
          
          {renderPopulationGraph('Trees', 'trees', '#228B22', MAX_TREE_POPULATION, 'Trees')}
          {renderPopulationGraph('Deer', 'deer', '#8B4513', MAX_DEER_POPULATION, 'Deer')}
          {renderPopulationGraph('Wolves', 'wolves', '#555', MAX_WOLF_POPULATION, 'Wolves')}
        </div>
        
        {/* Center column - Forest View */}
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
          
          {renderTreeDensityGrid()}
          
          <div style={{ 
            marginTop: '10px', 
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: '5px',
            fontSize: '11px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <div style={{ width: '10px', height: '10px', backgroundColor: '#dab88b' }}></div>
              <span>Very sparse</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <div style={{ width: '10px', height: '10px', backgroundColor: '#c2e088' }}></div>
              <span>Sparse</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <div style={{ width: '10px', height: '10px', backgroundColor: '#8ed861' }}></div>
              <span>Medium</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <div style={{ width: '10px', height: '10px', backgroundColor: '#4caf50' }}></div>
              <span>Dense</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <div style={{ width: '10px', height: '10px', backgroundColor: '#2e7d32' }}></div>
              <span>Very dense</span>
            </div>
          </div>
        </div>
        
        {/* Right column - Statistics */}
        <div style={{ 
          width: '220px',
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
            Detailed Statistics
          </h2>
          
          {renderStatCard("TREES", {
            total: stats.trees.total,
            "Avg Age": stats.trees.averageAge?.toFixed(1) || 0,
            Seedlings: stats.trees.ageDistribution?.seedling || 0,
            Young: stats.trees.ageDistribution?.young || 0,
            Mature: stats.trees.ageDistribution?.mature || 0,
            Deaths: stats.trees.totalDeaths || 0,
            "By Age": stats.trees.ageDeaths || 0,
            "By Stress": stats.trees.stressDeaths || 0,
            Eaten: stats.trees.consumedByDeer || 0
          }, "#228B22", "🌲")}
          
          {renderStatCard("DEER", {
            total: stats.deer.total,
            "Avg Age": stats.deer.averageAge?.toFixed(1) || 0,
            "Reproduced": stats.deer.reproducedCount || 0,
            "Migrated": stats.deer.migratedCount || 0,
            "Foraging": stats.deer.averageForagingSuccess || 'N/A',
            Deaths: (stats.deer.starvationDeaths || 0) + (stats.deer.ageDeaths || 0) + (stats.deer.predationDeaths || 0),
            "By Age": stats.deer.ageDeaths || 0,
            "By Starvation": stats.deer.starvationDeaths || 0,
            "By Predation": stats.deer.predationDeaths || 0
          }, "#8B4513", "🦌")}
          
          {renderStatCard("WOLVES", {
            total: stats.wolves.total,
            "Avg Age": stats.wolves.averageAge?.toFixed(1) || 0,
            "Reproduced": stats.wolves.reproducedCount || 0,
            "Migrated": stats.wolves.migratedCount || 0,
            "Hunting": stats.wolves.averageHuntingSuccess || 'N/A',
            "Prey Killed": stats.wolves.preyKilled || 0,
            Deaths: (stats.wolves.starvationDeaths || 0) + (stats.wolves.ageDeaths || 0),
            "By Age": stats.wolves.ageDeaths || 0,
            "By Starvation": stats.wolves.starvationDeaths || 0
          }, "#555", "🐺")}
          
          {/* Log control buttons */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginTop: '15px',
            gap: '5px'
          }}>
            <button
              onClick={handleToggleLogs}
              style={{
                padding: '4px 8px',
                fontSize: '12px',
                backgroundColor: showLogs ? '#4caf50' : '#e0e0e0',
                color: showLogs ? 'white' : 'black',
                border: '2px outset #ddd',
                borderRadius: '3px',
                cursor: 'pointer',
                flex: 1
              }}
            >
              {showLogs ? 'Hide Logs' : 'Show Logs'}
            </button>
            
            <button
              onClick={handleExportLogs}
              disabled={logs.length === 0}
              style={{
                padding: '4px 8px',
                fontSize: '12px',
                backgroundColor: logs.length === 0 ? '#e0e0e0' : '#2196f3',
                color: logs.length === 0 ? '#999' : 'white',
                border: '2px outset #ddd',
                borderRadius: '3px',
                cursor: logs.length === 0 ? 'default' : 'pointer',
                opacity: logs.length === 0 ? 0.7 : 1,
                flex: 1
              }}
            >
              Export Logs
            </button>
          </div>
        </div>
      </div>
      
      {/* Logs panel (collapsible) */}
      {showLogs && (
        <div style={{
          backgroundColor: '#f0f0f0',
          padding: '10px',
          border: '2px outset #ddd',
          borderRadius: '3px',
          marginTop: '20px',
          width: '100%',
          maxWidth: '1200px',
          margin: '20px auto 0'
        }}>
          <h2 style={{ 
            fontSize: '16px', 
            textAlign: 'center', 
            margin: '0 0 10px 0',
            borderBottom: '1px solid #ccc',
            paddingBottom: '5px'
          }}>
            Simulation Logs
          </h2>
          {renderLogs()}
        </div>
      )}
    </div>
  );
};

export default EcosystemSimulation;