// src/components/ecosystem/GameVisualization.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSimulation from './hooks/useSimulation';
import simulationConfig from './config/SimulationConfig';
import ClassicXPButton from '../ui/ClassicXPButton';

// Import new simplified components
import SinglePopulationGraph from './visualization/SinglePopulationGraph';
import CompactStatsCard from './visualization/CompactStatsCard';
import SimpleForestView from './visualization/SimpleForestView';
import LogsPanel from './visualization/LogsPanel';

// New components for the enhanced UI
const IntroPopup = ({ onStart, onClose }) => {
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
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        boxShadow: '0 0 0 1px #ffffff, 2px 2px 12px rgba(0,0,0,0.5)',
        border: '1px solid #2a8a43',
        overflow: 'hidden'
      }}>
        <div style={{
          background: 'linear-gradient(to right, #266e35, #38ae57)',
          color: 'white',
          padding: '8px 12px',
          fontWeight: 'bold',
          fontSize: '14px',
          textShadow: '1px 1px 1px rgba(0,0,0,0.3)'
        }}>
          Forest Ecosystem Simulation
        </div>
        
        <div style={{ padding: '20px' }}>
          <h2 style={{
            fontFamily: 'Husky Stash, Tahoma, Arial, sans-serif',
            color: '#2a8a43',
            fontSize: '20px',
            marginTop: 0,
            marginBottom: '15px'
          }}>
            Welcome to the Forest Ecosystem!
          </h2>
          
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
            <ClassicXPButton onClick={onClose}>
              Cancel
            </ClassicXPButton>
            <ClassicXPButton 
              onClick={onStart} 
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

