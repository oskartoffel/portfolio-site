// src/pages/CoverLetter.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClassicWindow from '../components/ui/ClassicWindow';
import ClassicXPButton from '../components/ui/ClassicXPButton';
import XPBackground from '../components/ui/XPBackground';
import { useTheme } from '../components/ui/ThemeProvider';

const CoverLetter = () => {
  const { setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState(0);
  
  // Set theme to coverletter when component mounts
  useEffect(() => {
    setTheme('coverletter');
  }, [setTheme]);

  // Cover letter sections from the brainstorming document
  const sections = [
    {
      title: "Facing My Fear and Nervousness",
      content: `Right now, I'm one day away from starting my civil service, which leaves me only five days (or more accurately, five evenings after physically tiring workdays) to finalize a portfolio I've poured every bit of energy into over the last three weeks—juggling a physically demanding job and navigating personal crises along the way. I've never thrown myself so completely into a project that I could shape entirely on my own terms.
      
      That freedom is both exhilarating and terrifying. On one hand, no one's telling me what to do or how to do it—which is wonderful. On the other hand, if it fails or if people think it's terrible, I can't just say, "Well, someone else told me to do it this way." I'm fully responsible for every aspect of this portfolio. If it's well-received, I can proudly say I made it all by myself. But if people criticize it, I can't push that onto anyone else. It's all me, and that vulnerability feels huge.`
    },
    {
      title: "The Beauty (and Challenge) of Freedom",
      content: `During these past few weeks, I've felt so alive. I've been rolling out of bed at seven in the morning just to spend an hour or two at my desk coding before my bike courier shift, often determined to fix one specific bug that might've haunted me for days. When a new feature actually works the first time around, or when I finally track down some elusive error, the sense of accomplishment is incredible—it makes every frustration worthwhile.
      
      Having the freedom to decide how this project should look and what direction it should take has given me a drive I barely recognize in myself. Coming from an environmental engineering background where I was constantly told exactly what to study or memorize, this feels like a breath of fresh air. In that world, success often amounted to being able to learn and regurgitate information under pressure, earning a piece of paper that says, "Yes, you can perform well in difficult conditions." But rarely was I ever encouraged to say, "I want to explore this topic because it fascinates me."
      
      I also grew up in an environment that valued a straight-and-narrow academic path, with the goal of a secure job, a stable income, and eventually a house for a future family. Creativity was never exactly discouraged, but it wasn't actively rewarded or even acknowledged. As a result, it often felt like there was no space for it—yet, I know now that wasn't entirely true. My life outside school and university has always contained sparks of creativity; it's just that I never called it "design" or even recognized it as such until recently.`
    },
    {
      title: "Realizing \"Design\" Is Bigger Than Objects",
      content: `One moment that truly changed my perspective was discovering that design can mean so much more than just creating physical objects. Once I let that idea sink in, I realized I've been "designing" things my entire life—whether it was my appearance, the ways I connect with people, or my approach to moments of intense emotion. That insight gave me permission to see myself as someone who's been working creatively all along, even if I never dared to use that label before.
      
      If you've looked at my design-oriented CV (where I talk about clothing, experiences of ecstasy, and reevaluating my life), you'll know I've explored these processes in a deeply personal way. They weren't necessarily meant to produce something tangible for others; they were about self-expression and the freedom to break down and reimagine the world around me. Through my portfolio project, though, I've learned that creating something physical—or at least visible to the outside world—also brings its own kind of joy and fulfillment.`
    },
    {
      title: "What I Learned from Building My Portfolio",
      content: `In working on this portfolio, I discovered I genuinely love shaping a project from the ground up. I felt an incredible sense of motivation and excitement each day. Whether or not I start studying with you in September, I'm grateful for how this whole process pushed me to explore and articulate my own creative impulses.
      
      With my portfolio—including the online simulation, my personal texts, and my design-oriented CV—I wanted to show how I can weave together complex themes into something (hopefully) accessible and meaningful for others to experience. My hope is that anyone who interacts with it will get a sense of who I am, what drives me, and how I think.`
    },
    {
      title: "My Understanding of \"Design\" (So Far)",
      content: `To me, designing something means capturing a state, situation, or process. By describing and visualizing it—whether for myself or for other people—I can help make it clearer, easier to grasp, and more engaging. At the same time, design allows me to reflect on the tangle of inner conflicts, contradictions, and insecurities floating around in my head.
      
      I also see it as a way to encourage others to think differently about issues like capitalism, imperialism, or patriarchy—tackling them in more open, human-centered ways. I'm hoping this program will offer a space where people want to challenge norms, combine perspectives in new ways, and support each other in learning how to shape the future more thoughtfully.`
    },
    {
      title: "Why I'm Reaching Out",
      content: `Overall, this entire portfolio is my attempt to convey why I'm passionate about studying design—and why I think I'd be a good addition to the program. I believe my unique background, my willingness to question old patterns, and my desire to understand the world can truly enrich any environment that values creativity and critical thinking.
      
      Yet I also see how I would benefit from being around other curious people who want to look beyond standard ways of thinking and doing. Ultimately, if, after reading this letter and exploring my portfolio, you feel like we could both gain from working together, I'd be thrilled to meet you and talk about what the future might hold.`
    }
  ];

  return (
    <XPBackground>
      <ClassicWindow title="My Cover Letter">
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ 
            textAlign: 'center', 
            fontFamily: 'Popstar, Tahoma, Arial, sans-serif',
            color: '#aa4215',
            fontSize: '24px',
            marginBottom: '20px'
          }}>
            Cover Letter Thoughts
          </h1>
          
          {/* Section navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '5px',
            marginBottom: '25px',
            flexWrap: 'wrap'
          }}>
            {sections.map((section, index) => (
              <button 
                key={index}
                onClick={() => setActiveSection(index)}
                style={{
                  backgroundColor: activeSection === index ? '#aa4215' : '#ece9d8',
                  color: activeSection === index ? 'white' : '#333',
                  border: '1px solid',
                  borderColor: activeSection === index ? '#992a0a' : '#999',
                  borderRadius: '4px',
                  padding: '5px 10px',
                  fontSize: '12px',
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  cursor: 'pointer',
                  boxShadow: activeSection === index ? 
                    'inset 0 1px 0 rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.2)' : 
                    '0 1px 2px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease'
                }}
              >
                {index + 1}. {section.title.length > 20 ? section.title.substring(0, 20) + '...' : section.title}
              </button>
            ))}
          </div>
          
          {/* Section content */}
          <div style={{ 
            backgroundColor: '#fff5f1',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            border: '1px solid #f27d0c',
            marginBottom: '30px',
            position: 'relative',
            minHeight: '300px'
          }}>
            <h2 style={{
              color: '#aa4215',
              fontSize: '20px',
              fontFamily: 'Tahoma, Arial, sans-serif',
              marginBottom: '15px',
              paddingBottom: '5px',
              borderBottom: '1px solid #f8c4a9'
            }}>
              {activeSection + 1}. {sections[activeSection].title}
            </h2>
            
            {/* Renders paragraphs with proper spacing */}
            <div style={{
              fontFamily: 'Tahoma, Arial, sans-serif',
              lineHeight: '1.6',
              color: '#333',
              fontSize: '14px'
            }}>
              {sections[activeSection].content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} style={{ marginBottom: '15px' }}>
                  {paragraph.trim()}
                </p>
              ))}
            </div>
            
            {/* Navigation arrows */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '25px'
            }}>
              <button 
                onClick={() => setActiveSection(prev => Math.max(0, prev - 1))}
                disabled={activeSection === 0}
                style={{
                  backgroundColor: activeSection === 0 ? '#eee' : '#f27d0c',
                  color: activeSection === 0 ? '#999' : 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: activeSection === 0 ? 'default' : 'pointer',
                  fontSize: '20px',
                  boxShadow: activeSection === 0 ? 'none' : '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                ←
              </button>
              
              <button 
                onClick={() => setActiveSection(prev => Math.min(sections.length - 1, prev + 1))}
                disabled={activeSection === sections.length - 1}
                style={{
                  backgroundColor: activeSection === sections.length - 1 ? '#eee' : '#f27d0c',
                  color: activeSection === sections.length - 1 ? '#999' : 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: activeSection === sections.length - 1 ? 'default' : 'pointer',
                  fontSize: '20px',
                  boxShadow: activeSection === sections.length - 1 ? 'none' : '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                →
              </button>
            </div>
          </div>
          
          {/* Bottom note */}
          <div style={{
            backgroundColor: 'rgba(170, 66, 21, 0.1)',
            padding: '15px',
            borderRadius: '5px',
            marginBottom: '25px',
            fontSize: '13px',
            fontFamily: 'Tahoma, Arial, sans-serif',
            lineHeight: '1.5',
            color: '#333',
            border: '1px solid rgba(170, 66, 21, 0.2)'
          }}>
            <strong>Note:</strong> This is a working draft featuring key themes and ideas I'm exploring for my cover letter. The final version will be more polished and cohesive, bringing these thoughts together into a single narrative.
          </div>
          
          {/* Action buttons */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '20px',
            marginTop: '25px'
          }}>
            <Link to="/">
              <ClassicXPButton>
                Back to Home
              </ClassicXPButton>
            </Link>
            
            <ClassicXPButton onClick={() => {
              // Create a link to download the PDF
              const link = document.createElement('a');
              link.href = '/documents/cover-letter-oskar-wasmer.pdf';
              link.setAttribute('download', 'cover-letter-oskar-wasmer.pdf');
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}>
              Download Cover Letter (PDF)
            </ClassicXPButton>
          </div>
        </div>
      </ClassicWindow>
    </XPBackground>
  );
};

export default CoverLetter;