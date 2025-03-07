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
  
  // Action functions 
  const handleShootDeer = () => {
    addLog("User shot a deer", "system");
    // Implementation will come later
  };
  
  const handleShootWolf = () => {
    addLog("User shot a wolf", "system");
    // Implementation will come later
  };
  
  const handleHarvestTree = () => {
    addLog("User harvested a tree", "system");
    // Implementation will come later
  };
  
  const handlePlantSeedling = () => {
    addLog("User planted a seedling", "system");
    // Implementation will come later
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
              {initComplete ? 'Initialization complete!' : 'Please wait while the forest ecosystem stabilizes...'}
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
              {Object.entries(playerStats).map(([key, value]) => (
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
              {playerStats.sustainabilityScore > 70 ? 
                'Excellent work! Your ecosystem management created a balanced and thriving forest environment.' : 
                playerStats.sustainabilityScore > 40 ? 
                'Good job maintaining the ecosystem. With some adjustments, you could create an even more sustainable balance.' : 
                'Your ecosystem experienced significant challenges. Try a different approach to improve sustainability.'}
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
        
        {renderSpeedControl()}
      </div>
    );
  };
  
  // State for speed dropdown
  const [speedDropdownOpen, setSpeedDropdownOpen] = useState(false);
  
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
        <ClassicXPButton 
          onClick={() => setSpeedDropdownOpen(!speedDropdownOpen)}
          style={{
            fontSize: '13px',
            fontWeight: 'bold',
            minWidth: '60px'
          }}
        >
          {currentOption.label} <span style={{ fontSize: '8px', marginLeft: '4px' }}>▼</span>
        </ClassicXPButton>
        
        {speedDropdownOpen && (
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
  
  // Population health bar
  const renderPopulationBar = ({ type, count, maxCount }) => {
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
  
  // Population bars group
  const renderPopulationBars = () => {
    return (
      <div style={{ marginBottom: '10px' }}>
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
  
  // Action buttons
  const renderActionButtons = () => {
    return (
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
    );
  };
  
  // Ecosystem stats/feedback
  const renderEcosystemStats = () => {
    return (
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
            marginBottom: '5px'
          }}>
            {title}
          </div>
        )}
        
        <div style={{
          position: 'relative',
          width: `${graphWidth}px`,
          height: `${graphHeight}px`,
          backgroundColor: 'white',
          borderRadius: '4px',
          border: '1px solid #ddd',
          margin: '0 auto'
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
                strokeWidth="1.5" 
              />
              
              {/* Current value marker */}
              {visibleData.length > 0 && (
                <circle 
                  cx={padding.left + ((visibleData[visibleData.length - 1].year - startYear) * xScale)}
                  cy={padding.top + innerHeight - (visibleData[visibleData.length - 1][dataKey] * yScale)}
                  r="3"
                  fill="white"
                  stroke={color}
                  strokeWidth="1.5"
                />
              )}
            </svg>
          )}
          
          {/* Current value text - compact */}
          <div style={{
            position: 'absolute',
            top: '3px',
            right: '5px',
            fontSize: '10px',
            fontWeight: 'bold',
            backgroundColor: 'rgba(255,255,255,0.7)',
            border: `1px solid ${color}`,
            borderRadius: '2px',
            padding: '1px 3px',
            color: color
          }}>
            {currentValue}
          </div>
        </div>
      </div>
    );
  };
  
  // Compact stats card component
  const renderCompactStatsCard = ({ title, stats, color, iconEmoji }) => {
    return (
      <div style={{ width: '100%' }}>
        {/* Header */}
        <div style={{ 
          backgroundColor: color,
          color: 'white',
          fontWeight: 'bold',
          padding: '3px 6px',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '3px 3px 0 0',
          gap: '5px'
        }}>
          {iconEmoji && <span>{iconEmoji}</span>}
          <span>{title}</span>
        </div>
        
        {/* Content - Clean two-column grid */}
        <div style={{ 
          border: '1px solid #ddd',
          borderTop: 'none',
          borderRadius: '0 0 3px 3px',
          backgroundColor: 'white',
          padding: '5px'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            rowGap: '3px',
            columnGap: '10px'
          }}>
            {Object.entries(stats).map(([key, value]) => (
              <React.Fragment key={key}>
                <div style={{ 
                  textAlign: 'left', 
                  fontSize: '10px',
                  color: '#666'
                }}>
                  {key}:
                </div>
                <div style={{ 
                  textAlign: 'right', 
                  fontWeight: key === 'total' ? 'bold' : 'normal', 
                  fontSize: '10px',
                  color: key === 'total' ? color : '#333'
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
    );
  };
  
  // Section container style
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
      {/* Popups */}
      {renderIntroPopup()}
      {renderInitializationPopup()}
      {renderCompletionPopup()}
      
      {/* Top Control Bar */}
      {renderControlBar()}

      {/* Main Game Container */}
      <div style={sectionStyle}>
        {/* Population bars at top level */}
        {renderPopulationBars()}
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '3fr 1fr',
          gap: '15px',
        }}>
          {/* Forest Visualization */}
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
            {/* Action Buttons at top level */}
            {renderActionButtons()}
            
            {/* Ecosystem Stats at top level */}
            {renderEcosystemStats()}
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
              {renderSingleGraph({
                dataKey: "trees",
                color: "#228B22",
                maxValue: simulationConfig.graph.MAX_TREE_POPULATION,
                title: "Trees"
              })}
            </div>
            
            <div style={{
              backgroundColor: 'white',
              borderRadius: '4px',
              padding: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #ddd'
            }}>
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
            <div style={{
              backgroundColor: 'white',
              borderRadius: '4px',
              padding: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #ddd',
              marginBottom: '10px'
            }}>
              {renderSingleGraph({
                dataKey: "deer",
                color: "#8B4513",
                maxValue: simulationConfig.graph.MAX_DEER_POPULATION,
                title: "Deer"
              })}
            </div>
            
            <div style={{
              backgroundColor: 'white',
              borderRadius: '4px',
              padding: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #ddd'
            }}>
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
            <div style={{
              backgroundColor: 'white',
              borderRadius: '4px',
              padding: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #ddd',
              marginBottom: '10px'
            }}>
              {renderSingleGraph({
                dataKey: "wolves",
                color: "#555",
                maxValue: simulationConfig.graph.MAX_WOLF_POPULATION,
                title: "Wolves"
              })}
            </div>
            
            <div style={{
              backgroundColor: 'white',
              borderRadius: '4px',
              padding: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #ddd'
            }}>
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
      
      {/* Logs toggle */}
      {renderLogsToggle()}
      
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

export default FlatGameVisualization;