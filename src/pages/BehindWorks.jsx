// src/pages/BehindWorks.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClassicWindow from '../components/ui/ClassicWindow';
import ClassicXPButton from '../components/ui/ClassicXPButton';
import XPBackground from '../components/ui/XPBackground';
import { useTheme } from '../components/ui/ThemeProvider';

const BehindWorks = () => {
  const { setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  
  // Force portfolio theme when component mounts and when navigating to this page
  useEffect(() => {
    // Immediate application
    document.body.classList.remove('theme-home', 'theme-cv', 'theme-coverletter');
    document.body.classList.add('theme-portfolio');
    
    // Set theme through provider too (for consistency)
    setTheme('portfolio');
    
    // Cleanup function to prevent memory leaks
    return () => {
      // No cleanup needed since we'll handle theme changes globally
    };
  }, [setTheme]);

  // Tab content
  const tabContent = [
    {
      title: "What Led to the Project",
      content: (
        <>
          <h3 style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            color: '#2a8a43',
            fontSize: '20px',
            paddingBottom: '5px',
            borderLeft: '4px solid #2a8a43',
            paddingLeft: '10px',
            marginTop: '0',
            textShadow: '1px 1px 0 rgba(255,255,255,1)'
          }}>
            What Led to the Project
          </h3>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            My interest in ecosystem dynamics began during my environmental engineering studies at ETH Lausanne. 
            The complex interactions between species and their environment fascinated me, especially how small 
            changes can lead to significant ecological shifts. I was particularly drawn to forest ecosystems 
            because of their rich biodiversity and critical role in climate regulation.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Having worked in environmental conservation during my civil service at Oekoskop, I witnessed 
            firsthand the delicate balance of natural systems. This simulation project emerged from my desire 
            to visually demonstrate these principles and make ecological concepts more accessible to others.
          </p>
        </>
      )
    },
    {
      title: "What the Project is Now",
      content: (
        <>
          <h3 style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            color: '#2a8a43',
            fontSize: '20px',
            paddingBottom: '5px',
            borderLeft: '4px solid #2a8a43',
            paddingLeft: '10px',
            marginTop: '0',
            textShadow: '1px 1px 0 rgba(255,255,255,1)'
          }}>
            What the Project is Now
          </h3>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            The current simulation demonstrates a forest ecosystem with three key species: trees, deer, and wolves. 
            Each species has its own lifecycle, including growth, reproduction, and mortality. The simulation 
            tracks population dynamics, showing how these species interact and affect each other over time.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Technical aspects include:
          </p>
          <ul style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5',
            paddingLeft: '20px'
          }}>
            <li>Realistic modeling of species interactions (predator-prey dynamics)</li>
            <li>Visual representation of forest density and population changes</li>
            <li>Statistical tracking of ecosystem metrics</li>
            <li>Real-time graphing of population trends</li>
          </ul>
        </>
      )
    },
    {
      title: "What the Project Could Be",
      content: (
        <>
          <h3 style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            color: '#2a8a43',
            fontSize: '20px',
            paddingBottom: '5px',
            borderLeft: '4px solid #2a8a43',
            paddingLeft: '10px',
            marginTop: '0',
            textShadow: '1px 1px 0 rgba(255,255,255,1)'
          }}>
            What the Project Could Be
          </h3>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            I envision expanding this simulation to include:
          </p>
          <ul style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5',
            paddingLeft: '20px'
          }}>
            <li>A more comprehensive educational tool with guided scenarios</li>
            <li>Climate change simulation effects on the ecosystem</li>
            <li>Additional species and more complex interaction webs</li>
            <li>3D visualization of the forest environment</li>
            <li>Interactive elements allowing users to actively manage the ecosystem</li>
            <li>Research applications for testing ecological theories</li>
          </ul>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            The ultimate goal would be to create a powerful yet accessible tool for both education and 
            research in ecosystem dynamics and conservation management.
          </p>
        </>
      )
    }
  ];

  return (
    <XPBackground>
      <ClassicWindow title="Behind My Works">
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ 
            fontFamily: 'Popstar, Tahoma, Arial, sans-serif',
            color: '#2a8a43',
            fontSize: '26px',
            marginBottom: '25px',
            textAlign: 'center'
          }}>
            Behind My Works
          </h1>
          
          {/* Y2K/XP-style Tab Navigation - Now Centered and Width-Filling */}
          <div style={{
            display: 'flex',
            marginBottom: '0',  // Changed to 0 to connect with content
            position: 'relative',
            zIndex: '1',
            justifyContent: 'center', // Center the tabs
            width: '100%'
          }}>
            {tabContent.map((tab, index) => (
              <div
                key={index}
                onClick={() => setActiveTab(index)}
                style={{
                  padding: '8px 15px',
                  cursor: 'pointer',
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: activeTab === index ? '#006600' : '#333',
                  background: activeTab === index 
                    ? 'linear-gradient(to bottom, #e3f4e9, #b5e6c1 45%, #90d7a3 46%, #b5e6c1)' 
                    : 'linear-gradient(to bottom, #f5f5f5, #e5e5e5 45%, #d5d5d5 46%, #e5e5e5)',
                  borderRadius: '7px 7px 0 0',
                  border: activeTab === index 
                    ? '2px solid #2a8a43' 
                    : '2px solid #999',
                  borderBottom: activeTab === index ? '2px solid #e6f4ea' : '2px solid #2a8a43',
                  boxShadow: activeTab === index 
                    ? 'inset 0px 1px 0px rgba(255,255,255,0.8), 2px -2px 3px rgba(0,0,0,0.03)' 
                    : 'inset 0px 1px 0px rgba(255,255,255,0.5), 1px -1px 2px rgba(0,0,0,0.05)',
                  position: 'relative',
                  bottom: activeTab === index ? '-2px' : '0',
                  zIndex: activeTab === index ? 2 : 1,
                  textShadow: '0 1px 0 rgba(255,255,255,0.7)',
                  flex: '1', // Make tabs fill available width
                  maxWidth: '240px', // Limit maximum width
                  minWidth: '160px', // Ensure minimum width
                  textAlign: 'center',
                  transition: 'all 0.15s ease',
                  marginRight: index < tabContent.length - 1 ? '2px' : '0', // Small gap between tabs
                }}
              >
                {tab.title}
              </div>
            ))}
          </div>
          
          {/* Tab Content Box - XP style - Integrated with tabs */}
          <div style={{ 
            backgroundColor: '#e6f4ea',
            padding: '20px',
            borderRadius: '0 0 8px 8px', // Rounded only at bottom
            border: '2px solid #2a8a43',
            borderTop: 'none', // No border at top to blend with active tab
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.7), 2px 2px 8px rgba(0,0,0,0.1)',
            minHeight: '300px',
            position: 'relative',
            zIndex: '0'
          }}>
            {tabContent[activeTab].content}
          </div>
          
          {/* Navigation Buttons */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '20px',
            marginTop: '40px'
          }}>
            <Link to="/portfolio">
              <ClassicXPButton>
                Back to Portfolio
              </ClassicXPButton>
            </Link>
            <Link to="/ecosystem-simulation">
              <ClassicXPButton primary>
                Launch Simulation
              </ClassicXPButton>
            </Link>
          </div>
        </div>
      </ClassicWindow>
    </XPBackground>
  );
};

export default BehindWorks;