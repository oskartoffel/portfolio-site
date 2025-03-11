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
            How Did I End Up at This Point?
          </h3>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            When I first talked to someone about my desire to apply for a design program, it was clear from the start that I didn't have many physical objects to showcase. As I explain in my CV, most of my design processes took place on a non-physical level. Still, I knew I wanted to somehow present and summarize these processes, but I also wanted something concrete to show. Sure, I have a few random drawings I did out of boredom during school, and I could have presented some of the furniture I built. But those were spontaneous projects, never really planned or intended to be shown in a portfolio.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Even in those first conversations, I kept thinking about one specific idea. In my bachelor's program (where I earned 180 credits), 174 of those credits involved assignments with almost no creative freedom. However, I earned six of those credits in a course called 
            <em> Information Technology for Environmental Engineers</em>, which, at first glance, sounds like any other subject. But the professor basically just told us we needed to create a simulation by the end of the semester. Aside from having to use either C or Python, there weren't really any restrictions.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Of course, I was cutting it close with my simulation project and spent the last two weeks of the semester intensively coding. Even though it was a stressful time, I really enjoyed developing a project from scratch and shaping it entirely by myself. I decided to create an ecosystem of trees, deer, and wolves, because ecosystems have always fascinated me: they can be incredibly entangled and complex, with many different species interacting in a thousand ways. Over thousands of years, nature has found a balance that allows all these species to coexist.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            At the time, there was a big public discussion in Switzerland about whether wolves should be hunted or not. So I wanted to illustrate the value of wolves in a forest ecosystem in a simple, accessible way through a simulation. Although it was stressful to finish on time, I had a lot of fun with this project. Whenever someone asked me what I did in my degree, I'd excitedly tell them about this simulation.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            It felt important to me that my portfolio should feature something that ties back to my previous studies. I know I often talk negatively about my bachelor's degree, but I needed to show that, among all the things I had to force myself to learn, there were also interesting topics. In lectures like ecology, atmospheric science, flood science, and soil science, I gained plenty of fascinating knowledge and learned a lot about the intricate processes that govern this planet.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            That's why I decided to present this project. But there was a catch: the entire simulation was written in C—a very low-level programming language—and it wasn't exactly user-friendly for anyone else to try out. I wanted to make it accessible so nobody would need to download programs or install any programming languages just to see my simulation. The perfect solution, I realized, was to have it all on a website. Then I could just send people a link and voilà! The problem was, I hadn't written a single line of code since graduating (about two years ago), and I had never built a website before.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Still, the idea of sending a link as my "portfolio" felt so cool that I was determined to make it happen. It turned out that JavaScript was the most straightforward way to get my simulation running online. So I started translating a four-year-old C codebase into a new language I'd never used before, with no clue if it would take two days or three weeks.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            I quickly learned that my old code wasn't very solid; it was riddled with errors, and I had been lucky it ran at all. So I revised it bit by bit, fixing each function and mechanism. For about two weeks, my life revolved around my job as a bike courier and my code. I have no idea what your experience with programming is, so I'm not sure how much detail to go into. But let me say that diving deep into this project was, for the most part, a real joy. I'd get up early every day so I could spend as many hours as possible coding before my bike-shift, often forgetting the original reason behind all this as I got steadily closer to running the simulation on a website.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            This feeling—pouring my heart into a project, shaping it exactly the way I thought it should be, structuring it entirely from scratch—was completely new to me. While prepping the simulation for presentation, I also started designing the website. I wanted users to have a fun, interactive experience when visiting it. Over time, I got the idea to include a design-oriented CV and my cover letter on that same site, basically turning the website into my entire application.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            My project no longer revolved solely around the simulation; it also included the look and feel of the website and all its different elements. By now, I understand the entire site and the design concept behind it, including my CV and the simulation itself. But my first priority was to build the "shell" of the website. I figured I'd tackle the content part later.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            One important side note is that artificial intelligence was a huge help to me in this process! There's no way I could have built my first full website (with a working simulation) in such a short time without AI's assistance.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Because I was so immersed—often spending hours squashing tiny bugs—I nearly lost track of the deadline. Sure, I managed to get a decent-looking site up and running, but my CV, cover letter, and a proper description explaining how much effort went into this project were still missing. Although the final product looked somewhat presentable, I got anxious that it didn't truly show the energy, frustration, and love I poured into it.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            That's why I wanted to write this text: to capture the entire journey of getting the project to where it is today and to help explain why it ended up at this exact point.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            I would have loved to pour many more hours into improving the website and the simulation—unfortunately, I just didn't have the time. In the next section, I'll talk about the project's current status and everything I would have liked to include if I'd had the chance.
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
            What Could the Future Hold?
          </h3>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            I've already mentioned where the project currently stands, so now I'd like to share how I would have continued if I'd had more time—especially regarding the simulation. I also would have loved to invest more effort in the website's design, making the visit even more interactive and personal. This includes refining the layout, creating a more unified look, and adding more effects and links to guide people smoothly through the content.
          </p>
          
          <h4 style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            color: '#2a8a43',
            fontSize: '16px',
            paddingBottom: '3px',
            marginTop: '20px',
            textShadow: '1px 1px 0 rgba(255,255,255,1)'
          }}>
            Ideas for the Simulation
          </h4>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            The part I would have loved to spend much more time on is the visualization. Currently, it shows a pixelated green area, along with health bars and graphs. With sufficient explanation, it's understandable—but my goal was for someone to see the simulation and immediately grasp what's happening, without needing any extra explanation. That's why I envisioned a 3D animation, viewed from above, showing how the forest evolves over time.
          </p>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            I've done a few sketches to outline these ideas, and one possibility would be using Blender or Three.js. If the user could see deer and wolves moving around, it would be easier and more intuitive to see their roles in the ecosystem. Since learning new tools takes a lot of time and energy, I decided to pause here for now—but I still think a fully 3D world would make the simulation feel much more alive.
          </p>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            In a future, more scientific setting, it would also be possible to expand the ecosystem with additional species, or enrich existing populations with more functions, depending on the data needed. Generally, I would aim to simplify the interface and accessibility. I want people—on a playful level—to understand how important ecosystems are, and in this specific example, how vital wolves can be. The easier and clearer it is, the more quickly people can learn.
          </p>
          
          <div style={{
            backgroundColor: 'rgba(42, 138, 67, 0.05)',
            border: '1px solid rgba(42, 138, 67, 0.2)',
            borderRadius: '8px',
            padding: '15px',
            margin: '20px 0'
          }}>
            <h4 style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              color: '#2a8a43',
              fontSize: '16px',
              margin: '0 0 10px 0'
            }}>
              Future Enhancement Ideas
            </h4>
            
            <ul style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5',
              margin: '0',
              paddingLeft: '20px'
            }}>
              <li><strong>Enhanced Visualization:</strong> 3D representation with animated animals and growing trees</li>
              <li><strong>Additional Species:</strong> Include more animals like foxes, bears, and various bird species</li>
              <li><strong>Climate Factors:</strong> Add weather patterns and climate change scenarios</li>
              <li><strong>Human Interaction:</strong> Simulate human impacts like hunting, logging, and conservation</li>
              <li><strong>Expanded Terrain:</strong> Different habitats (mountains, wetlands, etc.) in the same ecosystem</li>
              <li><strong>Educational Scenarios:</strong> Preset scenarios showing different ecological concepts</li>
              <li><strong>Data Export:</strong> Allow researchers to download simulation data for analysis</li>
            </ul>
          </div>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            I've heard of projects that create games or simulations for decision-makers, giving them a low-risk, playful environment that can guide them toward more sustainable choices—ones that benefit both humans and nature rather than just boosting someone's wallet. I could definitely imagine dedicating my time to something like that, whether in a master's program or somewhere else in my future.
          </p>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            In fact, I can see myself working on different types of simulations. I've often wondered about simulating society and politics, then testing what kinds of protests or acts of resistance might be most constructive. Which forms of resistance would lead to a more positive outcome and which would actually strengthen certain negative trends, like the rise of extremism? I'm not sure how feasible that is, but it's the kind of next-level simulation that really excites me.
          </p>
          
          <h4 style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            color: '#2a8a43',
            fontSize: '16px',
            paddingBottom: '3px',
            marginTop: '20px',
            textShadow: '1px 1px 0 rgba(255,255,255,1)'
          }}>
            General Thoughts on the Website
          </h4>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            I'll definitely keep the website in some shape or form and might expand it in the future. I really like the concept of applying for things with a "combined" website that features my CV, portfolio, and cover letter all in one place. It lets me tie different points together and offer a cohesive application. Plus, all I have to do is share a link, and everything's right there.
          </p>
          
          <div style={{
            backgroundColor: 'rgba(42, 138, 67, 0.1)',
            border: '1px solid rgba(42, 138, 67, 0.3)',
            borderRadius: '8px',
            padding: '15px',
            margin: '20px 0 10px 0'
          }}>
            <p style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5',
              fontWeight: 'bold',
              color: '#2a8a43',
              margin: '0 0 10px 0',
              textAlign: 'center'
            }}>
              Final Reflection
            </p>
            
            <p style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5',
              margin: '0',
              fontStyle: 'italic'
            }}>
              This project has been a journey of discovery—not just about ecosystems and programming, but about my own creative process and how I approach problem-solving. While there's still so much I want to add and improve, I'm proud of what I've accomplished in the time I had. The blend of scientific knowledge, technical skills, and creative expression represented here feels like an authentic representation of who I am and what I hope to bring to a design program.
            </p>
          </div>
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