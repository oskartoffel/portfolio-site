// src/components/EcosystemVisualization.jsx
import React, { useState, useEffect, useRef } from 'react';
import { SimulationManager } from '../simulation/SimulationManager';

const EcosystemVisualization = () => {
  // Simulation manager and state
  const [simulation, setSimulation] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isStabilizing, setIsStabilizing] = useState(false);
  const [stabilizationProgress, setStabilizationProgress] = useState(0);
  const [currentYear, setCurrentYear] = useState(0);
  const [simulationSpeed, setSimulationSpeed] = useState(1000); // ms between steps
  
  // Stats for display
  const [stats, setStats] = useState({
    trees: { total: 0, averageAge: 0, deaths: 0, youngTrees: 0 },
    deer: { total: 0, averageAge: 0, deaths: 0 },
    wolves: { total: 0, averageAge: 0, deaths: 0 }
  });
  
  // Historical data for graphs
  const [populationData, setPopulationData] = useState([]);
  
  // Fixed graph size
  const maxYears = 30; // Show max 30 years on graph
  const maxTreePopulation = 500;
  const maxDeerPopulation = 100;
  const maxWolfPopulation = 50;
  
  // Animation refs
  const animationRef = useRef(null);
  const lastRunTimeRef = useRef(Date.now());
  
  // Config settings - adjusted to be more appropriate for visualization
  const config = {
    gridSize: 900, // For a 30x30 grid
    years: 100,
    stabilizationYears: 10,
    tree: {
      initial: 300, 
      arraySize: 900,
      density: 5,
      ageAvg: 15,
      ageSigma: 10,
      maturity: 5,
      stressIndex: 6 // Using new scale (1-10)
    },
    deer: {
      initial: 20,
      arraySize: 200,
      maturity: 2,
      staminaFactor: 5, // Using new scale (1-10)
      hungerFactor: 5,  // Using new scale (1-10)
      migrationFactor: 5
    },
    wolf: {
      initial: 5,
      arraySize: 100,
      maturity: 2,
      staminaFactor: 5, // Using new scale (1-10)
      hungerFactor: 5,  // Using new scale (1-10)
      migrationFactor: 5
    }
  };
  
  // Initialize the simulation
  useEffect(() => {
    initializeSimulation();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  // Animation loop
  useEffect(() => {
    if (isRunning && !isStabilizing) {
      const runLoop = () => {
        const now = Date.now();
        if (now - lastRunTimeRef.current >= simulationSpeed) {
          runSimulationYear();
          lastRunTimeRef.current = now;
        }
        animationRef.current = requestAnimationFrame(runLoop);
      };
      
      animationRef.current = requestAnimationFrame(runLoop);
      
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isRunning, isStabilizing, simulationSpeed]);
  
  const initializeSimulation = async () => {
    setIsStabilizing(true);
    setStabilizationProgress(0);
    setCurrentYear(0);
    setPopulationData([]);
    
    // Create a new simulation manager
    const sim = new SimulationManager(config, 'visualization');
    setSimulation(sim);
    
    // Initial planting of trees
    sim.treeManager.initialPlanting(
      config.tree.initial,
      config.tree.ageAvg,
      config.tree.ageSigma
    );
    
    // Initial population data point
    updatePopulationData(-config.stabilizationYears, sim);
    
    // Run stabilization period (just for trees)
    for (let i = 0; i < config.stabilizationYears; i++) {
      setStabilizationProgress(Math.floor((i / config.stabilizationYears) * 100));
      
      // Grow trees
      sim.treeManager.grow();
      sim.treeManager.processConcurrence(config.tree.density);
      sim.treeManager.processStressDeaths(config.tree.stressIndex);
      sim.treeManager.reproduce(config.tree.maturity);
      sim.treeManager.processAgeDeaths();
      
      updatePopulationData(-config.stabilizationYears + i + 1, sim);
      
      // Pause to allow UI to update
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    // Initialize animals after stabilization
    sim.deerManager.initialize(
      config.deer.initial,
      config.deer.arraySize,
      config.deer.staminaFactor,
      config.deer.hungerFactor
    );
    
    sim.wolfManager.initialize(
      config.wolf.initial,
      config.wolf.arraySize,
      config.wolf.staminaFactor,
      config.wolf.hungerFactor
    );
    
    // Update final population data after stabilization
    updatePopulationData(0, sim);
    
    setIsStabilizing(false);
    updateStats(sim);
  };
  
  const updatePopulationData = (year, sim) => {
    const treeStats = sim.treeManager.getDetailedStatistics();
    
    // During stabilization, only trees have data
    const deerStats = year < 0 ? { total: 0, averageAge: 0 } : sim.deerManager.getDetailedStatistics();
    const wolfStats = year < 0 ? { total: 0, averageAge: 0 } : sim.wolfManager.getDetailedStatistics();
    
    const newDataPoint = {
      year,
      trees: treeStats.total,
      deer: deerStats.total,
      wolves: wolfStats.total,
      treeAvgAge: treeStats.averageAge || 0,
      deerAvgAge: deerStats.averageAge || 0,
      wolfAvgAge: wolfStats.averageAge || 0,
      youngTrees: treeStats.ageDistribution?.seedling || 0,
      treeDeaths: treeStats.totalDeaths || 0,
      deerDeaths: (deerStats.starvationDeaths || 0) + (deerStats.ageDeaths || 0) + (deerStats.predationDeaths || 0),
      wolfDeaths: (wolfStats.starvationDeaths || 0) + (wolfStats.ageDeaths || 0)
    };
    
    setPopulationData(prev => [...prev, newDataPoint]);
  };
  
  const updateStats = (sim) => {
    if (!sim) return;
    
    const treeStats = sim.treeManager.getDetailedStatistics();
    const deerStats = sim.deerManager.getDetailedStatistics();
    const wolfStats = sim.wolfManager.getDetailedStatistics();
    
    setStats({
      trees: treeStats,
      deer: deerStats,
      wolves: wolfStats
    });
  };
  
  const runSimulationYear = () => {
    if (!simulation || isStabilizing) return;
    
    try {
      // Follow SimulationManager's exact order of operations
      
      // Tree lifecycle
      simulation.treeManager.processConcurrence(config.tree.density);
      simulation.treeManager.grow();
      simulation.treeManager.processAgeDeaths();
      simulation.treeManager.processStressDeaths(config.tree.stressIndex);
      simulation.treeManager.reproduce(config.tree.maturity);
      
      // Deer lifecycle
      const deerPopulation = simulation.deerManager.getPopulationCount();
      if (deerPopulation < 10) {
        simulation.deerManager.processMigration(config.deer.migrationFactor);
      } else if (Math.random() < 0.2) {
        simulation.deerManager.processMigration(config.deer.migrationFactor * 0.5);
      }
      
      simulation.deerManager.reproduce(config.deer.maturity);
      simulation.deerManager.grow(
        config.deer.staminaFactor,
        config.deer.hungerFactor
      );
      simulation.deerManager.processNaturalDeaths();
      simulation.deerManager.processFeeding(simulation.treeManager.trees, 2, simulation.treeManager);
      
      // Wolf lifecycle
      const wolfPopulation = simulation.wolfManager.getPopulationCount();
      if (wolfPopulation < 3) {
        simulation.wolfManager.processMigration(config.wolf.migrationFactor);
      } else if (Math.random() < 0.1) {
        simulation.wolfManager.processMigration(config.wolf.migrationFactor * 0.3);
      }
      
      simulation.wolfManager.reproduce(config.wolf.maturity);
      simulation.wolfManager.grow(
        config.wolf.staminaFactor,
        config.wolf.hungerFactor
      );
      simulation.wolfManager.processNaturalDeaths();
      simulation.wolfManager.processHunting(simulation.deerManager);
      
      // Update year and stats
      setCurrentYear(prev => prev + 1);
      updateStats(simulation);
      updatePopulationData(currentYear + 1, simulation);
      
    } catch (error) {
      console.error("Simulation error:", error);
      setIsRunning(false);
    }
  };
  
  const handleStart = () => {
    if (isStabilizing) return;
    setIsRunning(true);
  };
  
  const handleStop = () => {
    setIsRunning(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };
  
  const handleReset = async () => {
    handleStop();
    await initializeSimulation();
  };
  
  const handleRunYear = () => {
    if (isStabilizing) return;
    runSimulationYear();
  };
  
  const handleSpeedChange = (e) => {
    setSimulationSpeed(Number(e.target.value));
  };
  
  // Render tree grid - large, square and central
  const renderTreeGrid = () => {
    if (!simulation?.treeManager) return null;
    
    const gridDimension = Math.sqrt(config.gridSize);
    const cellSize = 12; // Larger cell size
    
    const gridStyle = {
      display: 'grid',
      gridTemplateColumns: `repeat(${gridDimension}, ${cellSize}px)`,
      gap: '1px',
      margin: '0 auto',
      border: '2px solid #888',
      padding: '2px',
      backgroundColor: '#c0c0c0',
      width: `${cellSize * gridDimension + gridDimension}px`,
      height: `${cellSize * gridDimension + gridDimension}px`,
      boxShadow: 'inset 2px 2px 3px rgba(0,0,0,0.3)'
    };
    
    return (
      <div style={gridStyle}>
        {simulation.treeManager.trees.map((tree, index) => {
          const isAlive = tree && tree.position !== 0;
          
          // Determine cell color based on tree age
          let backgroundColor = '#a0a0a0'; // Empty cell
          
          if (isAlive) {
            if (tree.age <= 2) {
              backgroundColor = '#90EE90'; // Light green for seedlings
            } else if (tree.age <= 10) {
              backgroundColor = '#32CD32'; // Lime green for young trees
            } else if (tree.age <= 50) {
              backgroundColor = '#228B22'; // Forest green for mature trees
            } else {
              backgroundColor = '#006400'; // Dark green for old trees
            }
          }
          
          const cellStyle = {
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            backgroundColor,
            border: '1px outset #ddd',
            boxSizing: 'border-box'
          };
          
          return <div key={index} style={cellStyle} title={isAlive ? `Age: ${tree.age.toFixed(1)}` : 'Empty'} />;
        })}
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
  
  // Render individual population graphs
  const renderPopulationGraph = (title, dataKey, color, maxPopulation, yLabel) => {
    // Calculate visible data window (sliding window if more than maxYears)
    const visibleData = populationData.slice(
      Math.max(0, populationData.length - maxYears),
      populationData.length
    );
    
    // Calculate graph dimensions
    const graphWidth = 360;
    const graphHeight = 150;
    const padding = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = graphWidth - padding.left - padding.right;
    const innerHeight = graphHeight - padding.top - padding.bottom;
    
    // X-axis scale (years)
    const minYear = visibleData.length > 0 ? visibleData[0].year : 0;
    const maxYear = visibleData.length > 0 ? visibleData[visibleData.length - 1].year : maxYears;
    const xScale = innerWidth / Math.max(maxYears, maxYear - minYear);
    
    // Y-axis scale (population)
    const yScale = innerHeight / maxPopulation;
    
    // Generate path data
    const points = visibleData.map((d, i) => {
      const x = padding.left + (d.year - minYear) * xScale;
      const y = padding.top + innerHeight - (d[dataKey] * yScale);
      return `${x},${y}`;
    }).join(' ');
    
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
          
          {/* X-axis grid lines and labels */}
          {Array.from({ length: 6 }).map((_, i) => {
            const yearInterval = Math.ceil(maxYears / 5);
            const x = padding.left + i * (innerWidth / 5);
            const year = minYear + i * yearInterval;
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
          
          {/* Population line */}
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
                cx={padding.left + (visibleData[visibleData.length - 1].year - minYear) * xScale}
                cy={padding.top + innerHeight - (visibleData[visibleData.length - 1][dataKey] * yScale)}
                r="4"
                fill="white"
                stroke={color}
                strokeWidth="2"
              />
            )}
          </svg>
          
          {/* Current value text */}
          {visibleData.length > 0 && (
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
              {visibleData[visibleData.length - 1][dataKey]}
            </div>
          )}
        </div>
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
          Year: {currentYear}
        </div>
        
        <button 
          onClick={handleStart} 
          disabled={isRunning || isStabilizing}
          style={{ 
            backgroundColor: '#3cb371', 
            color: 'white',
            padding: '5px 10px',
            border: '2px outset #60e591',
            borderRadius: '2px',
            fontWeight: 'bold',
            fontSize: '12px',
            cursor: (isRunning || isStabilizing) ? 'default' : 'pointer',
            opacity: (isRunning || isStabilizing) ? 0.7 : 1
          }}
        >
          ▶ Play
        </button>
        
        <button 
          onClick={handleStop} 
          disabled={!isRunning || isStabilizing}
          style={{ 
            backgroundColor: '#cd5c5c', 
            color: 'white',
            padding: '5px 10px',
            border: '2px outset #e88080',
            borderRadius: '2px',
            fontWeight: 'bold',
            fontSize: '12px',
            cursor: (!isRunning || isStabilizing) ? 'default' : 'pointer',
            opacity: (!isRunning || isStabilizing) ? 0.7 : 1
          }}
        >
          ⏸ Pause
        </button>
        
        <button 
          onClick={handleRunYear} 
          disabled={isRunning || isStabilizing}
          style={{ 
            backgroundColor: '#4169e1', 
            color: 'white',
            padding: '5px 10px',
            border: '2px outset #7191e9',
            borderRadius: '2px',
            fontWeight: 'bold',
            fontSize: '12px',
            cursor: (isRunning || isStabilizing) ? 'default' : 'pointer',
            opacity: (isRunning || isStabilizing) ? 0.7 : 1
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
          
          {renderPopulationGraph('Trees', 'trees', '#228B22', maxTreePopulation, 'Trees')}
          {renderPopulationGraph('Deer', 'deer', '#8B4513', maxDeerPopulation, 'Deer')}
          {renderPopulationGraph('Wolves', 'wolves', '#555', maxWolfPopulation, 'Wolves')}
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
          
          {renderTreeGrid()}
          
          <div style={{ 
            marginTop: '10px', 
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: '5px',
            fontSize: '11px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <div style={{ width: '10px', height: '10px', backgroundColor: '#90EE90' }}></div>
              <span>Seedling (≤2 yrs)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <div style={{ width: '10px', height: '10px', backgroundColor: '#32CD32' }}></div>
              <span>Young (≤10 yrs)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <div style={{ width: '10px', height: '10px', backgroundColor: '#228B22' }}></div>
              <span>Mature (≤50 yrs)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <div style={{ width: '10px', height: '10px', backgroundColor: '#006400' }}></div>
              <span>Old (50 yrs +)</span>
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
            Deaths: (stats.deer.starvationDeaths || 0) + (stats.deer.ageDeath || 0) + (stats.deer.predationDeath || 0),
            "By Age": stats.deer.ageDeath || 0,
            "By Starvation": stats.deer.starvationDeaths || 0,
            "By Predation": stats.deer.predationDeath || 0
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
        </div>
      </div>
    </div>
  );
};

export default EcosystemVisualization;