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
    // Content for the "What the Project is Now" tab
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
            In this section, I'll present the project including the website with all its components and particularly the simulation in more detail.
          </p>
          
          <h4 style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            color: '#2a8a43',
            fontSize: '16px',
            paddingBottom: '3px',
            marginTop: '20px',
            textShadow: '1px 1px 0 rgba(255,255,255,1)'
          }}>
            The Website
          </h4>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            The project in its current state comprises a website with three main components: CV, Cover Letter, and the Portfolio work. The website provides simple and interactive access to the three main parts of my application. I decided to include the CV and Cover Letter as they are essential components of my application process.
          </p>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Navigation on the website is possible using the labeled buttons. If you encounter any issues with a component, I recommend closing the browser, restarting it, and reloading the page.
          </p>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            For now, the site is optimized for desktop viewing. I would have liked to create a mobile version as well, but unfortunately, time constraints didn't allow for this.
          </p>
          
          <h4 style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            color: '#2a8a43',
            fontSize: '16px',
            paddingBottom: '3px',
            marginTop: '20px',
            textShadow: '1px 1px 0 rgba(255,255,255,1)'
          }}>
            CV
          </h4>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            The CV available on the website and submitted with the portfolio is the same as my official one. To meet application requirements, I created a conventional resume that briefly summarizes my educational and professional background as well as other skills in bullet points.
          </p>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            However, since I'm applying for a design-oriented master's program, I felt it was important to highlight and share the phases in my life where design processes were particularly significant. I believe these phases and processes play an important role in understanding how an environmental engineer on a career ladder decides to apply for a design-oriented master's program.
          </p>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Therefore, I created an alternative, non-conventional resume that feels more relevant to this application.
          </p>
          
          <h4 style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            color: '#2a8a43',
            fontSize: '16px',
            paddingBottom: '3px',
            marginTop: '20px',
            textShadow: '1px 1px 0 rgba(255,255,255,1)'
          }}>
            Cover Letter
          </h4>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            The entire portfolio including CV, simulation, and these texts here, is intended to demonstrate my motivation for the program. The Cover Letter is the essence of the other components that show my story, my enthusiasm for processes and design, and my technical skills.
          </p>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            While the Cover Letter can be read and understood on its own, it was important for me to integrate it here as well, as it feels more coherent when embedded within the other components.
          </p>
          
          <h4 style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            color: '#2a8a43',
            fontSize: '16px',
            paddingBottom: '3px',
            marginTop: '20px',
            textShadow: '1px 1px 0 rgba(255,255,255,1)'
          }}>
            Portfolio
          </h4>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            The Portfolio branch offers both the presentation of my simulation and the background of the work process in three steps: What led to this work? What is the work now? And what else would have been possible?
          </p>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            This text and illustrations aim to illustrate the process and show which thoughts led to this form of application. This creates not only a superficial product but a deeper level of understanding of the thoughts and feelings that led to this point.
          </p>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            The goal of the simulation in its current state is to present complex interactions between populations of trees, deer, and wolves in an ecosystem as simply as possible. Ideally, the user should learn in a playful way how forests suffer through the pursuit of monetary interests and what, for example, wolves can contribute to an ecosystem.
          </p>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            While the mechanisms on which the simulation is based are meant to represent reality to a certain extent, many real-world processes had to be simplified. For example, the simulation is limited to 3 populations, and the mobility of deer and wolves is neglected as it doesn't play a role in this simulation.
          </p>
          
          <h4 style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            color: '#2a8a43',
            fontSize: '16px',
            paddingBottom: '3px',
            marginTop: '20px',
            textShadow: '1px 1px 0 rgba(255,255,255,1)'
          }}>
            Simulation Mechanics
          </h4>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            The ecosystem simulation models the interactions between three key species:
          </p>
          
          <div style={{
            backgroundColor: 'rgba(42, 138, 67, 0.1)',
            border: '1px solid rgba(42, 138, 67, 0.3)',
            borderRadius: '8px',
            padding: '15px',
            margin: '15px 0'
          }}>
            <p style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5',
              fontWeight: 'bold',
              color: '#2a8a43',
              margin: '0 0 8px 0'
            }}>
              Trees:
            </p>
            <ul style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5',
              margin: '0 0 12px 0',
              paddingLeft: '25px'
            }}>
              <li>Growth cycle that increases age, height, and mass yearly</li>
              <li>Natural mortality based on age and environmental stress</li>
              <li>Reproduction capacity dependent on maturity and forest density</li>
              <li>Vulnerability to consumption by deer, particularly young trees</li>
            </ul>
            
            <p style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5',
              fontWeight: 'bold',
              color: '#8B4513',
              margin: '12px 0 8px 0'
            }}>
              Deer:
            </p>
            <ul style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5',
              margin: '0 0 12px 0',
              paddingLeft: '25px'
            }}>
              <li>Growth and aging system with corresponding physical attributes</li>
              <li>Foraging behavior that targets young, edible trees</li>
              <li>Reproduction rates affected by population density and environmental factors</li>
              <li>Natural mortality from age, predation, and starvation</li>
              <li>Migration mechanics bringing new deer into the ecosystem</li>
            </ul>
            
            <p style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5',
              fontWeight: 'bold',
              color: '#555',
              margin: '12px 0 8px 0'
            }}>
              Wolves:
            </p>
            <ul style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5',
              margin: '0 0 12px 0',
              paddingLeft: '25px'
            }}>
              <li>Hunting behavior targeting deer as their primary food source</li>
              <li>Pack dynamics that improve hunting success</li>
              <li>Age-based mortality and starvation risks</li>
              <li>Reproduction rates linked to food availability and pack size</li>
              <li>Migration patterns bringing new wolves when populations are low</li>
            </ul>
            
            <p style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5',
              fontWeight: 'bold',
              color: '#2a8a43',
              margin: '12px 0 8px 0'
            }}>
              Inter-species Dynamics:
            </p>
            <ul style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5',
              margin: '0',
              paddingLeft: '25px'
            }}>
              <li>Trees provide food for deer, creating a producer-consumer relationship</li>
              <li>Deer populations are controlled by wolf predation, forming a predator-prey dynamic</li>
              <li>Wolves indirectly protect forests by controlling deer populations</li>
              <li>A balanced ecosystem emerges when all three populations reach sustainable levels</li>
            </ul>
          </div>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            These mechanics create a simplified but representative model of trophic cascades in forest ecosystems, where predators indirectly benefit plant life by controlling herbivore populations.
          </p>
          
          <h4 style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            color: '#2a8a43',
            fontSize: '16px',
            paddingBottom: '3px',
            marginTop: '20px',
            textShadow: '1px 1px 0 rgba(255,255,255,1)'
          }}>
            Scientific Context
          </h4>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            The simulation draws from established ecological principles:
          </p>
          
          <div style={{
            backgroundColor: 'rgba(42, 138, 67, 0.05)',
            border: '1px solid rgba(42, 138, 67, 0.2)',
            borderRadius: '8px',
            padding: '15px',
            margin: '15px 0'
          }}>
            <p style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5',
              margin: '0 0 12px 0'
            }}>
              <strong>Trophic Cascades:</strong> Research by Ripple and Beschta (2012)<sup>1</sup> demonstrates how predators like wolves create cascading effects through ecosystems by controlling herbivore populations, which in turn affects vegetation structure and density.
            </p>
            
            <p style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5',
              margin: '0 0 12px 0'
            }}>
              <strong>Carrying Capacity:</strong> The model incorporates principles described by Côté et al. (2004)<sup>2</sup> regarding how deer populations can exceed the environment's carrying capacity in the absence of predators, leading to forest degradation.
            </p>
            
            <p style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5',
              margin: '0 0 12px 0'
            }}>
              <strong>Wolf Reintroduction Benefits:</strong> Studies from Yellowstone National Park by Fortin et al. (2005)<sup>3</sup> show how wolf reintroduction altered elk behavior and distribution, allowing for regeneration of aspen and willow communities.
            </p>
            
            <p style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5',
              margin: '0'
            }}>
              <strong>Forest Regeneration Cycles:</strong> The tree growth and reproduction mechanics are based on forestry models that account for seedling establishment, competition for resources, and stand dynamics as described by Oliver and Larson (1996)<sup>4</sup>.
            </p>
          </div>
          
          <h4 style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            color: '#2a8a43',
            fontSize: '16px',
            paddingBottom: '3px',
            marginTop: '20px',
            textShadow: '1px 1px 0 rgba(255,255,255,1)'
          }}>
            Simulation Components
          </h4>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            The interface provides several ways to interact with and observe the ecosystem:
          </p>
          
          <ul style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5',
            paddingLeft: '25px'
          }}>
            <li><strong>Population Bars:</strong> Visual indicators showing current population levels of trees, deer, and wolves relative to their maximum sustainable numbers.</li>
            <li><strong>Forest Visualization:</strong> A color-coded grid representing tree density across the forest ecosystem, with darker greens indicating denser forest areas.</li>
            <li><strong>Action Buttons:</strong> Allow users to directly interact with the ecosystem through hunting (deer/wolves) and forest management (planting/harvesting trees).</li>
            <li><strong>Population Graphs:</strong> Track changes in each species population over time, helping visualize long-term trends and relationships.</li>
            <li><strong>Statistics Cards:</strong> Provide detailed information about each species, including population size, average age, reproduction rates, and causes of mortality.</li>
            <li><strong>Speed Controls:</strong> Allow users to adjust simulation speed to observe short-term interactions or long-term ecosystem evolution.</li>
          </ul>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5',
            marginTop: '15px'
          }}>
            The simulation runs for 100 simulated years, allowing users to observe complete cycles of ecosystem dynamics, including stabilization periods, population booms and crashes, and potential recovery phases.
          </p>
          
          <div style={{
            borderTop: '1px solid #e0e0e0',
            marginTop: '25px',
            paddingTop: '15px',
            fontSize: '12px',
            color: '#666'
          }}>
            <p style={{ margin: '0 0 5px 0' }}>
              <sup>1</sup> Ripple, W. J., & Beschta, R. L. (2012). Trophic cascades in Yellowstone: The first 15 years after wolf reintroduction. Biological Conservation, 145(1), 205-213.
            </p>
            <p style={{ margin: '0 0 5px 0' }}>
              <sup>2</sup> Côté, S. D., Rooney, T. P., Tremblay, J. P., Dussault, C., & Waller, D. M. (2004). Ecological impacts of deer overabundance. Annual Review of Ecology, Evolution, and Systematics, 35, 113-147.
            </p>
            <p style={{ margin: '0 0 5px 0' }}>
              <sup>3</sup> Fortin, D., Beyer, H. L., Boyce, M. S., Smith, D. W., Duchesne, T., & Mao, J. S. (2005). Wolves influence elk movements: Behavior shapes a trophic cascade in Yellowstone National Park. Ecology, 86(5), 1320-1330.
            </p>
            <p style={{ margin: '0' }}>
              <sup>4</sup> Oliver, C. D., & Larson, B. C. (1996). Forest stand dynamics: Updated edition. John Wiley and Sons.
            </p>
          </div>
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