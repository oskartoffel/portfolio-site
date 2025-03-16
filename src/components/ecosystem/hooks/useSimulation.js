// src/components/ecosystem/hooks/useSimulation.js
import { useState, useEffect, useRef } from 'react';
import { SimulationManager } from '../../../simulation/SimulationManager';

const useSimulation = (config) => {
  // Simulation state
  const [simulationManager, setSimulationManager] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isStabilizing, setIsStabilizing] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentYear, setCurrentYear] = useState(0);
  const [stabilizationProgress, setStabilizationProgress] = useState(0);
  const [simulationSpeed, setSimulationSpeed] = useState(800);
  
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
  
  // Refs
  const simRef = useRef(null);
  const logsRef = useRef([]);
  const timeoutRef = useRef(null);
  const isRunningRef = useRef(false);
  const currentYearRef = useRef(0);
  
  // Add a log entry
  const addLog = (message, type = 'info') => {
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      year: currentYearRef.current,
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
  
  // Initialize the simulation
  const initializeSimulation = async () => {
    // Reset state
    setIsInitialized(false);
    setIsStabilizing(true);
    setStabilizationProgress(0);
    setCurrentYear(0);
    currentYearRef.current = 0;
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
  
  // Run continously using setTimeout recursively
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
  
  // Control functions
  const startSimulation = () => {
    if (!isInitialized || isStabilizing || isComplete || isRunningRef.current) return;
    
    // Set running flags
    isRunningRef.current = true;
    setIsRunning(true);
    
    addLog("Simulation running", 'system');
    
    // Start the recursive process
    runContinuously();
  };
  
  const stopSimulation = () => {
    isRunningRef.current = false;
    setIsRunning(false);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    addLog("Simulation paused", 'system');
  };
  
  const stepSimulation = () => {
    if (!isInitialized || isStabilizing || isComplete) return;
    
    // If currently running, stop first
    if (isRunningRef.current) {
      stopSimulation();
    }
    
    // Run one year
    runSimulationYear();
  };
  
  const resetSimulation = () => {
    stopSimulation();
    initializeSimulation();
  };
  
  const setSpeed = (speed) => {
    setSimulationSpeed(speed);
  };
  
  const exportLogs = () => {
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

  return {
    // State
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
    
    // Actions
    startSimulation,
    stopSimulation,
    stepSimulation,
    resetSimulation,
    setSpeed,
    exportLogs,
    addLog
  };
};

export default useSimulation;