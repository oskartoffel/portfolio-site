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
  const [showSketch, setShowSketch] = useState(false);
  
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

  // Close sketch modal when clicking outside
  useEffect(() => {
    if (showSketch) {
      const handleClickOutside = (e) => {
        if (!e.target.closest('.sketch-image')) {
          setShowSketch(false);
        }
      };
      
      document.addEventListener('click', handleClickOutside);
      
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [showSketch]);

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
            When I first talked to people about my plans to apply for a design program, I quickly realized that I did not have a wide range of creative projects to share. Even though a collection of drawings from my school days, some additions I tinkered for my room, or "brand-busting" practice on Illustrator exist, all of these seemed too spontaneous and lacked a clear, presentable concept or process that I felt comfortable sharing with an audience.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            However, the perspective provided in the study's description of the term "design"—one that is not strictly bound to physical, object-oriented processes—gave me a new outlook on experiences I have had in my life. I reflected on certain times when design, in a broader sense, played a major role during several processes in my life. On three of these reflections I gave a deeper insight in the design related CV, because I felt I could be an interesting addition to the conventional CV in my application.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Still I wanted to share something physical and tangible that would give a distinct insight into my approach, which led me to a project I have had a take on a few years ago.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            In my bachelor program's 180 credits, 174 of those credits were tied to assignments with almost no creative freedom. However, the remaining six credits came from a course called <em>Information Technology for Environmental Engineers</em>, which at first glance sounds like any other course in my bachelor's curriculum. But in this course, the professor basically told us we needed to create any kind of simulation by the end of the semester. Aside from having to use either C or Python, there were no real restrictions. I decided to simulate an ecosystem, as they have always fascinated me through their complexity and the countless interaction between different species and their coexistence. Also this finely balance that has been naturally created over thousands of years to allow these systems to work has intrigued me. Especially the ways we as human interact with it. The way we profit from these systems and at the same completely deprive their basis.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Already back then, there was a big public debate in Switzerland about whether wolves should be shot down, mainly to protect herds of sheep and goats. So I wanted to illustrate the value of wolves can have in a forest ecosystem in a simple, accessible way through a simulation. So I chose a simulation that focused around the interactions between trees, deer and wolves.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            As I was cutting it close with my coding, I spent the last two weeks of the semester intensively working on it. Even though it was stressful, I truly enjoyed building a project from scratch and shaping it on my own terms. Whenever someone asked me what I did in my bachelor's program, I always mentioned this simulation first.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            It was important to me that my portfolio somehow connects back to my previous studies. In other points in my application, I often sound negative about my bachelor's degree, but I also learned a lot about topics that genuinely fascinate me—like ecology, atmospheric science, flood science, and soil science—and discovered how intricate the planet's processes can be.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Remembering how much I have enjoyed working on that project, I decided to develop further and share it in my portfolio. But there was a catch: the entire simulation was written in C, a very low-level programming language that isn't very user-friendly. I wanted to make it more accessible, so nobody would have to download special programs or install additional languages. The perfect solution, I realized, was to host it on a website. This enables me to simply send you a link and letting you explore the project without any hurdles.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            The fact that I hadn't written a single line of code since my graduation two years ago nor have I ever created a website felt quite challenging. Nevertheless the idea of using a link as my portfolio felt so right that I was motivated to make it happen. It turned out JavaScript was the most straightforward way to get the simulation online. So I started translating a four-year-old C codebase into a new language I'd never touched before and without knowing, whether it would take me two days or three weeks.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            I soon realized my old code wasn't very robust—it was full of errors, and I have been lucky it had worked at all. So I revised it step by step, fixing each function and mechanism. For about two weeks, my life revolved around the coding of this simulation and my bike courier job. Most of the time, I genuinely enjoyed it; I dove in deep and felt a strong drive to make this simulation run.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            That sense of motivation—pouring myself into a project nobody specifically asked for, shaping it according to my own ideas—was new to me. While preparing the simulation, I also started designing the website itself. I wanted visitors to have a fun, interactive experience. 
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            My project was no longer only about the simulation; it now involved the site's overall look and vibe, in addition to the the different elements in the simulation. At this point, I understand the website and the concept behind it as parts of my overall portfolio.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            It's also worth noting that artificial intelligence played an important role in helping me throughout this process. There is no way I could have built my first full website with a functioning simulation in a language that was initially new to me in such a short time without AI's assistance.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Because I got so immersed, I sometimes lost sight of what I was doing it all for, spending hours on tiny bugs that really weren't noticeable to an outside viewer. Not taking an early inventory of what still needed to be done or what was most essential meant the final push became quite stressful as the deadline approached.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            During this time, I also discovered the downsides of creative freedom. On the one hand, I've described how wonderful it can be to do things exactly the way you think they should be done. But on the other hand—precisely because I made all the decisions myself—everything feels very personal, since could not push it onto anyone else. That leaves you quite vulnerable. This vulnerability is felt especially strongly in moments of stress, when you start thinking about potential criticism or rejection.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Eventually, the simulation and the website were presentable enough while all the written elements were missing. That made me anxious—it was not obvious that someone visiting the website or checking out the simulation would understand the amount of joy, frustration, energy, and thought I'd put into this work.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            As a consequence I wanted to write this text: to emphasize the entire journey that led the project to where it is now and to explain how it reached this point. In the next sections, I'll talk about its current status and everything I would have loved to include if I'd had the time and resources.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            In summary, now that I'm almost finished with everything, I can say that the entire process—regardless of whether the application is successful—has been very enriching. One thing I've learned is how much I enjoy working on projects that allow for creative freedom, and I realized that no matter what my future looks like—educationally, professionally, or personally—I want to make sure I have space in my life that allows any kind projects with creative freedom.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Another key takeaway is how challenging the process can get. Especially toward the end, when time pressure kicked in, my insecurity and anxiety increased.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            On the one hand, it showed me just how valuable healthy time and capacity management can be; on the other hand, those stressful moments showed me—clearly and unfiltered—how crucial it is to maintain a supportive environment, so there are people who can be there for you when you need them.
          </p>
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Thanks to these experiences I gained during the process, I'm really glad I created this portfolio—regardless of whether things ultimately work out or not.
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
          
          <h4 style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            color: '#2a8a43',
            fontSize: '16px',
            paddingBottom: '3px',
            marginTop: '20px',
            textShadow: '1px 1px 0 rgba(255,255,255,1)'
          }}>
            Website & Its Components
          </h4>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            At this stage, my project takes the form of a single website that weaves together all parts of my application: a CV, a Cover Letter, and the Portfolio work. My goal is to offer an experience that feels personal, interactive, and straightforward to navigate, so visitors can get an authentic sense of who I am, what motivates me and what I could contribute to the masters program. If you run into any issues with any section, I suggest closing your browser, reopening it, and reloading the page. Unfortunately, for the moment the website isn't compiling properly via mobile and should therefore be visited from your desktop browser.
          </p>
      
          
          <h4 style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            color: '#2a8a43',
            fontSize: '16px',
            paddingBottom: '3px',
            marginTop: '20px',
            textShadow: '1px 1px 0 rgba(255,255,255,1)'
          }}>
            <Link to="/cover-letter" style={{ textDecoration: 'none', color: '#2a8a43' }}>
              Cover Letter [LINK]
            </Link>
          </h4>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            This text draws out the main themes from my overall portfolio: my personal journey, my enthusiasm and experiences for designing processes and the technical skills I've developed along the way. Although the Cover Letter can stand on its own, it feels more coherent placed here among the other elements that inspired and led to it.
          </p>
          
          <h4 style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            color: '#2a8a43',
            fontSize: '16px',
            paddingBottom: '3px',
            marginTop: '20px',
            textShadow: '1px 1px 0 rgba(255,255,255,1)'
          }}>
            <Link to="/ecosystem-simulation" style={{ textDecoration: 'none', color: '#2a8a43' }}>
              Portfolio ("Simulation" Branch) [LINK]
            </Link>
          </h4>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            The Portfolio section showcases the whole website project and breaks down the story in three steps:
          </p>
          
          <ol style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5',
            paddingLeft: '30px'
          }}>
            <li>What led me to do this?</li>
            <li>What does the project look like right now?</li>
            <li>What might be possible in the future?</li>
          </ol>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            By providing not just the website on its own, but also the motivations and emotions behind it, I want to give you a deeper sense of how this project took shape. The simulation itself aims to simplify the complex interplay between trees, deer, and wolves in a forest ecosystem—ideally, people exploring it will come away with fresh insights into how and why the different species interact play a and how human interference can impact woodland balance.
          </p>
          
          <h5 style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            color: '#2a8a43',
            fontSize: '15px',
            paddingBottom: '3px',
            marginTop: '20px',
            textShadow: '1px 1px 0 rgba(255,255,255,1)'
          }}>
            Underlying Mechanisms
          </h5>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            While the mechanisms on which the simulation is based are meant to represent reality, many real-world processes had to be simplified. For example, the simulation is limited to three different populations; trees, deer and wolves. The mobility of deer and wolves is neglected as it does not play a role in this particular version.
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
              <li>Growth & Aging: Each tree goes through a cycle of growing taller and heavier every year.</li>
              <li><strong>Reproduction:</strong> Once mature, a tree can spread seeds, because of concurrence success depends partly on forest density.</li>
              <li><strong>Mortality:</strong> Trees can die of old age, environmental stress factors or especially young saplings (which are more vulnerable) can get eaten by deer.</li>
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
              <li>Population Growth: Deer reproduce at a rate that depends on factors like food availability and herd density.</li>
              <li><strong>Foraging:</strong> Deer feed on young, edible saplings, which can stall the forest's regrowth. If the forest thins out, it becomes harder for deer to find food, leading to starvation.</li>
              <li><strong>Mortality & Migration:</strong> Deer can die of old age, starvation, or predation by wolves. Occasionally, new deer migrate into the forest, reflecting how real populations expand into suitable habitats.</li>
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
              <li>Predation: Wolves rely on deer as their food source, hunting in packs for higher success rates.</li>
              <li><strong>Reproduction & Mortality:</strong> Wolves also can die of old age, starve if deer numbers drop too low and may even migrate away if resources dwindle.</li>
              <li><strong>Trophic Impact:</strong> By preying on deer, they indirectly support tree growth (a classic top-down effect).</li>
            </ul>
            
            <p style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5',
              fontWeight: 'bold',
              color: '#2a8a43',
              margin: '12px 0 8px 0'
            }}>
              Inter-Species Dynamics:
            </p>
            <ul style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5',
              margin: '0',
              paddingLeft: '25px'
            }}>
              <li>Trees are the foundational producers, supplying nutrients for deer.</li>
              <li>Deer, in turn, can limit tree growth if their numbers explode.</li>
              <li>Wolves keep deer populations in check, allowing the forest to regenerate.</li>
              <li>Striking a balance among these three groups leads to a more stable ecosystem over time.</li>
            </ul>
          </div>
          
          <h5 style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            color: '#2a8a43',
            fontSize: '15px',
            paddingBottom: '3px',
            marginTop: '20px',
            textShadow: '1px 1px 0 rgba(255,255,255,1)'
          }}>
            Simulation Components
          </h5>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            While the mechanisms define what happens in the background, I also aimed to make the simulation intuitive, interactive and fun to use:
          </p>
          
          <ul style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5',
            paddingLeft: '25px'
          }}>
            <li><strong>Visual Grid:</strong> Represents forest density, with greener squares indicating heavier tree cover, on the contrary browner squares indicating sparse areas.</li>
            <li><strong>Health Bars/Population Bars:</strong> Show the current state of trees, deer, and wolves. If the bar is near its maximum, that species is at or beyond capacity.</li>
            <li><strong>Buttons:</strong> Let you alter the ecosystem—for example, you might choose to "Harvest Trees", "Plant Saplings", "Shoot Deer", or "Shoot Wolves". All of those decisions affect the ecosystem and may have big consequences in the long term.</li>
            <li><strong>Graphs & Stats:</strong> Offer a quick overview of how populations change over time—useful for spotting booms, crashes, or recoveries.</li>
            <li><strong>Code References:</strong> Specific interactions or the code in general can be found under the following link [GIT HUB LINK].</li>
          </ul>
          
          <h5 style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            color: '#2a8a43',
            fontSize: '15px',
            paddingBottom: '3px',
            marginTop: '20px',
            textShadow: '1px 1px 0 rgba(255,255,255,1)'
          }}>
            Anchoring in Real-World Ecology
          </h5>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Although the simulation is simplified, some fundamental mechanisms of the simulation can be found in established ecological concepts:
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
              <strong>Trophic Cascades:</strong> As discussed by Ripple and Beschta (2012)<sup>1</sup>, predators like wolves trigger broad ecosystem changes by controlling herbivores.
            </p>
            
            <p style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5',
              margin: '0 0 12px 0'
            }}>
              <strong>Carrying Capacity:</strong> Côté et al. (2004)<sup>2</sup> highlight how unmanaged deer can overpopulate, damaging forests.
            </p>
            
            <p style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5',
              margin: '0 0 12px 0'
            }}>
              <strong>Wolf Reintroduction:</strong> Studies from Yellowstone National Park (Fortin et al., 2005)<sup>3</sup> show how bringing back wolves altered elk patterns and fostered new plant growth.
            </p>
            
            <p style={{ 
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.5',
              margin: '0'
            }}>
              <strong>Forest Stand Dynamics:</strong> Oliver and Larson (1996)<sup>4</sup> describe how sapling establishment and stand competition shape forest regeneration cycles.
            </p>
          </div>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            In particular, Ripple and Beschta emphasize how higher-level predators reduce overgrazing by keeping herbivore populations in check, which aligns with this simulation's wolf-deer-tree balance. Côté et al. demonstrate that deer can quickly exceed an ecosystem's carrying capacity, mirroring the population crashes you might see if you remove all wolf predation here. Fortin et al. further illustrate how even subtle changes in predator numbers can reshape herbivore feeding patterns, while Oliver and Larson highlight the importance of seedling survival and stand competition, which is reflected in the young sapling stage of the simulation. By weaving in these findings, I hope to show how smaller-scale models can capture key feedback loops that shape real-world forests.
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
            After describing where the project currently stands, I would additionally like to share the potentials of further development regarding the simulation. In regard to the website I would have loved to refine the design and some of the mechanisms. This includes elevating the layout, creating a more unified look and adding more effects and links to guide visitors smoothly through the content.
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
            I plan to keep the website in some shape or form with the idea to potentially expand it in the future. The concept using website that features my CV, portfolio, and cover letter really appeals to me. It lets me tie different points together and offer a cohesive application.
          </p>
          
          <h4 style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            color: '#2a8a43',
            fontSize: '16px',
            paddingBottom: '3px',
            marginTop: '20px',
            textShadow: '1px 1px 0 rgba(255,255,255,1)'
          }}>
            Enhancing the Simulation
          </h4>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            The visualization is an aspect that I would have loved to spend much more time on. Currently it shows a pixelated green area along with health bars and graphs to illustrate the populations' current states. With an introduction and some instructions the simulation becomes understandable—but my goal was for visitors to see the simulation and immediately grasp what is happening. Especially with the depth of information on population dynamics, there is a potential to show more detailed visuals. One thing I considered was a 3D animation, viewed from above, showing how the forest evolves over time.
          </p>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5',
            position: 'relative',
            display: 'inline-block'
          }}>
            I've created a <span 
              onClick={() => setShowSketch(true)}
              style={{
                color: '#2a8a43',
                fontWeight: 'bold',
                cursor: 'pointer',
                textDecoration: 'underline',
                display: 'inline-block',
                position: 'relative'
              }}
            >
              sketch
              <span style={{
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
                top: '-1px'
              }}>
                ?
              </span>
            </span> outlining these further ideas, which I would have most probably developed with the help from softwares like Blender or Three.js. If users could see a 3D forest—possibly with deer and wolves moving around—it would be easier and more intuitive to understand their different roles in the ecosystem. However, since Blender and Three.js were completely new tools for me, the time investment to implement them would have been out of proportion.
          </p>
          
          {showSketch && (
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
              zIndex: 2000
            }}>
              <div className="sketch-image" style={{
                backgroundColor: 'white',
                padding: '10px',
                borderRadius: '5px',
                maxWidth: '80%',
                maxHeight: '80%',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '5px',
                  right: '10px',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  color: '#2a8a43'
                }} onClick={(e) => {
                  e.stopPropagation();
                  setShowSketch(false);
                }}>
                  ×
                </div>
                <img 
                  src="/sketch-image.jpg" 
                  alt="Sketch of enhanced simulation" 
                  style={{
                    maxWidth: '100%',
                    maxHeight: '70vh'
                  }}
                />
                <p style={{
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '12px',
                  textAlign: 'center',
                  marginTop: '10px',
                  color: '#666'
                }}>
                  My sketch for an enhanced 3D visualization of the forest ecosystem
                </p>
              </div>
            </div>
          )}
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Another way to incorporate real-life phenomena in an intuitive manner would have been to offer different starting conditions. Visitors could choose from preset scenarios like "pest invasion," "severe weather conditions," "climate shift," or "intense forestry."
          </p>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            And then after the simulation has finished, give the visitor a feedback on how they did. I thought about giving them a more detailed ethical, environmental and financial feedback based on the decisions they made.
          </p>
          
          <h4 style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            color: '#2a8a43',
            fontSize: '16px',
            paddingBottom: '3px',
            marginTop: '20px',
            textShadow: '1px 1px 0 rgba(255,255,255,1)'
          }}>
            Scientific Models
          </h4>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            In a more scientific setting that focuses on results and numbers rather than visualization, it would also be possible to expand the ecosystem with additional species or enrich existing populations with further functions, depending on the data needed.
          </p>
          
          <h4 style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            color: '#2a8a43',
            fontSize: '16px',
            paddingBottom: '3px',
            marginTop: '20px',
            textShadow: '1px 1px 0 rgba(255,255,255,1)'
          }}>
            Games for Decision Makers
          </h4>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            I have heard of projects that create games or simulations for decision-makers, giving them a low-risk, playful environment to guide them toward choices, that benefit humans and nature rather than their own privileges and financial interests. The development and use of accessible games to highlight global issues and subtly propose more sustainable and ethical choices are very interesting to me.
          </p>
          
          <h4 style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            color: '#2a8a43',
            fontSize: '16px',
            paddingBottom: '3px',
            marginTop: '20px',
            textShadow: '1px 1px 0 rgba(255,255,255,1)'
          }}>
            Other Simulations
          </h4>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Working on this portfolio led to further thoughts about potential simulations. For example, I have often imagined a simulation including different aspects of society and politics and testing which forms of protest or resistance could be most effective in driving specific social or political change. This would enable to grasp an idea of developments and effects of different forms of protests. I am really curious about the feasibility of such a simulation.
          </p>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            In general, all forms of sociological dynamics seem very tempting to model. To model does not necessarily imply to calculate and predict different potential scenarios, but also illustrate social phenomena in a playful, interactive and intuitive way.
          </p>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Another idea came up recently during my civil service in Wallis, where I am working on a biotope care program. Because this weeks site is so difficult to access, a helicopter had to transport all of our heavy gear. My group discussed whether the helicopter's carbon emissions are justified by the biodiversity benefits of caring for this remote biotope. Of course, it is not only an ecological but also an ethical question. Maybe a simulation could offer interesting insights by weighing factors like habitat improvement, species protection, and carbon costs.
          </p>
          
          <h4 style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            color: '#2a8a43',
            fontSize: '16px',
            paddingBottom: '3px',
            marginTop: '20px',
            textShadow: '1px 1px 0 rgba(255,255,255,1)'
          }}>
            Conclusion
          </h4>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5',
            fontStyle: 'italic'
          }}>
            Yes, I really enjoyed the work and the process of this project. And as described here, I could very well imagine continuing to work on this or similar projects.
          </p>
          
          <p style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.5',
            fontStyle: 'italic',
            marginTop: '10px'
          }}>
            But I could also imagine working on all kinds of other projects in the future, be they of a conceptual, artisanal, digital or some hybrid nature.
          </p>
        </>
      )
    }
  ];

  return (
    <XPBackground>
      <ClassicWindow title="Behind My Works">
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
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