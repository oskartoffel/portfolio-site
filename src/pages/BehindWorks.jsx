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
      content: `Right now, I'm one day away from starting my civil service, which leaves me only five days (or more accurately, five evenings after physically tiring workdays) to finalize a portfolio I've poured every bit of energy into over the last three weeks—juggling a physically demanding job and navigating personal crises along the way. I've never thrown myself so completely into a project that I could shape entirely on my own terms.
      
      That freedom is both exhilarating and terrifying. On one hand, no one's telling me what to do or how to do it—which is wonderful. On the other hand, if it fails or if people think it's terrible, I can't just say, "Well, someone else told me to do it this way." I'm fully responsible for every aspect of this portfolio. If it's well-received, I can proudly say I made it all by myself. But if people criticize it, I can't push that onto anyone else. It's all me, and that vulnerability feels huge.

      During these past few weeks, I've felt so alive. I've been rolling out of bed at seven in the morning just to spend an hour or two at my desk coding before my bike courier shift, often determined to fix one specific bug that might've haunted me for days. When a new feature actually works the first time around, or when I finally track down some elusive error, the sense of accomplishment is incredible—it makes every frustration worthwhile.
      
      Having the freedom to decide how this project should look and what direction it should take has given me a drive I barely recognize in myself. Coming from an environmental engineering background where I was constantly told exactly what to study or memorize, this feels like a breath of fresh air. In that world, success often amounted to being able to learn and regurgitate information under pressure, earning a piece of paper that says, "Yes, you can perform well in difficult conditions." But rarely was I ever encouraged to say, "I want to explore this topic because it fascinates me."
      
      I also grew up in an environment that valued a straight-and-narrow academic path, with the goal of a secure job, a stable income, and eventually a house for a future family. Creativity was never exactly discouraged, but it wasn't actively rewarded or even acknowledged. As a result, it often felt like there was no space for it—yet, I know now that wasn't entirely true. My life outside school and university has always contained sparks of creativity; it's just that I never called it "design" or even recognized it as such until recently.`
    },
    // Content for the "What the Project is Now" tab
    {
      title: "What the Project is Now",
      content: `In this section, I'll present the project including the website with all its components and particularly the simulation in more detail.

The Website:
The project in its current state comprises a website with three main components: CV, Cover Letter, and the Portfolio work. The website provides simple and interactive access to the three main parts of my application. I decided to include the CV and Cover Letter as they are essential components of my application process.

Navigation on the website is possible using the labeled buttons. If you encounter any issues with a component, I recommend closing the browser, restarting it, and reloading the page.

For now, the site is optimized for desktop viewing. I would have liked to create a mobile version as well, but unfortunately, time constraints didn't allow for this.

CV:
The CV available on the website and submitted with the portfolio is the same as my official one. To meet application requirements, I created a conventional resume that briefly summarizes my educational and professional background as well as other skills in bullet points.

However, since I'm applying for a design-oriented master's program, I felt it was important to highlight and share the phases in my life where design processes were particularly significant. I believe these phases and processes play an important role in understanding how an environmental engineer on a career ladder decides to apply for a design-oriented master's program.

Therefore, I created an alternative, non-conventional resume that feels more relevant to this application.

Cover Letter:
The entire portfolio including CV, simulation, and these texts here, is intended to demonstrate my motivation for the program. The Cover Letter is the essence of the other components that show my story, my enthusiasm for processes and design, and my technical skills.

While the Cover Letter can be read and understood on its own, it was important for me to integrate it here as well, as it feels more coherent when embedded within the other components.

Portfolio:
The Portfolio branch offers both the presentation of my simulation and the background of the work process in three steps: What led to this work? What is the work now? And what else would have been possible?

This text and illustrations aim to illustrate the process and show which thoughts led to this form of application. This creates not only a superficial product but a deeper level of understanding of the thoughts and feelings that led to this point.

The goal of the simulation in its current state is to present complex interactions between populations of trees, deer, and wolves in an ecosystem as simply as possible. Ideally, the user should learn in a playful way how forests suffer through the pursuit of monetary interests and what, for example, wolves can contribute to an ecosystem.

While the mechanisms on which the simulation is based are meant to represent reality to a certain extent, many real-world processes had to be simplified. For example, the simulation is limited to 3 populations, and the mobility of deer and wolves is neglected as it doesn't play a role in this simulation.

Simulation Mechanics:
The ecosystem simulation models the interactions between three key species:

Trees:
- Growth cycle that increases age, height, and mass yearly
- Natural mortality based on age and environmental stress
- Reproduction capacity dependent on maturity and forest density
- Vulnerability to consumption by deer, particularly young trees

Deer:
- Growth and aging system with corresponding physical attributes
- Foraging behavior that targets young, edible trees
- Reproduction rates affected by population density and environmental factors
- Natural mortality from age, predation, and starvation
- Migration mechanics bringing new deer into the ecosystem

Wolves:
- Hunting behavior targeting deer as their primary food source
- Pack dynamics that improve hunting success
- Age-based mortality and starvation risks
- Reproduction rates linked to food availability and pack size
- Migration patterns bringing new wolves when populations are low

Inter-species Dynamics:
- Trees provide food for deer, creating a producer-consumer relationship
- Deer populations are controlled by wolf predation, forming a predator-prey dynamic
- Wolves indirectly protect forests by controlling deer populations
- A balanced ecosystem emerges when all three populations reach sustainable levels

These mechanics create a simplified but representative model of trophic cascades in forest ecosystems, where predators indirectly benefit plant life by controlling herbivore populations.

Scientific Context:
The simulation draws from established ecological principles:

Trophic Cascades: Research by Ripple and Beschta (2012)¹ demonstrates how predators like wolves create cascading effects through ecosystems by controlling herbivore populations, which in turn affects vegetation structure and density.

Carrying Capacity: The model incorporates principles described by Côté et al. (2004)² regarding how deer populations can exceed the environment's carrying capacity in the absence of predators, leading to forest degradation.

Wolf Reintroduction Benefits: Studies from Yellowstone National Park by Fortin et al. (2005)³ show how wolf reintroduction altered elk behavior and distribution, allowing for regeneration of aspen and willow communities.

Forest Regeneration Cycles: The tree growth and reproduction mechanics are based on forestry models that account for seedling establishment, competition for resources, and stand dynamics as described by Oliver and Larson (1996)⁴.

Simulation Components:
The interface provides several ways to interact with and observe the ecosystem:
- Population Bars: Visual indicators showing current population levels of trees, deer, and wolves relative to their maximum sustainable numbers.
- Forest Visualization: A color-coded grid representing tree density across the forest ecosystem, with darker greens indicating denser forest areas.
- Action Buttons: Allow users to directly interact with the ecosystem through hunting (deer/wolves) and forest management (planting/harvesting trees).
- Population Graphs: Track changes in each species population over time, helping visualize long-term trends and relationships.
- Statistics Cards: Provide detailed information about each species, including population size, average age, reproduction rates, and causes of mortality.
- Speed Controls: Allow users to adjust simulation speed to observe short-term interactions or long-term ecosystem evolution.

The simulation runs for 100 simulated years, allowing users to observe complete cycles of ecosystem dynamics, including stabilization periods, population booms and crashes, and potential recovery phases.

¹ Ripple, W. J., & Beschta, R. L. (2012). Trophic cascades in Yellowstone: The first 15 years after wolf reintroduction. Biological Conservation, 145(1), 205-213.
² Côté, S. D., Rooney, T. P., Tremblay, J. P., Dussault, C., & Waller, D. M. (2004). Ecological impacts of deer overabundance. Annual Review of Ecology, Evolution, and Systematics, 35, 113-147.
³ Fortin, D., Beyer, H. L., Boyce, M. S., Smith, D. W., Duchesne, T., & Mao, J. S. (2005). Wolves influence elk movements: Behavior shapes a trophic cascade in Yellowstone National Park. Ecology, 86(5), 1320-1330.
⁴ Oliver, C. D., & Larson, B. C. (1996). Forest stand dynamics: Updated edition. John Wiley and Sons.`
    },
    {
      title: "What the Project Could Be",
      content: `What Could the Future Hold?

I've already mentioned where the project currently stands, so now I'd like to share how I would have continued if I'd had more time—especially regarding the simulation. I also would have loved to invest more effort in the website's design, making the visit even more interactive and personal. This includes refining the layout, creating a more unified look, and adding more effects and links to guide people smoothly through the content.

Ideas for the Simulation:
The part I would have loved to spend much more time on is the visualization. Currently, it shows a pixelated green area, along with health bars and graphs. With sufficient explanation, it's understandable—but my goal was for someone to see the simulation and immediately grasp what's happening, without needing any extra explanation. That's why I envisioned a 3D animation, viewed from above, showing how the forest evolves over time.

I've done a few sketches to outline these ideas, and one possibility would be using Blender or Three.js. If the user could see deer and wolves moving around, it would be easier and more intuitive to see their roles in the ecosystem. Since learning new tools takes a lot of time and energy, I decided to pause here for now—but I still think a fully 3D world would make the simulation feel much more alive.

In a future, more scientific setting, it would also be possible to expand the ecosystem with additional species, or enrich existing populations with more functions, depending on the data needed. Generally, I would aim to simplify the interface and accessibility. I want people—on a playful level—to understand how important ecosystems are, and in this specific example, how vital wolves can be. The easier and clearer it is, the more quickly people can learn.

Future Enhancement Ideas:
- Enhanced Visualization: 3D representation with animated animals and growing trees
- Additional Species: Include more animals like foxes, bears, and various bird species
- Climate Factors: Add weather patterns and climate change scenarios
- Human Interaction: Simulate human impacts like hunting, logging, and conservation
- Expanded Terrain: Different habitats (mountains, wetlands, etc.) in the same ecosystem
- Educational Scenarios: Preset scenarios showing different ecological concepts
- Data Export: Allow researchers to download simulation data for analysis

I've heard of projects that create games or simulations for decision-makers, giving them a low-risk, playful environment that can guide them toward more sustainable choices—ones that benefit both humans and nature rather than just boosting someone's wallet. I could definitely imagine dedicating my time to something like that, whether in a master's program or somewhere else in my future.

In fact, I can see myself working on different types of simulations. I've often wondered about simulating society and politics, then testing what kinds of protests or acts of resistance might be most constructive. Which forms of resistance would lead to a more positive outcome and which would actually strengthen certain negative trends, like the rise of extremism? I'm not sure how feasible that is, but it's the kind of next-level simulation that really excites me.

General Thoughts on the Website:
I'll definitely keep the website in some shape or form and might expand it in the future. I really like the concept of applying for things with a "combined" website that features my CV, portfolio, and cover letter all in one place. It lets me tie different points together and offer a cohesive application. Plus, all I have to do is share a link, and everything's right there.

Final Reflection:
This project has been a journey of discovery—not just about ecosystems and programming, but about my own creative process and how I approach problem-solving. While there's still so much I want to add and improve, I'm proud of what I've accomplished in the time I had. The blend of scientific knowledge, technical skills, and creative expression represented here feels like an authentic representation of who I am and what I hope to bring to a design program.`
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
            {tabContent[activeTab].content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} style={{ 
                marginBottom: '15px',
                fontFamily: 'Tahoma, Arial, sans-serif',
                fontSize: '14px',
                lineHeight: '1.5'
              }}>
                {paragraph}
              </p>
            ))}
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