const InitializationPopup = ({ progress, onComplete, isComplete }) => {
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
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        boxShadow: '0 0 0 1px #ffffff, 2px 2px 12px rgba(0,0,0,0.5)',
        border: '1px solid #2a8a43',
        overflow: 'hidden'
      }}>
        <div style={{
          background: 'linear-gradient(to right, #266e35, #38ae57)',
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
            {isComplete ? 'Initialization complete!' : 'Please wait while the forest ecosystem stabilizes...'}
          </p>
          
          <div style={{
            width: '100%',
            height: '22px',
            backgroundColor: '#e0e0e0',
            borderRadius: '3px',
            border: '1px solid #999',
            overflow: 'hidden',
            marginBottom: '20px',
            position: 'relative',
            boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.2)'
          }}>
            <div style={{
              width: `${progress}%`,
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
            {isComplete ? (
              <ClassicXPButton 
                onClick={onComplete} 
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
                {progress}% Complete
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CompletionPopup = ({ stats, onReplay, onBackToWorks, onMainMenu }) => {
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
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        boxShadow: '0 0 0 1px #ffffff, 2px 2px 12px rgba(0,0,0,0.5)',
        border: '1px solid #2a8a43',
        overflow: 'hidden'
      }}>
        <div style={{
          background: 'linear-gradient(to right, #266e35, #38ae57)',
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
            {Object.entries(stats).map(([key, value]) => (
              <div key={key} style={{
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '10px',
                textAlign: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}>
                <div style={{ 
                  fontSize: '20px', 
                  marginBottom: '5px'
                }}>
                  {key === 'carbonCaptured' ? '🌿' : 
                   key === 'moneyEarned' ? '💰' : 
                   key === 'animalsKilled' ? '🩸' : 
                   key === 'treesPlanted' ? '🌱' : 
                   key === 'ecosystemHealth' ? '❤️' : 
                   key === 'sustainabilityScore' ? '♻️' : '📊'}
                </div>
                
                <div style={{
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '12px',
                  color: '#666',
                  textTransform: 'capitalize'
                }}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                </div>
                
                <div style={{
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#333',
                  marginTop: '5px'
                }}>
                  {value}
                </div>
              </div>
            ))}
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
            {stats.sustainabilityScore > 70 ? 
              'Excellent work! Your ecosystem management created a balanced and thriving forest environment.' : 
              stats.sustainabilityScore > 40 ? 
              'Good job maintaining the ecosystem. With some adjustments, you could create an even more sustainable balance.' : 
              'Your ecosystem experienced significant challenges. Try a different approach to improve sustainability.'}
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            marginTop: '25px'
          }}>
            <ClassicXPButton onClick={onMainMenu}>
              Back to Main Menu
            </ClassicXPButton>
            <ClassicXPButton onClick={onBackToWorks}>
              Read About The Work
            </ClassicXPButton>
            <ClassicXPButton 
              onClick={onReplay} 
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

// Population health bar
const PopulationBar = ({ type, count, maxCount }) => {
  // Determine color based on type
  const color = type === 'deer' ? '#8B4513' : type === 'wolf' ? '#555' : '#228B22';
  const bgColor = type === 'deer' ? 'rgba(139, 69, 19, 0.1)' : type === 'wolf' ? 'rgba(85, 85, 85, 0.1)' : 'rgba(34, 139, 34, 0.1)';
  const emoji = type === 'deer' ? '🦌' : type === 'wolf' ? '🐺' : '🌲';
  
  // Calculate percentage for the bar
  const percentage = Math.min(100, (count / maxCount) * 100);
  
  // Calculate emoji display
  const emojiCount = type === 'trees' 
    ? Math.min(40, Math.ceil(count / 50)) // Show 1 tree emoji per 50 trees, max 40
    : Math.min(40, count); // Show actual count for deer and wolves, max 40
  
  return (
    <div style={{
      marginBottom: '5px'
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
            color, 
            fontSize: '13px',
            fontFamily: 'Tahoma, Arial, sans-serif'
          }}>
            {count} {type}
          </span>
        </div>
      </div>
      
      <div style={{
        height: '12px',
        backgroundColor: bgColor,
        borderRadius: '6px',
        border: `1px solid ${color}`,
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: color,
          borderRadius: '5px',
          transition: 'width 0.5s ease'
        }}></div>
        
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          padding: '0 5px',
          overflow: 'hidden'
        }}>
          {[...Array(emojiCount)].map((_, i) => (
            <span key={i} style={{ 
              fontSize: '10px',
              opacity: 0.8,
              marginRight: '2px',
              filter: 'drop-shadow(0 0 1px white)'
            }}>{emoji}</span>
          ))}
          
          {(type !== 'trees' && count > 40) && (
            <span style={{ 
              fontSize: '8px', 
              color: 'white',
              marginLeft: '2px',
              alignSelf: 'center',
              textShadow: '0 0 2px black'
            }}>
              +{count - 40} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Speed control dropdown
const SpeedControl = ({ speed, onSpeedChange }) => {
  const options = [
    { label: "0.5×", value: 2000 },
    { label: "1×", value: 1000 },
    { label: "2×", value: 500 },
    { label: "3×", value: 333 },
    { label: "5×", value: 200 }
  ];
  
  const currentOption = options.find(opt => opt.value === speed) || options[1];
  
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{ position: 'relative' }}>
      <ClassicXPButton 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          fontSize: '13px',
          fontWeight: 'bold',
          minWidth: '60px'
        }}
      >
        {currentOption.label} <span style={{ fontSize: '8px', marginLeft: '4px' }}>▼</span>
      </ClassicXPButton>
      
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '3px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          zIndex: 100
        }}>
          {options.map(option => (
            <div 
              key={option.value}
              onClick={() => {
                onSpeedChange(option.value);
                setIsOpen(false);
              }}
              style={{
                padding: '6px',
                cursor: 'pointer',
                backgroundColor: option.value === speed ? '#e8f5e9' : 'transparent',
                fontFamily: 'Tahoma, Arial, sans-serif',
                fontSize: '12px',
                textAlign: 'center',
                borderBottom: '1px solid #eee'
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

// Main Component
const GameVisualization = () => {
  const navigate = useNavigate();
  // UI state
  const [showLogs, setShowLogs] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showInitialization, setShowInitialization] = useState(false);
  const [initProgress, setInitProgress] = useState(0);
  const [initComplete, setInitComplete] = useState(false);
  const [simulationStarted, setSimulationStarted] = useState(false);
  
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
  
  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
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
    }, 50); // Adjust timing to make it feel like a substantial process
  };
  
  const completeInitialization = () => {
    setShowInitialization(false);
    setSimulationStarted(true);
    // Auto-start the simulation
    startSimulation();
  };
  
  // Handle simulation reset/replay
  const handleReplay = () => {
    resetSimulation();
    setInitProgress(0);
    setInitComplete(false);
    setShowInitialization(true);
    startInitialization();
  };
  
  // Placeholder functions for interaction buttons
  const handleShootDeer = () => {
    addLog("User shot a deer", "system");
    // Actual implementation will come later
  };
  
  const handleShootWolf = () => {
    addLog("User shot a wolf", "system");
    // Actual implementation will come later
  };
  
  const handleHarvestTree = () => {
    addLog("User harvested a tree", "system");
    // Actual implementation will come later
  };
  
  const handlePlantSeedling = () => {
    addLog("User planted a seedling", "system");
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

  // Common style for section containers
  const sectionStyle = {
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    padding: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '15px',
    border: '1px solid #ccc'
  };
  
  return (
    <div className="game-visualization" style={{ 
      fontFamily: 'Tahoma, Arial, sans-serif',
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '10px'
    }}>
      {/* Show intro popup */}
      {showIntro && (
        <IntroPopup 
          onStart={startInitialization} 
          onClose={() => navigate('/portfolio')} 
        />
      )}
      
      {/* Show initialization popup */}
      {showInitialization && (
        <InitializationPopup 
          progress={initProgress} 
          isComplete={initComplete}
          onComplete={completeInitialization} 
        />
      )}
      
      {/* Show completion popup */}
      {isComplete && simulationStarted && (
        <CompletionPopup 
          stats={playerStats}
          onReplay={handleReplay}
          onBackToWorks={() => navigate('/behind-works')}
          onMainMenu={() => navigate('/portfolio')}
        />
      )}
      
      {/* Top Control Bar */}
      <div style={{ 
        backgroundColor: '#e0e0e0', 
        padding: '8px 15px', 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 'inset 0 1px 0 #fff, 0 1px 3px rgba(0,0,0,0.1)',
        borderRadius: '4px',
        marginBottom: '10px',
        gap: '15px'
      }}>
        <div style={{ 
          fontWeight: 'bold', 
          fontSize: '14px',
          padding: '5px 10px',
          backgroundColor: 'rgba(255,255,255,0.5)',
          border: '1px solid #ccc',
          borderRadius: '3px',
          minWidth: '100px',
          textAlign: 'center',
          boxShadow: 'inset 0 1px 0 #fff'
        }}>
          Year: {currentYear} / {simulationConfig.years}
        </div>
        
        {isRunning ? (
          <ClassicXPButton 
            onClick={stopSimulation}
            primary
            size="medium"
            style={{ 
              backgroundColor: '#cd5c5c', 
              minWidth: '90px',
              padding: '4px 8px'
            }}
          >
            ⏸ Pause
          </ClassicXPButton>
        ) : (
          <ClassicXPButton 
            onClick={startSimulation}
            disabled={!isInitialized || isStabilizing || isComplete}
            primary
            size="medium"
            style={{ 
              backgroundColor: '#3cb371', 
              minWidth: '90px',
              padding: '4px 8px'
            }}
          >
            ▶ Resume
          </ClassicXPButton>
        )}
        
        <SpeedControl 
          speed={simulationSpeed}
          onSpeedChange={handleSpeedChange}
        />
      </div>

      {/* Main Game Container */}
      <div style={sectionStyle}>
        {/* Population bars */}
        <div style={{ marginBottom: '10px' }}>
          <PopulationBar 
            type="trees" 
            count={stats.trees.total} 
            maxCount={simulationConfig.graph.MAX_TREE_POPULATION}
          />
          <PopulationBar 
            type="deer" 
            count={stats.deer.total} 
            maxCount={simulationConfig.graph.MAX_DEER_POPULATION}
          />
          <PopulationBar 
            type="wolf" 
            count={stats.wolves.total} 
            maxCount={simulationConfig.graph.MAX_WOLF_POPULATION}
          />
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '3fr 1fr',
          gap: '15px',
        }}>
          {/* Left column - Forest Visualization */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '4px',
            padding: '10px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #ddd',
            height: '100%'
          }}>
            <SimpleForestView simulationManager={simulationManager} />
          </div>
          
          {/* Right column - Actions and Feedback */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            height: '100%'
          }}>
            {/* Action Buttons */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '4px',
              padding: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #ddd'
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#996515',
                marginBottom: '8px',
                textAlign: 'center'
              }}>
                Actions
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}>
                <button 
                  onClick={handleShootDeer}
                  style={{
                    backgroundColor: '#4caf50',
                    color: 'white',
                    border: '1px solid #388e3c',
                    borderRadius: '3px',
                    padding: '5px 0',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                    boxShadow: 'inset 0 1px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <span>🦌</span> Shoot Deer
                </button>
                
                <button 
                  onClick={handleShootWolf}
                  style={{
                    backgroundColor: '#4caf50',
                    color: 'white',
                    border: '1px solid #388e3c',
                    borderRadius: '3px',
                    padding: '5px 0',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                    boxShadow: 'inset 0 1px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <span>🐺</span> Shoot Wolf
                </button>
                
                <button 
                  onClick={handleHarvestTree}
                  style={{
                    backgroundColor: '#4caf50',
                    color: 'white',
                    border: '1px solid #388e3c',
                    borderRadius: '3px',
                    padding: '5px 0',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                    boxShadow: 'inset 0 1px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <span>🌲</span> Harvest Tree
                </button>
                
                <button 
                  onClick={handlePlantSeedling}
                  style={{
                    backgroundColor: '#4caf50',
                    color: 'white',
                    border: '1px solid #388e3c',
                    borderRadius: '3px',
                    padding: '5px 0',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                    boxShadow: 'inset 0 1px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <span>🌱</span> Plant Seedling
                </button>
              </div>
            </div>
            
            {/* Ecosystem Stats/Feedback */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '4px',
              padding: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #ddd',
              flex: '1'
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#996515',
                marginBottom: '8px',
                textAlign: 'center'
              }}>
                Ecosystem Stats
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '6px'
              }}>
                {Object.entries(playerStats).map(([key, value]) => (
                  <div key={key} style={{
                    backgroundColor: '#f9f9f9',
                    border: '1px solid #ddd',
                    borderRadius: '3px',
                    padding: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px'
                  }}>
                    <div style={{ fontSize: '15px' }}>
                      {key === 'carbonCaptured' ? '🌿' : 
                       key === 'moneyEarned' ? '💰' : 
                       key === 'animalsKilled' ? '🩸' : 
                       key === 'treesPlanted' ? '🌱' : 
                       key === 'ecosystemHealth' ? '❤️' : 
                       key === 'sustainabilityScore' ? '♻️' : '📊'}
                    </div>
                    <div style={{
                      fontFamily: 'Tahoma, Arial, sans-serif',
                      fontSize: '9px',
                      color: '#666',
                      textTransform: 'capitalize'
                    }}>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                    </div>
                    <div style={{
                      fontFamily: 'Tahoma, Arial, sans-serif',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      color: '#333'
                    }}>
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Game Container - Graphs and Stats Cards */}
      <div style={sectionStyle}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '15px'
        }}>
          {/* Tree Column */}
          <div>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '4px',
              padding: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #ddd',
              marginBottom: '10px'
            }}>
              <SinglePopulationGraph 
                dataKey="trees"
                color="#228B22"
                maxValue={simulationConfig.graph.MAX_TREE_POPULATION}
                currentYear={currentYear}
                populationData={populationData}
                valueLabel="Trees"
                title="Trees"
              />
            </div>
            
            <div style={{
              backgroundColor: 'white',
              borderRadius: '4px',
              padding: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #ddd'
            }}>
              <CompactStatsCard 
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
          </div>
          
          {/* Deer Column */}
          <div>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '4px',
              padding: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #ddd',
              marginBottom: '10px'
            }}>
              <SinglePopulationGraph 
                dataKey="deer"
                color="#8B4513"
                maxValue={simulationConfig.graph.MAX_DEER_POPULATION}
                currentYear={currentYear}
                populationData={populationData}
                valueLabel="Deer"
                title="Deer"
              />
            </div>
            
            <div style={{
              backgroundColor: 'white',
              borderRadius: '4px',
              padding: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #ddd'
            }}>
              <CompactStatsCard 
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
          </div>
          
          {/* Wolves Column */}
          <div>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '4px',
              padding: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #ddd',
              marginBottom: '10px'
            }}>
              <SinglePopulationGraph 
                dataKey="wolves"
                color="#555"
                maxValue={simulationConfig.graph.MAX_WOLF_POPULATION}
                currentYear={currentYear}
                populationData={populationData}
                valueLabel="Wolves"
                title="Wolves"
              />
            </div>
            
            <div style={{
              backgroundColor: 'white',
              borderRadius: '4px',
              padding: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #ddd'
            }}>
              <CompactStatsCard 
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
        </div>
      </div>
      
      {/* Logs toggle */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px'
      }}>
        <ClassicXPButton
          onClick={handleToggleLogs}
          style={{
            padding: '4px 20px',
            backgroundColor: showLogs ? '#4caf50' : '#e0e0e0',
            color: showLogs ? 'white' : 'black'
          }}
        >
          {showLogs ? 'Hide Logs' : 'Show Logs'}
        </ClassicXPButton>
      </div>
      
      {/* Logs panel (collapsible) */}
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

export default GameVisualization;