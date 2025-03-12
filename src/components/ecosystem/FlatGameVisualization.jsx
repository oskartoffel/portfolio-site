// src/components/ecosystem/FlatGameVisualization.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSimulation from './hooks/useSimulation';
import simulationConfig from './config/SimulationConfig';
import SimpleForestView from './visualization/SimpleForestView';
import ClassicXPButton from '../ui/ClassicXPButton';
import LogsPanel from './visualization/LogsPanel';

const FlatGameVisualization = () => {
  const navigate = useNavigate();
  
  // UI state
  const [showLogs, setShowLogs] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showInitialization, setShowInitialization] = useState(false);
  const [initProgress, setInitProgress] = useState(0);
  const [initComplete, setInitComplete] = useState(false);
  const [simulationStarted, setSimulationStarted] = useState(false);
  const [speedDropdownOpen, setSpeedDropdownOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(null);
  const [lastHuntYear, setLastHuntYear] = useState(-10); // Track the last year hunting occurred
  
  // Track user actions for reporting
  const [userStats, setUserStats] = useState({
    animalsKilled: 0,
    treesPlanted: 0,
    treesHarvested: 0,
    moneyEarned: 0,
    carbonCaptured: 0
  });
  
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
  
  // Handle the initialization flow
  const startInitialization = () => {
    setShowIntro(false);
    setShowInitialization(true);
    
    // Simulate a longer loading process for dramatic effect
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setInitProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setInitComplete(true);
        }, 500);
      }
    }, 50);
  };
  
  const completeInitialization = () => {
    setShowInitialization(false);
    setSimulationStarted(true);
    // Auto-start the simulation with 1x speed (1000ms)
    setSpeed(1000);
    startSimulation();
  };
  
  // Handle simulation reset/replay
  const handleReplay = () => {
    // Reset user stats
    setUserStats({
      animalsKilled: 0,
      treesPlanted: 0,
      treesHarvested: 0,
      moneyEarned: 0,
      carbonCaptured: 0
    });
    setLastHuntYear(-10);
    
    resetSimulation();
    setInitProgress(0);
    setInitComplete(false);
    setShowInitialization(true);
    startInitialization();
  };
  
  // Action functions for user interaction with the ecosystem
  
  const handleShootDeer = () => {
    if (simulationManager?.deerManager) {
      const success = simulationManager.deerManager.huntDeer();
      if (success) {
        // Update stats
        setUserStats(prev => ({
          ...prev,
          animalsKilled: prev.animalsKilled + 1,
          // Hunting deer costs carbon due to emissions
          carbonCaptured: prev.carbonCaptured - 15, // -15kg CO2 for hunting activity
          // Small amount of money earned from deer meat
          moneyEarned: prev.moneyEarned + 150 // $150 per deer
        }));
        setLastHuntYear(currentYear);
        addLog("User shot a deer. +$150, -15kg CO2", "system");
      }
    }
  };
  
  const handleShootWolf = () => {
    if (simulationManager?.wolfManager) {
      const success = simulationManager.wolfManager.huntWolf();
      if (success) {
        // Update stats
        setUserStats(prev => ({
          ...prev,
          animalsKilled: prev.animalsKilled + 1,
          // Hunting wolf costs carbon due to emissions
          carbonCaptured: prev.carbonCaptured - 20, // -20kg CO2 for hunting activity
          // No money from wolf hunting (conservation policy)
          moneyEarned: prev.moneyEarned - 50 // $50 fine for wolf hunting
        }));
        setLastHuntYear(currentYear);
        addLog("User shot a wolf. -$50 fine, -20kg CO2", "system");
      }
    }
  };
  
  const handleHarvestTree = () => {
    if (simulationManager?.treeManager) {
      const harvestedTree = simulationManager.treeManager.harvestTree();
      if (harvestedTree) {
        // Calculate earnings based on tree mass
        const treeValue = Math.round(harvestedTree.mass * 5); // $5 per mass unit
        
        // Calculate carbon impact
        // Tree harvesting releases some stored carbon and machinery produces emissions
        const carbonImpact = Math.round(-(harvestedTree.mass * 0.5)); // 50% of mass released as CO2
        
        // Update stats
        setUserStats(prev => ({
          ...prev,
          treesHarvested: prev.treesHarvested + 1,
          moneyEarned: prev.moneyEarned + treeValue,
          carbonCaptured: prev.carbonCaptured + carbonImpact
        }));
        
        addLog(`User harvested a tree. +$${treeValue}, ${carbonImpact}kg CO2`, "system");
      }
    }
  };
  
  const handlePlantSeedling = () => {
    if (simulationManager?.treeManager) {
      const success = simulationManager.treeManager.plantSeedling();
      if (success) {
        // Update stats
        setUserStats(prev => ({
          ...prev,
          treesPlanted: prev.treesPlanted + 1,
          moneyEarned: prev.moneyEarned - 20, // Cost to plant
          carbonCaptured: prev.carbonCaptured - 5 // Small emissions from planting activity
        }));
        addLog("User planted a seedling. -$20, -5kg CO2", "system");
      }
    }
  };
  
  // Update carbon captured based on forest growth and losses
  useEffect(() => {
    if (currentYear > 0 && populationData.length >= 2) {
      // Get current and previous year data
      const currentData = populationData[populationData.length - 1];
      const prevData = populationData[populationData.length - 2];
      
      // Calculate net tree growth
      const netTreeGrowth = currentData.trees - prevData.trees;
      
      // Calculate carbon from tree deaths (natural deaths, excluding harvesting)
      const naturalTreeDeaths = prevData.trees - currentData.trees + userStats.treesHarvested;
      const carbonFromDeaths = naturalTreeDeaths > 0 ? -naturalTreeDeaths * 10 : 0;
      
      // Carbon captured is based on total trees, but reduced to be more realistic
      // Net new trees capture more carbon (young growing trees)
      const newTreeCarbon = netTreeGrowth > 0 ? netTreeGrowth * 15 : 0;
      
      // Existing trees capture some carbon as they grow
      const existingTreeCarbon = currentData.trees * 2; // Reduced from 5 to 2
      
      // Determine total carbon change
      const totalCarbonChange = newTreeCarbon + existingTreeCarbon + carbonFromDeaths;
      
      // Limit maximum carbon gain to prevent unrealistic accumulation
      const cappedCarbonChange = Math.min(totalCarbonChange, 1000);
      
      // Update carbon tracking
      setUserStats(prev => ({
        ...prev,
        carbonCaptured: prev.carbonCaptured + cappedCarbonChange
      }));
    }
  }, [currentYear, populationData, userStats.treesHarvested]);
  
  // Pass hunting impact data to simulation manager for migration effects
  useEffect(() => {
    // Modify migration behavior if hunting occurred recently
    if (simulationManager && currentYear > 0) {
      // Calculate years since last hunt
      const yearsSinceHunt = currentYear - lastHuntYear;
      
      // If hunting occurred in the last 3 years, reduce migration
      if (yearsSinceHunt <= 3) {
        // The more recent the hunt, the stronger the effect
        const huntImpact = 1 - (yearsSinceHunt / 4); // Impact from 0.75 to 0.25
        
        // Modify deer manager migration
        if (simulationManager.deerManager) {
          simulationManager.deerManager.huntImpact = huntImpact;
        }
        
        // Modify wolf manager migration
        if (simulationManager.wolfManager) {
          simulationManager.wolfManager.huntImpact = huntImpact;
        }
      } else {
        // Reset hunt impact after 3 years
        if (simulationManager.deerManager) {
          simulationManager.deerManager.huntImpact = 0;
        }
        if (simulationManager.wolfManager) {
          simulationManager.wolfManager.huntImpact = 0;
        }
      }
    }
  }, [currentYear, lastHuntYear, simulationManager]);

  // =========== STYLING CONSTANTS ===========
  // XP/Aqua inspired styling with forest green theme
  const styles = {
    // Window/Panel styles
    xpPanel: {
      backgroundColor: '#ECE9D8', // Classic XP color
      border: '2px solid #2a8a43', // Changed to green
      borderRadius: '8px',
      boxShadow: '2px 2px 12px rgba(0,0,0,0.2)',
      padding: '10px',
      marginBottom: '15px',
      position: 'relative',
      overflow: 'hidden'
    },
    xpPanelHeader: {
      // Changed to green gradient
      background: 'linear-gradient(to right, #266e35, #38ae57)',
      color: 'white',
      padding: '5px 10px',
      fontFamily: 'Tahoma, Arial, sans-serif',
      fontWeight: 'bold',
      fontSize: '14px',
      marginBottom: '10px',
      borderRadius: '5px',
      boxShadow: 'inset 0 -2px 3px rgba(0,0,0,0.2)'
    },
    aquaPanel: {
      backgroundColor: '#EFF7FF', // Light aqua blue background
      border: '1px solid rgba(42, 138, 67, 0.9)', // Changed to green
      borderRadius: '8px',
      boxShadow: '0 3px 7px rgba(0,0,0,0.15)',
      padding: '10px',
      position: 'relative',
      overflow: 'hidden'
    },
    aquaGlassEffect: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '50%',
      background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.1))',
      borderRadius: '7px 7px 0 0',
      pointerEvents: 'none' // Don't block interaction with the panel content
    },
    
    // Control bar
    controlBar: {
      backgroundColor: '#DDE4EB',
      border: '1px solid #90d7a3',
      borderRadius: '8px',
      boxShadow: 'inset 0 1px 0 #fff, 0 1px 3px rgba(0,0,0,0.1)',
      padding: '8px 12px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '15px',
      gap: '15px'
    },
    yearDisplay: {
      fontWeight: 'bold',
      fontSize: '14px',
      padding: '5px 10px',
      backgroundColor: '#F8FAFF',
      border: '1px solid #90d7a3',
      borderRadius: '5px',
      minWidth: '100px',
      textAlign: 'center',
      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
      color: '#2a8a43'
    },
    
    // Buttons
    xpButton: {
      backgroundColor: '#ECE9D8',
      border: '2px outset #f5f5f5',
      borderRadius: '3px',
      padding: '4px 12px',
      fontFamily: 'Tahoma, Arial, sans-serif',
      fontSize: '12px',
      fontWeight: 'bold',
      cursor: 'pointer',
      color: '#2a8a43',
      boxShadow: '1px 1px 3px rgba(0,0,0,0.1)'
    },
    playButton: {
      backgroundColor: '#3cb371',
      color: '#FFFFFF', // Explicit white for contrast
      minWidth: '90px',
      padding: '5px 10px',
      borderRadius: '3px',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 3px rgba(0,0,0,0.2)',
      border: '1px solid #2a8a43',
      textShadow: '0 -1px 0 rgba(0,0,0,0.3)' // Text shadow for readability
    },
    pauseButton: {
      backgroundColor: '#cd5c5c',
      color: '#FFFFFF', // Explicit white for contrast
      minWidth: '90px',
      padding: '5px 10px',
      borderRadius: '3px',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 3px rgba(0,0,0,0.2)',
      border: '1px solid #a04545',
      textShadow: '0 -1px 0 rgba(0,0,0,0.3)' // Text shadow for readability
    },
    
    // Action buttons
    actionButton: {
      background: 'linear-gradient(to bottom, #81c784, #4caf50 45%, #388e3c)',
      color: 'white',
      border: '1px solid #2e7d32',
      borderRadius: '5px',
      padding: '6px 0',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '5px',
      boxShadow: 'inset 0 1px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
      fontFamily: 'Tahoma, Arial, sans-serif',
      transition: 'all 0.1s ease'
    },
    
    // Modified action buttons
    huntButton: {
      background: 'linear-gradient(to bottom, #ff8a80, #f44336 45%, #c62828)',
      color: 'white',
      border: '1px solid #b71c1c',
      borderRadius: '5px',
      padding: '6px 0',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '5px',
      boxShadow: 'inset 0 1px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
      fontFamily: 'Tahoma, Arial, sans-serif',
      transition: 'all 0.1s ease'
    },
    
    harvestButton: {
      background: 'linear-gradient(to bottom, #a1887f, #795548 45%, #5d4037)',
      color: 'white',
      border: '1px solid #4e342e',
      borderRadius: '5px',
      padding: '6px 0',
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '5px',
      boxShadow: 'inset 0 1px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
      fontFamily: 'Tahoma, Arial, sans-serif',
      transition: 'all 0.1s ease'
    },
    
    // Stat cards
    statCard: {
      backgroundColor: '#F8FAFF',
      border: '1px solid #90d7a3',
      borderRadius: '5px',
      padding: '8px',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 3px rgba(0,0,0,0.05)',
      marginBottom: '10px'
    },
    
    // Population bar
    populationBar: {
      height: '14px',
      borderRadius: '7px',
      border: '1px solid',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)'
    },
    populationFill: {
      height: '100%',
      background: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%)',
      borderRadius: '6px 0 0 6px',
      transition: 'width 0.5s ease',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)'
    },
    
    // Grid layout
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: '7fr 3fr',
      gap: '15px',
      marginBottom: '15px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '15px'
    },
    
    // Graph styling
    graphPanel: {
      backgroundColor: '#F8FAFF',
      borderRadius: '6px',
      padding: '10px',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 3px rgba(0,0,0,0.1)',
      border: '1px solid #90d7a3',
      marginBottom: '10px'
    },
    
    // Help icon
    helpIcon: {
      display: 'inline-block',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      backgroundColor: '#2a8a43',
      color: 'white',
      textAlign: 'center',
      lineHeight: '16px',
      fontSize: '12px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginLeft: '5px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
      position: 'relative',
      zIndex: 10 // Ensure it's above other elements
    },
    
    // Help tooltip
    helpTooltip: {
      position: 'absolute',
      zIndex: 100,
      width: '250px',
      backgroundColor: '#fffef0',
      border: '1px solid #2a8a43',
      borderRadius: '4px',
      padding: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      fontSize: '12px',
      color: '#333',
      lineHeight: '1.4'
    }
  };
  
  // Help text for different components
  const helpTexts = {
    forest: "This visualization shows tree density in the forest ecosystem. Darker green areas represent denser forests, while lighter areas have fewer trees. The density affects deer feeding patterns and forest growth dynamics.",
    
    populationBars: "These bars show the current population size for each species relative to sustainable levels. When populations get too high, natural controls like food scarcity or predation typically bring them back down.",
    
    actions: "These buttons let you directly interact with the ecosystem. Harvesting trees earns money but reduces carbon storage. Shooting deer or wolves affects population dynamics. Planting trees costs money but increases future carbon capture.",
    
    ecosystemStats: "These metrics track your impact on the ecosystem. Money earned comes from harvesting trees and hunting deer. Carbon captured represents the net CO2 sequestered by trees minus emissions from your actions.",
    
    trees: "Trees grow over time, capturing carbon as they mature. Young trees are vulnerable to deer browsing. Tree population is affected by available space, deer predation, and your harvesting choices.",
    
    deer: "Deer feed on young trees and reproduce quickly. Their population is limited by food availability and wolf predation. Without natural predators, deer can destroy forest regeneration.",
    
    wolves: "Wolves control deer populations through predation. A healthy wolf population indirectly protects forest health by preventing deer overpopulation. Wolves reproduce more slowly than deer.",
    
    controls: "Control the simulation speed or pause to observe specific interactions. The simulation models 100 years of ecosystem dynamics."
  };

  // =========== INDIVIDUAL COMPONENT RENDERING ===========
  
  // Intro popup
  const renderIntroPopup = () => {
    if (!showIntro) return null;
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div style={{
          width: '500px',
          backgroundColor: '#ECE9D8',
          borderRadius: '8px',
          boxShadow: '0 0 0 1px #ffffff, 2px 2px 12px rgba(0,0,0,0.5)',
          border: '2px solid #2a8a43', // Changed to green
          overflow: 'hidden'
        }}>
          <div style={{
            background: 'linear-gradient(to right, #266e35, #38ae57)', // Changed to green gradient
            color: 'white',
            padding: '8px 12px',
            fontWeight: 'bold',
            fontSize: '14px',
            textShadow: '1px 1px 1px rgba(0,0,0,0.3)'
          }}>
            Forest Ecosystem Simulation
          </div>
          
          <div style={{ padding: '20px' }}>
            <p style={{
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.6',
              marginBottom: '15px'
            }}>
              This simulation demonstrates the delicate balance of a forest ecosystem with three 
              key species: trees, deer, and wolves. Watch how these species interact and affect 
              each other over time!
            </p>
            
            <p style={{
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.6',
              marginBottom: '15px'
            }}>
              <strong>How to use:</strong>
            </p>
            
            <ul style={{
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.6',
              marginBottom: '20px',
              paddingLeft: '25px'
            }}>
              <li>Track population changes through the forest visualization and population bars</li>
              <li>Observe population trends in the graphs</li>
              <li>Interact with the ecosystem by shooting deer/wolves or planting/harvesting trees</li>
              <li>Control simulation speed with the speed button</li>
              <li>Pause and resume the simulation at any time</li>
            </ul>
            
            <p style={{
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.6',
              marginBottom: '20px'
            }}>
              The forest needs to stabilize before the simulation begins. Click "Start Forest Initialization" 
              to begin this process.
            </p>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '15px',
              marginTop: '20px'
            }}>
              <ClassicXPButton onClick={() => navigate('/portfolio')}>
                Cancel
              </ClassicXPButton>
              <ClassicXPButton 
                onClick={startInitialization} 
                primary
                style={{ backgroundColor: '#2a8a43' }}
              >
                Start Forest Initialization
              </ClassicXPButton>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Initialization popup
  const renderInitializationPopup = () => {
    if (!showInitialization) return null;
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div style={{
          width: '450px',
          backgroundColor: '#ECE9D8',
          borderRadius: '8px',
          boxShadow: '0 0 0 1px #ffffff, 2px 2px 12px rgba(0,0,0,0.5)',
          border: '2px solid #2a8a43', // Changed to green
          overflow: 'hidden'
        }}>
          <div style={{
            background: 'linear-gradient(to right, #266e35, #38ae57)', // Changed to green gradient
            color: 'white',
            padding: '8px 12px',
            fontWeight: 'bold',
            fontSize: '14px',
            textShadow: '1px 1px 1px rgba(0,0,0,0.3)'
          }}>
            Forest Initialization
          </div>
          
          <div style={{ padding: '25px' }}>
            <p style={{
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              {initComplete ? 'Initialization complete!' : 'Please wait while the forest ecosystem stabilizes...'}
            </p>
            
            <div style={{
              width: '100%',
              height: '22px',
              backgroundColor: '#DDE4EB',
              borderRadius: '3px',
              border: '1px solid #90d7a3', // Changed to green
              overflow: 'hidden',
              marginBottom: '20px',
              position: 'relative',
              boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.2)'
            }}>
              <div style={{
                width: `${initProgress}%`,
                height: '100%',
                background: 'linear-gradient(to bottom, #7cde7c, #4caf50)',
                borderRadius: '2px',
                transition: 'width 0.3s ease'
              }} />
              
              {/* Aqua-style gradient highlight */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '45%',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0))',
                borderRadius: '2px 2px 0 0',
                pointerEvents: 'none'
              }} />
            </div>
            
            <div style={{
              textAlign: 'center',
              marginTop: '25px'
            }}>
              {initComplete ? (
                <ClassicXPButton 
                  onClick={completeInitialization} 
                  primary
                  style={{ backgroundColor: '#2a8a43' }}
                >
                  Launch Simulation
                </ClassicXPButton>
              ) : (
                <div style={{
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '12px',
                  color: '#666'
                }}>
                  {initProgress}% Complete
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Completion popup
  const renderCompletionPopup = () => {
    if (!isComplete || !simulationStarted) return null;
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div style={{
          width: '500px',
          backgroundColor: '#ECE9D8',
          borderRadius: '8px',
          boxShadow: '0 0 0 1px #ffffff, 2px 2px 12px rgba(0,0,0,0.5)',
          border: '2px solid #2a8a43', // Changed to green
          overflow: 'hidden'
        }}>
          <div style={{
            background: 'linear-gradient(to right, #266e35, #38ae57)', // Changed to green gradient
            color: 'white',
            padding: '8px 12px',
            fontWeight: 'bold',
            fontSize: '14px',
            textShadow: '1px 1px 1px rgba(0,0,0,0.3)'
          }}>
            Simulation Complete
          </div>
          
          <div style={{ padding: '20px' }}>
            <h2 style={{
              fontFamily: 'Husky Stash, Tahoma, Arial, sans-serif',
              color: '#2a8a43',
              fontSize: '20px',
              marginTop: 0,
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              100 Years of Simulation Complete!
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '15px',
              margin: '20px 0'
            }}>
              <div style={{
                backgroundColor: '#F8FAFF',
                border: '1px solid #90d7a3',
                borderRadius: '6px',
                padding: '10px',
                textAlign: 'center',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 2px 5px rgba(0,0,0,0.1)'
              }}>
                <div style={{ 
                  fontSize: '20px', 
                  marginBottom: '5px'
                }}>
                  🌿
                </div>
                <div style={{
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '12px',
                  color: '#666'
                }}>
                  Carbon Captured
                </div>
                <div style={{
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#333',
                  marginTop: '5px'
                }}>
                  {userStats.carbonCaptured > 0 ? 
                    `+${userStats.carbonCaptured}kg` : 
                    `${userStats.carbonCaptured}kg`}
                </div>
              </div>
              
              <div style={{
                backgroundColor: '#F8FAFF',
                border: '1px solid #90d7a3',
                borderRadius: '6px',
                padding: '10px',
                textAlign: 'center',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 2px 5px rgba(0,0,0,0.1)'
              }}>
                <div style={{ 
                  fontSize: '20px', 
                  marginBottom: '5px'
                }}>
                  💰
                </div>
                <div style={{
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '12px',
                  color: '#666'
                }}>
                  Money Earned
                </div>
                <div style={{
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#333',
                  marginTop: '5px'
                }}>
                  ${userStats.moneyEarned}
                </div>
              </div>
              
              <div style={{
                backgroundColor: '#F8FAFF',
                border: '1px solid #90d7a3',
                borderRadius: '6px',
                padding: '10px',
                textAlign: 'center',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 2px 5px rgba(0,0,0,0.1)'
              }}>
                <div style={{ 
                  fontSize: '20px', 
                  marginBottom: '5px'
                }}>
                  🩸
                </div>
                <div style={{
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '12px',
                  color: '#666'
                }}>
                  Animals Killed
                </div>
                <div style={{
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#333',
                  marginTop: '5px'
                }}>
                  {userStats.animalsKilled}
                </div>
              </div>
              
              {/* Additional stats in the next row */}
              <div style={{
                backgroundColor: '#F8FAFF',
                border: '1px solid #90d7a3',
                borderRadius: '6px',
                padding: '10px',
                textAlign: 'center',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 2px 5px rgba(0,0,0,0.1)',
                gridColumn: '1 / 2'
              }}>
                <div style={{ 
                  fontSize: '20px', 
                  marginBottom: '5px'
                }}>
                  🌱
                </div>
                <div style={{
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '12px',
                  color: '#666'
                }}>
                  Trees Planted
                </div>
                <div style={{
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#333',
                  marginTop: '5px'
                }}>
                  {userStats.treesPlanted}
                </div>
              </div>
              
              <div style={{
                backgroundColor: '#F8FAFF',
                border: '1px solid #90d7a3',
                borderRadius: '6px',
                padding: '10px',
                textAlign: 'center',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 2px 5px rgba(0,0,0,0.1)',
                gridColumn: '2 / 4'
              }}>
                <div style={{ 
                  fontSize: '20px', 
                  marginBottom: '5px'
                }}>
                  🌲
                </div>
                <div style={{
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '12px',
                  color: '#666'
                }}>
                  Trees Harvested
                </div>
                <div style={{
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#333',
                  marginTop: '5px'
                }}>
                  {userStats.treesHarvested}
                </div>
              </div>
            </div>
            
            <p style={{
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.6',
              marginTop: '20px',
              padding: '10px',
              backgroundColor: '#e8f5e9',
              borderRadius: '4px',
              border: '1px solid #c8e6c9'
            }}>
              {userStats.carbonCaptured > 1000 && userStats.moneyEarned > 1000 ? 
                'Excellent work! You managed to both generate income and maintain a carbon-positive forest ecosystem.' : 
                userStats.carbonCaptured > 500 ? 
                'Good job maintaining the ecosystem. Your management created a carbon-positive environment.' : 
                'Your ecosystem experienced significant carbon loss. In the future, consider maintaining more trees to capture carbon.'}
            </p>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '15px',
              marginTop: '25px'
            }}>
              <ClassicXPButton onClick={() => navigate('/portfolio')}>
                Back to Main Menu
              </ClassicXPButton>
              <ClassicXPButton onClick={() => navigate('/behind-works')}>
                Read About The Work
              </ClassicXPButton>
              <ClassicXPButton 
                onClick={handleReplay} 
                primary
                style={{ backgroundColor: '#2a8a43' }}
              >
                Replay Simulation
              </ClassicXPButton>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Top control bar
  const renderControlBar = () => {
    return (
      <div style={styles.controlBar}>
        <div style={styles.yearDisplay}>
          Year: {currentYear} / {simulationConfig.years}
        </div>
        {isRunning ? (
        <div 
          onClick={stopSimulation}
          style={{
            display: 'inline-block',
            // Classic XP Button primary style with portfolio green
            backgroundColor: '#2a8a43',
            color: '#ffffff !important',
            minWidth: '90px',
            padding: '6px 12px',
            borderRadius: '3px',
            boxShadow: 'inset 0 1px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
            border: '1px solid #267532',
            fontWeight: 'bold',
            textShadow: '0 -1px 0 rgba(0,0,0,0.3)',
            cursor: 'pointer',
            textAlign: 'center',
            userSelect: 'none',
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '13px'
          }}
        >
          <span style={{ color: '#ffffff !important' }}>⏸ Pause</span>
        </div>
      ) : (
        <div 
          onClick={!isInitialized || isStabilizing || isComplete ? null : startSimulation}
          style={{
            display: 'inline-block',
            // Classic XP Button primary style with portfolio green
            backgroundColor: '#2a8a43',
            color: '#ffffff !important',
            minWidth: '90px',
            padding: '6px 12px',
            borderRadius: '3px',
            boxShadow: 'inset 0 1px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
            border: '1px solid #267532',
            fontWeight: 'bold',
            textShadow: '0 -1px 0 rgba(0,0,0,0.3)',
            opacity: (!isInitialized || isStabilizing || isComplete) ? 0.7 : 1,
            cursor: (!isInitialized || isStabilizing || isComplete) ? 'default' : 'pointer',
            textAlign: 'center',
            userSelect: 'none',
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '13px'
          }}
        >
          <span style={{ color: '#ffffff !important' }}>▶ Resume</span>
        </div>
      )}
        
        {renderSpeedControl()}
        
        <div 
          style={styles.helpIcon}
          onClick={(e) => {
            e.stopPropagation();
            setShowHelp(showHelp === 'controls' ? null : 'controls');
          }}
        >
          ?
        </div>
        
        {showHelp === 'controls' && (
          <div style={{
            ...styles.helpTooltip,
            top: '60px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            {helpTexts.controls}
            <div style={{
              marginTop: '8px',
              textAlign: 'right',
              fontSize: '11px',
              fontStyle: 'italic'
            }}>
              Click anywhere to close
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // Speed control dropdown
  const renderSpeedControl = () => {
    const options = [
      { label: "0.5×", value: 2000 },
      { label: "1×", value: 1000 },
      { label: "2×", value: 500 },
      { label: "3×", value: 333 },
      { label: "5×", value: 200 }
    ];
    
    const currentOption = options.find(opt => opt.value === simulationSpeed) || options[1];
    
    return (
      <div style={{ position: 'relative' }}>
        <button 
          onClick={() => setSpeedDropdownOpen(!speedDropdownOpen)}
          style={{
            ...styles.xpButton,
            background: 'linear-gradient(to bottom, #f4f4f4, #dfdfdf)',
            fontSize: '13px',
            fontWeight: 'bold',
            minWidth: '60px'
          }}
        >
          {currentOption.label} <span style={{ fontSize: '8px', marginLeft: '4px' }}>▼</span>
        </button>
        
        {speedDropdownOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#F8FAFF',
            border: '1px solid #90d7a3', // Changed to green
            borderRadius: '5px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            zIndex: 100
          }}>
            {options.map(option => (
              <div 
                key={option.value}
                onClick={() => {
                  setSpeed(option.value);
                  setSpeedDropdownOpen(false);
                }}
                style={{
                  padding: '6px',
                  cursor: 'pointer',
                  backgroundColor: option.value === simulationSpeed ? '#e8f5e9' : 'transparent',
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '12px',
                  textAlign: 'center',
                  borderBottom: '1px solid #eee',
                  color: '#2a8a43' // Changed to green
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  // Population health bar
  const renderPopulationBar = ({ type, count, maxCount }) => {
    // Colors for each entity type with XP/Aqua style gradients
    const colors = {
      trees: {
        border: '#2e7d32',
        background: 'rgba(46, 125, 50, 0.1)',
        fill: 'linear-gradient(to bottom, #81c784, #4caf50 45%, #388e3c)',
        title: 'Trees'
      },
      deer: {
        border: '#8B4513',
        background: 'rgba(139, 69, 19, 0.1)',
        fill: 'linear-gradient(to bottom, #bcaaa4, #8d6e63 45%, #5d4037)',
        title: 'Deer'
      },
      wolf: {
        border: '#555',
        background: 'rgba(85, 85, 85, 0.1)',
        fill: 'linear-gradient(to bottom, #9e9e9e, #757575 45%, #424242)',
        title: 'Wolves'
      }
    };
    
    const color = colors[type];
    const emoji = type === 'deer' ? '🦌' : type === 'wolf' ? '🐺' : '🌲';
    
    // Calculate percentage for the bar
    const percentage = Math.min(100, (count / maxCount) * 100);
    
    return (
      <div style={{
        marginBottom: '8px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <span style={{ fontSize: '14px' }}>{emoji}</span>
            <span style={{ 
              fontWeight: 'bold', 
              color: color.border, 
              fontSize: '13px',
              fontFamily: 'Tahoma, Arial, sans-serif',
              textShadow: '0 1px 0 rgba(255,255,255,0.5)'
            }}>
              {color.title}: {count}
            </span>
          </div>
        </div>
        
        <div style={{
          ...styles.populationBar,
          backgroundColor: color.background,
          borderColor: color.border
        }}>
          <div style={{
            ...styles.populationFill,
            width: `${percentage}%`,
            background: color.fill
          }}></div>
        </div>
      </div>
    );
  };
  
  // Population bars group
  const renderPopulationBars = () => {
    return (
      <div style={{ 
        marginBottom: '15px',
        padding: '10px', 
        backgroundColor: '#F8FAFF',
        border: '1px solid #90d7a3', // Changed to green
        borderRadius: '8px',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)',
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#2a8a43', // Changed to green
          }}>
            Population Levels
          </div>
          
          <div 
            style={styles.helpIcon}
            onClick={(e) => {
              e.stopPropagation();
              setShowHelp(showHelp === 'populationBars' ? null : 'populationBars');
            }}
          >
            ?
          </div>
        </div>
        
        {showHelp === 'populationBars' && (
          <div style={{
            ...styles.helpTooltip,
            top: '40px',
            right: '20px'
          }}>
            {helpTexts.populationBars}
            <div style={{
              marginTop: '8px',
              textAlign: 'right',
              fontSize: '11px',
              fontStyle: 'italic'
            }}>
              Click anywhere to close
            </div>
          </div>
        )}
        
        {renderPopulationBar({
          type: "trees", 
          count: stats.trees.total, 
          maxCount: simulationConfig.graph.MAX_TREE_POPULATION
        })}
        {renderPopulationBar({
          type: "deer", 
          count: stats.deer.total, 
          maxCount: simulationConfig.graph.MAX_DEER_POPULATION
        })}
        {renderPopulationBar({
          type: "wolf", 
          count: stats.wolves.total, 
          maxCount: simulationConfig.graph.MAX_WOLF_POPULATION
        })}
      </div>
    );
  };
  
  // Action buttons with updated styles
  const renderActionButtons = () => {
    return (
      <div style={{
        backgroundColor: '#F0F6FF',
        backgroundImage: 'linear-gradient(to bottom, #F8FAFF, #E8F0F8)',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7), 0 2px 5px rgba(0,0,0,0.1)',
        border: '1px solid #90d7a3', // Changed to green
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#2a8a43', // Changed to green
            textShadow: '0 1px 0 rgba(255,255,255,0.5)'
          }}>
            Actions
          </div>
          
          <div 
            style={styles.helpIcon}
            onClick={(e) => {
              e.stopPropagation();
              setShowHelp(showHelp === 'actions' ? null : 'actions');
            }}
          >
            ?
          </div>
        </div>
        
        {showHelp === 'actions' && (
          <div style={{
            ...styles.helpTooltip,
            top: '40px',
            right: '20px',
            zIndex: 15
          }}>
            {helpTexts.actions}
            <div style={{
              marginTop: '8px',
              textAlign: 'right',
              fontSize: '11px',
              fontStyle: 'italic'
            }}>
              Click anywhere to close
            </div>
          </div>
        )}
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {/* Shoot Deer Button - Updated with hunting style */}
          <button 
            onClick={handleShootDeer}
            disabled={!isInitialized || isStabilizing || isComplete}
            style={{
              ...styles.huntButton,
              opacity: (!isInitialized || isStabilizing || isComplete) ? 0.5 : 1,
              cursor: (!isInitialized || isStabilizing || isComplete) ? 'default' : 'pointer'
            }}
            onMouseOver={(e) => {
              if (!(!isInitialized || isStabilizing || isComplete)) {
                e.currentTarget.style.filter = 'brightness(1.1)';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.filter = 'brightness(1)';
            }}
            onMouseDown={(e) => {
              if (!(!isInitialized || isStabilizing || isComplete)) {
                e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.2)';
                e.currentTarget.style.transform = 'translateY(1px)';
              }
            }}
            onMouseUp={(e) => {
              if (!(!isInitialized || isStabilizing || isComplete)) {
                e.currentTarget.style.boxShadow = 'inset 0 1px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            <span>🔫</span> Shoot Deer
          </button>
          
          {/* Shoot Wolf Button - Updated with hunting style */}
          <button 
            onClick={handleShootWolf}
            disabled={!isInitialized || isStabilizing || isComplete}
            style={{
              ...styles.huntButton,
              opacity: (!isInitialized || isStabilizing || isComplete) ? 0.5 : 1,
              cursor: (!isInitialized || isStabilizing || isComplete) ? 'default' : 'pointer'
            }}
            onMouseOver={(e) => {
              if (!(!isInitialized || isStabilizing || isComplete)) {
                e.currentTarget.style.filter = 'brightness(1.1)';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.filter = 'brightness(1)';
            }}
            onMouseDown={(e) => {
              if (!(!isInitialized || isStabilizing || isComplete)) {
                e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.2)';
                e.currentTarget.style.transform = 'translateY(1px)';
              }
            }}
            onMouseUp={(e) => {
              if (!(!isInitialized || isStabilizing || isComplete)) {
                e.currentTarget.style.boxShadow = 'inset 0 1px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            <span>🔫</span> Shoot Wolf
          </button>
          
          {/* Harvest Tree Button - Updated with harvesting style */}
          <button 
            onClick={handleHarvestTree}
            disabled={!isInitialized || isStabilizing || isComplete}
            style={{
              ...styles.harvestButton,
              opacity: (!isInitialized || isStabilizing || isComplete) ? 0.5 : 1,
              cursor: (!isInitialized || isStabilizing || isComplete) ? 'default' : 'pointer'
            }}
            onMouseOver={(e) => {
              if (!(!isInitialized || isStabilizing || isComplete)) {
                e.currentTarget.style.filter = 'brightness(1.1)';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.filter = 'brightness(1)';
            }}
            onMouseDown={(e) => {
              if (!(!isInitialized || isStabilizing || isComplete)) {
                e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.2)';
                e.currentTarget.style.transform = 'translateY(1px)';
              }
            }}
            onMouseUp={(e) => {
              if (!(!isInitialized || isStabilizing || isComplete)) {
                e.currentTarget.style.boxShadow = 'inset 0 1px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            <span>🪓</span> Harvest Tree
          </button>
          
          {/* Plant Seedling Button - Standard style */}
          <button 
            onClick={handlePlantSeedling}
            disabled={!isInitialized || isStabilizing || isComplete}
            style={{
              ...styles.actionButton,
              opacity: (!isInitialized || isStabilizing || isComplete) ? 0.5 : 1,
              cursor: (!isInitialized || isStabilizing || isComplete) ? 'default' : 'pointer'
            }}
            onMouseOver={(e) => {
              if (!(!isInitialized || isStabilizing || isComplete)) {
                e.currentTarget.style.filter = 'brightness(1.1)';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.filter = 'brightness(1)';
            }}
            onMouseDown={(e) => {
              if (!(!isInitialized || isStabilizing || isComplete)) {
                e.currentTarget.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.2)';
                e.currentTarget.style.transform = 'translateY(1px)';
              }
            }}
            onMouseUp={(e) => {
              if (!(!isInitialized || isStabilizing || isComplete)) {
                e.currentTarget.style.boxShadow = 'inset 0 1px rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            <span>🌱</span> Plant Seedling
          </button>
        </div>
      </div>
    );
  };
  
  // Ecosystem stats/feedback
  const renderEcosystemStats = () => {
    return (
      <div style={{
        backgroundColor: '#F0F6FF',
        backgroundImage: 'linear-gradient(to bottom, #F8FAFF, #E8F0F8)',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7), 0 2px 5px rgba(0,0,0,0.1)',
        border: '1px solid #90d7a3', // Changed to green
        marginTop: '15px',
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#2a8a43', // Changed to green
            textShadow: '0 1px 0 rgba(255,255,255,0.5)'
          }}>
            Ecosystem Stats
          </div>
          
          <div 
            style={styles.helpIcon}
            onClick={(e) => {
              e.stopPropagation();
              setShowHelp(showHelp === 'ecosystemStats' ? null : 'ecosystemStats');
            }}
          >
            ?
          </div>
        </div>
        
        {showHelp === 'ecosystemStats' && (
          <div style={{
            ...styles.helpTooltip,
            top: '40px',
            right: '20px',
            zIndex: 15
          }}>
            {helpTexts.ecosystemStats}
            <div style={{
              marginTop: '8px',
              textAlign: 'right',
              fontSize: '11px',
              fontStyle: 'italic'
            }}>
              Click anywhere to close
            </div>
          </div>
        )}
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '8px'
        }}>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.7)',
            border: '1px solid #D4E4F7',
            borderRadius: '6px',
            padding: '6px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)'
          }}>
            <div style={{ fontSize: '15px' }}>
              🌿
            </div>
            <div style={{
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '9px',
              color: '#666',
              textTransform: 'capitalize'
            }}>
              Carbon Captured
            </div>
            <div style={{
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '11px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              {userStats.carbonCaptured > 0 ? 
                `+${userStats.carbonCaptured}kg` : 
                `${userStats.carbonCaptured}kg`}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.7)',
            border: '1px solid #D4E4F7',
            borderRadius: '6px',
            padding: '6px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)'
          }}>
            <div style={{ fontSize: '15px' }}>
              💰
            </div>
            <div style={{
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '9px',
              color: '#666',
              textTransform: 'capitalize'
            }}>
              Money Earned
            </div>
            <div style={{
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '11px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              ${userStats.moneyEarned}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.7)',
            border: '1px solid #D4E4F7',
            borderRadius: '6px',
            padding: '6px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)'
          }}>
            <div style={{ fontSize: '15px' }}>
              🩸
            </div>
            <div style={{
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '9px',
              color: '#666',
              textTransform: 'capitalize'
            }}>
              Animals Killed
            </div>
            <div style={{
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '11px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              {userStats.animalsKilled}
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.7)',
            border: '1px solid #D4E4F7',
            borderRadius: '6px',
            padding: '6px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)'
          }}>
            <div style={{ fontSize: '15px' }}>
              🌱
            </div>
            <div style={{
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '9px',
              color: '#666',
              textTransform: 'capitalize'
            }}>
              Trees Planted
            </div>
            <div style={{
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '11px',
              fontWeight: 'bold',
              color: '#333'
            }}>
              {userStats.treesPlanted}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Single population graph component
  const renderSingleGraph = ({ dataKey, color, maxValue, title }) => {
    // Graph dimensions - keep it relatively compact
    const graphWidth = 220;
    const graphHeight = 100;
    const padding = { top: 15, right: 20, bottom: 20, left: 30 };
    const innerWidth = graphWidth - padding.left - padding.right;
    const innerHeight = graphHeight - padding.top - padding.bottom;
    
    // Determine visible window for the graph
    const visibleYears = 20; // Show 20 years at a time
    
    // Calculate visible data range
    const startYear = Math.max(0, currentYear - visibleYears + 1);
    const visibleData = populationData.filter(d => d.year >= startYear && d.year <= currentYear);
    
    // Define scales based on visible window
    const xScale = innerWidth / (visibleYears - 1 || 1); // Avoid division by zero
    const yScale = innerHeight / maxValue;
    
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
    const numLabels = 4; // Reduced number of labels for cleaner appearance
    for (let i = 0; i < numLabels; i++) {
      const yearOffset = Math.floor(i * (visibleYears - 1) / (numLabels - 1));
      visibleXLabels.push(startYear + yearOffset);
    }
    
    // Calculate visible y-axis labels based on maxValue
    const visibleYLabels = [];
    const numYLabels = 3; // Only show 3 y labels for cleanliness
    for (let i = 0; i < numYLabels; i++) {
      visibleYLabels.push(Math.round(maxValue * i / (numYLabels - 1)));
    }
    
    return (
      <div style={{ marginBottom: '10px' }}>
        {title && (
          <div style={{ 
            fontSize: '14px', 
            fontWeight: 'bold', 
            color, 
            textAlign: 'center',
            marginBottom: '5px',
            textShadow: '0 1px 0 rgba(255,255,255,0.5)'
          }}>
            {title}
          </div>
        )}
        
        <div style={{
          position: 'relative',
          width: `${graphWidth}px`,
          height: `${graphHeight}px`,
          backgroundColor: 'white',
          borderRadius: '6px',
          border: '1px solid #D4E4F7',
          margin: '0 auto',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)'
        }}>
          {/* Y-axis grid lines - much simpler */}
          {visibleYLabels.map((label, i) => {
            const y = padding.top + (numYLabels - 1 - i) * (innerHeight / (numYLabels - 1));
            return (
              <React.Fragment key={`grid-y-${i}`}>
                <line 
                  x1={padding.left} 
                  y1={y} 
                  x2={graphWidth - padding.right} 
                  y2={y} 
                  stroke="#eee" 
                  strokeWidth="1"
                  style={{ position: 'absolute' }}
                />
                <div style={{ 
                  position: 'absolute', 
                  left: '2px', 
                  top: `${y - 6}px`, 
                  fontSize: '8px',
                  color: '#999',
                  width: '25px',
                  textAlign: 'right'
                }}>
                  {label}
                </div>
              </React.Fragment>
            );
          })}
          
          {/* X-axis grid lines and labels - minimal */}
          {visibleXLabels.map((year, i) => {
            const x = padding.left + (i * innerWidth / (numLabels - 1));
            return (
              <React.Fragment key={`grid-x-${i}`}>
                <line 
                  x1={x} 
                  y1={padding.top} 
                  x2={x} 
                  y2={graphHeight - padding.bottom} 
                  stroke="#eee" 
                  strokeWidth="1"
                  style={{ position: 'absolute' }}
                />
                <div style={{ 
                  position: 'absolute', 
                  left: `${x - 8}px`, 
                  bottom: '2px', 
                  fontSize: '8px',
                  color: '#999'
                }}>
                  {year}
                </div>
              </React.Fragment>
            );
          })}
          
          {/* X-axis label - minimized */}
          <div style={{ 
            position: 'absolute', 
            bottom: '1px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '8px',
            color: '#999'
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
          
          {/* Current value text - XP style */}
          <div style={{
            position: 'absolute',
            top: '3px',
            right: '5px',
            fontSize: '10px',
            fontWeight: 'bold',
            backgroundColor: '#F0F6FF',
            border: `1px solid ${color}`,
            borderRadius: '4px',
            padding: '1px 4px',
            color: color,
            boxShadow: '1px 1px 3px rgba(0,0,0,0.1)'
          }}>
            {currentValue}
          </div>
        </div>
      </div>
    );
  };
  
  // Compact stats card component
  const renderCompactStatsCard = ({ title, stats, color, iconEmoji }) => {
    // Ensure good text contrast against background color
    // For wolf stats (gray color), we'll use a darker background
    const adjustedColor = color === "#555" ? "#3A3A3A" : color; // Darker gray for wolves
    const textColor = 'white'; // White text for all headers
    
    return (
      <div style={{ width: '100%' }}>
        {/* XP-style panel header - with contrast fix */}
        <div style={{ 
          backgroundImage: `linear-gradient(to bottom, ${adjustedColor}, ${adjustedColor}cc)`,
          color: textColor, // White text for better contrast
          fontWeight: 'bold',
          padding: '4px 8px',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '6px 6px 0 0',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
          gap: '5px',
          textShadow: '0 -1px 0 rgba(0,0,0,0.25)'
        }}>
          {iconEmoji && <span>{iconEmoji}</span>}
          <span>{title}</span>
        </div>
        
        {/* Content - Clean two-column grid with XP/Aqua styling */}
        <div style={{ 
          border: '1px solid #D4E4F7',
          borderTop: 'none',
          borderRadius: '0 0 6px 6px',
          backgroundColor: '#F8FAFF',
          padding: '8px',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            rowGap: '5px',
            columnGap: '10px'
          }}>
            {Object.entries(stats).map(([key, value]) => (
              <React.Fragment key={key}>
                <div style={{ 
                  textAlign: 'left', 
                  fontSize: '10px',
                  color: '#666',
                  textShadow: '0 1px 0 rgba(255,255,255,0.5)'
                }}>
                  {key}:
                </div>
                <div style={{ 
                  textAlign: 'right', 
                  fontWeight: key === 'total' ? 'bold' : 'normal', 
                  fontSize: '10px',
                  color: key === 'total' ? adjustedColor : '#333',
                  textShadow: '0 1px 0 rgba(255,255,255,0.5)'
                }}>
                  {typeof value === 'number' ? 
                    (Number.isInteger(value) ? value : value.toFixed(1)) : 
                    value}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  // Logs toggle button
  const renderLogsToggle = () => {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '15px',
        marginBottom: '15px'
      }}>
        <div
          onClick={handleToggleLogs}
          role="button"
          aria-pressed={showLogs}
          tabIndex={0}
          style={{
            // Consistent styling for both states - using the "Show Details" (inactive) styling
            padding: '6px 20px',
            backgroundColor: '#ECE9D8',
            color: '#1d6631 !important',
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '13px',
            fontWeight: 'bold',
            border: '2px outset #f5f5f5',
            borderRadius: '5px',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            display: 'inline-block',
            textAlign: 'center',
            userSelect: 'none'
          }}
        >
          <span style={{ color: '#1d6631 !important' }}>
            {showLogs ? 'Hide Details' : 'Show Details'}
          </span>
        </div>
      </div>
    );
  };
  
  
  // Click anywhere to close help tooltips
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Only close if the click isn't on a help icon
      if (showHelp && !e.target.closest('.help-icon')) {
        setShowHelp(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showHelp]);
  
  return (
    <div className="game-visualization" style={{ 
      fontFamily: 'Tahoma, Arial, sans-serif',
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '10px',
      backgroundColor: '#ECE9D8',
      position: 'relative'
    }}>
      {/* Popups */}
      {renderIntroPopup()}
      {renderInitializationPopup()}
      {renderCompletionPopup()}
      
      {/* Top Control Bar */}
      {renderControlBar()}

      {/* Main Game Container with XP/Aqua styling */}
      <div style={styles.xpPanel}>
        {/* Glass effect overlay - for that Aqua feel */}
        <div style={styles.aquaGlassEffect}></div>
        
        {/* Main content grid - simplified layout */}
        <div style={styles.mainGrid}>
          {/* Left column - Forest visualization with population bars */}
          <div>
            {/* First row: Population bars and forest in same container */}
            <div style={{
              ...styles.aquaPanel,
              marginBottom: '15px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Title bar */}
              <div style={styles.xpPanelHeader}>
                Forest Ecosystem Status
              </div>
              
              {/* Integrated population bars */}
              {renderPopulationBars()}
              
              {/* Forest visualization */}
              <div style={{
                backgroundColor: '#F8FAFF',
                borderRadius: '8px',
                padding: '10px',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #90d7a3', // Changed to green
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  zIndex: 5
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#2a8a43', // Changed to green
                  }}>
                    Forest View
                  </div>
                  
                  <div 
                    className="help-icon"
                    style={styles.helpIcon}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowHelp(showHelp === 'forest' ? null : 'forest');
                    }}
                  >
                    ?
                  </div>
                </div>
                
                {showHelp === 'forest' && (
                  <div style={{
                    ...styles.helpTooltip,
                    top: '40px',
                    left: '10px',
                    zIndex: 10
                  }}>
                    {helpTexts.forest}
                    <div style={{
                      marginTop: '8px',
                      textAlign: 'right',
                      fontSize: '11px',
                      fontStyle: 'italic'
                    }}>
                      Click anywhere to close
                    </div>
                  </div>
                )}
                
                <SimpleForestView 
                  simulationManager={simulationManager} 
                  currentYear={currentYear} 
                />
              </div>
            </div>
          </div>
          
          {/* Right column - Actions and Ecosystem Stats vertically stacked */}
          <div>
            <div style={{
              ...styles.aquaPanel,
              display: 'flex',
              flexDirection: 'column',
              gap: '0' // Remove gap between elements
            }}>
              {/* Title bar */}
              <div style={styles.xpPanelHeader}>
                User Controls
              </div>
              
              {/* Action Buttons in the same style container */}
              {renderActionButtons()}
              
              {/* Ecosystem Stats integrated in the same container */}
              {renderEcosystemStats()}
            </div>
          </div>
        </div>
      </div>

      {/* Show Details Toggle Button */}
      {renderLogsToggle()}

      {/* Secondary Game Container - Graphs and Stats Cards */}
      {showLogs && (
        <div style={styles.xpPanel}>
          {/* Glass effect overlay */}
          <div style={styles.aquaGlassEffect}></div>
          
          {/* Header */}
          <div style={styles.xpPanelHeader}>
            Population Data
          </div>
          
          <div style={styles.statsGrid}>
            {/* Tree Column */}
            <div>
              <div style={styles.graphPanel}>
                {renderSingleGraph({
                  dataKey: "trees",
                  color: "#228B22",
                  maxValue: simulationConfig.graph.MAX_TREE_POPULATION,
                  title: "Trees"
                })}
              </div>
              
              <div style={{
                backgroundColor: '#F8FAFF',
                borderRadius: '6px',
                padding: '0', // No padding needed as the card has its own padding
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #90d7a3', // Changed to green
                position: 'relative'
              }}>
                <div 
                  className="help-icon"
                  style={{
                    ...styles.helpIcon,
                    position: 'absolute',
                    top: '5px',
                    right: '28px',
                    zIndex: 5
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowHelp(showHelp === 'trees' ? null : 'trees');
                  }}
                >
                  ?
                </div>
                
                {showHelp === 'trees' && (
                  <div style={{
                    ...styles.helpTooltip,
                    top: '30px',
                    right: '20px',
                    zIndex: 10
                  }}>
                    {helpTexts.trees}
                    <div style={{
                      marginTop: '8px',
                      textAlign: 'right',
                      fontSize: '11px',
                      fontStyle: 'italic'
                    }}>
                      Click anywhere to close
                    </div>
                  </div>
                )}
                
                {renderCompactStatsCard({
                  title: "TREES",
                  stats: {
                    total: stats.trees.total,
                    "Avg Age": stats.trees.averageAge?.toFixed(1) || 0,
                    Seedlings: stats.trees.ageDistribution?.seedling || 0,
                    Young: stats.trees.ageDistribution?.young || 0,
                    Mature: stats.trees.ageDistribution?.mature || 0,
                    Deaths: stats.trees.totalDeaths || 0,
                    "By Age": stats.trees.ageDeaths || 0,
                    "By Stress": stats.trees.stressDeaths || 0,
                    Eaten: stats.trees.consumedByDeer || 0
                  },
                  color: "#228B22",
                  iconEmoji: "🌲"
                })}
              </div>
            </div>
            
            {/* Deer Column */}
            <div>
              <div style={styles.graphPanel}>
                {renderSingleGraph({
                  dataKey: "deer",
                  color: "#8B4513",
                  maxValue: simulationConfig.graph.MAX_DEER_POPULATION,
                  title: "Deer"
                })}
              </div>
              
              <div style={{
                backgroundColor: '#F8FAFF',
                borderRadius: '6px',
                padding: '0', // No padding needed as the card has its own padding
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #90d7a3', // Changed to green
                position: 'relative'
              }}>
                <div 
                  className="help-icon"
                  style={{
                    ...styles.helpIcon,
                    position: 'absolute',
                    top: '5px',
                    right: '28px',
                    zIndex: 5
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowHelp(showHelp === 'deer' ? null : 'deer');
                  }}
                >
                  ?
                </div>
                
                {showHelp === 'deer' && (
                  <div style={{
                    ...styles.helpTooltip,
                    top: '30px',
                    right: '20px',
                    zIndex: 10
                  }}>
                    {helpTexts.deer}
                    <div style={{
                      marginTop: '8px',
                      textAlign: 'right',
                      fontSize: '11px',
                      fontStyle: 'italic'
                    }}>
                      Click anywhere to close
                    </div>
                  </div>
                )}
                
                {renderCompactStatsCard({
                  title: "DEER",
                  stats: {
                    total: stats.deer.total,
                    "Avg Age": stats.deer.averageAge?.toFixed(1) || 0,
                    "Reproduced": stats.deer.reproducedCount || 0,
                    "Migrated": stats.deer.migratedCount || 0,
                    "Foraging": stats.deer.averageForagingSuccess || 'N/A',
                    Deaths: (stats.deer.starvationDeaths || 0) + (stats.deer.ageDeaths || 0) + (stats.deer.predationDeaths || 0),
                    "By Age": stats.deer.ageDeaths || 0,
                    "By Starvation": stats.deer.starvationDeaths || 0,
                    "By Predation": stats.deer.predationDeaths || 0
                  },
                  color: "#8B4513",
                  iconEmoji: "🦌"
                })}
              </div>
            </div>
            
            {/* Wolves Column */}
            <div>
              <div style={styles.graphPanel}>
                {renderSingleGraph({
                  dataKey: "wolves",
                  color: "#555",
                  maxValue: simulationConfig.graph.MAX_WOLF_POPULATION,
                  title: "Wolves"
                })}
              </div>
              
              <div style={{
                backgroundColor: '#F8FAFF',
                borderRadius: '6px',
                padding: '0', // No padding needed as the card has its own padding
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #90d7a3', // Changed to green
                position: 'relative'
              }}>
                <div 
                  className="help-icon"
                  style={{
                    ...styles.helpIcon,
                    position: 'absolute',
                    top: '5px',
                    right: '28px',
                    zIndex: 5
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowHelp(showHelp === 'wolves' ? null : 'wolves');
                  }}
                >
                  ?
                </div>
                
                {showHelp === 'wolves' && (
                  <div style={{
                    ...styles.helpTooltip,
                    top: '30px',
                    right: '20px',
                    zIndex: 10
                  }}>
                    {helpTexts.wolves}
                    <div style={{
                      marginTop: '8px',
                      textAlign: 'right',
                      fontSize: '11px',
                      fontStyle: 'italic'
                    }}>
                      Click anywhere to close
                    </div>
                  </div>
                )}
                
                {renderCompactStatsCard({
                  title: "WOLVES",
                  stats: {
                    total: stats.wolves.total,
                    "Avg Age": stats.wolves.averageAge?.toFixed(1) || 0,
                    "Reproduced": stats.wolves.reproducedCount || 0,
                    "Migrated": stats.wolves.migratedCount || 0,
                    "Hunting": stats.wolves.averageHuntingSuccess || 'N/A',
                    "Prey Killed": stats.wolves.preyKilled || 0,
                    Deaths: (stats.wolves.starvationDeaths || 0) + (stats.wolves.ageDeaths || 0),
                    "By Age": stats.wolves.ageDeaths || 0,
                    "By Starvation": stats.wolves.starvationDeaths || 0
                  },
                  color: "#555",
                  iconEmoji: "🐺"
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Simulation Logs */}
      {showLogs && (
        <LogsPanel 
          logs={logs}
          showLogs={showLogs}
          onToggleLogs={handleToggleLogs}
          onExportLogs={exportLogs}
        />
      )}
    </div>
  );
};

export default FlatGameVisualization;