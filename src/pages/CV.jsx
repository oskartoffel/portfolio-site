// src/pages/CV.jsx - With complete text content
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClassicWindow from '../components/ui/ClassicWindow';
import ClassicXPButton from '../components/ui/ClassicXPButton';
import XPBackground from '../components/ui/XPBackground';
import { useTheme } from '../components/ui/ThemeProvider';

// Timeline data with full text content
const timelinePeriods = [
  {
    years: '2009-present',
    title: '1. Youth: Embracing My Appearance',
    content: `The very first process in which I tried expressing myself creatively was by adapting my appearance. Part of this was born out of necessity: as a child wearing braces, glasses, an eye patch, and fiery-red curly hair, I stood out from other kids—and I felt that keenly. For a long time, I hated feeling different and tried to blend into the crowd by keeping my hair very short or hiding under hats. Eventually, though, that started to shift. Little by little, I learned to accept those differences.

That process continues to this day, as I gradually shape my outward self in ways that make me feel comfortable—without worrying if others find it strange. These days, adjusting my appearance is a form of communication that shows people something about who I am. If I feel good in my body, I might wear a crop top, glittery jewelry, or dye my mustache to highlight my red hair. On days when I'm not feeling my best, I might pull on big baggy clothes and a hoodie to avoid having anyone notice me—or my hair, which sometimes looks more like a bird's nest than a hairstyle. And if I really want to show someone that a meeting or event is special to me, I'll plan a more eye-catching outfit, groom myself carefully, and make sure my hair is on point.

Back when I was younger, this "being different" really hurt. Today, I'm actually a bit grateful for it, because it taught me a lot about self-acceptance. Who knows—maybe it was even a key factor in developing my creative outlook on life.

I do want to add one important note here: this is just my personal experience of feeling different. I'm aware that there are people who face an entirely different level of pressure due to their skin color, sexuality, gender, or other physical or mental traits. I don't want to trivialize anyone else's experiences, nor do I want to imply that being different is always a good or empowering thing.`
  },
  {
    years: '2015-present',
    title: '2. Discovering Ecstasy: The Joy of Nonconformity',
    content: `At some point along the way, I discovered "ecstasy" (in the broader sense)—the idea of spaces or moments that allow for more intense awareness of ourselves and one another. For me, the word "party" can mean many different states of mind and forms of experience: from exploring my sexuality, to extreme nature outings in the mountains or wilderness, to dancing and drug use. These states are often very intense and usually experienced alone, with a partner, or in small groups. They require a lot of trust among the people involved—trust that often comes, at first, from abiding by shared social norms.

With the support of some wonderful people, I began noticing how in these extreme, ecstatic moments, certain social norms can become irrelevant as long as everyone involved consents. By stepping away from norms like gender roles or power dynamics in those moments, a huge creative freedom emerged. It felt like I could actively "design" these experiences, shaping them however I wanted. Realizing that I didn't have to be restricted by typical social expectations in such moments was incredibly liberating.

In the beginning, this newfound freedom mostly applied to those intense experiences. At the same time, I was busy training to become an environmental engineer, trying to memorize two hundred different types of flood barriers and dams as fast as possible. That didn't leave me a lot of room to question myself or society on a deeper level. The overall attitude in my program was, "We have the technology and scientific know-how to save the world," and I noticed both professors and fellow students often shared this idea.

As I neared the end of my bachelor's degree, dropping out no longer seemed like an option. I finished my bachelor's in winter 2023, determined to step back and gain some distance.`
  },
  {
    years: '2023-present',
    title: '3. Reevaluating My Life: The Big Shift',
    content: `That craving for distance brought me back to Basel after four years in Lausanne. Beyond wanting some space and time, I didn't have a concrete plan. My only commitment was my part-time work, which left me a lot of free hours. With so much open time on my hands, I started questioning many of the norms I had followed. What had once seemed limited to those intense, ecstatic moments now spread into my everyday life.

Suddenly, all sorts of things were up for debate: my relationships, my past decisions, and the values I'd absorbed from my family, my environment, and society in general. I began asking myself how I wanted to live in the future, how I wanted to think about community, love, work, or even the possibility of having a family. With such open space, I felt a huge sense of freedom.

I worked a lot of random but fascinating jobs—teaching robotics to children, renovating and transforming an attic, riding as a bicycle courier—and met many new people whose perspectives challenged me. Some had no interest in traditional nuclear families or suburban homes, while others lived in ways I'd never encountered before. Little by little, I realized I could shape my world in entirely new ways. I even sorted through and redecorated my entire bedroom, tossing out old belongings so there was space to let new ideas in.

It sounds lovely when I put it that way, but it wasn't always easy. When you start questioning everything, you can find yourself falling into some big emotional voids. If you're able to pick apart the value of everything, it can start to feel like nothing matters. My bachelor's degree suddenly felt like nothing more than a piece of paper saying I can perform well under pressure. I began to see toxic masculine patterns in my older friendships and relationships, patterns that had been there all along. These things, for better or for worse, had shaped my identity. Watching them unravel all at once can be overwhelming.

Sometimes I catch myself daydreaming about how simple life might have been if I'd stayed in that old "bubble"—married with kids, living in a quaint house, maybe working for some greenwashing environmental startup. But that thought never lasts long, because in truth I don't want to go back to that world. I'd much rather connect with people who are also ready to push against societal norms, who want to discuss and model new futures, and who are open to designing our world in fresh, unburdened ways. I have a strong feeling that studying design could be just that sort of space—one where we can take advantage of a wide creative freedom (even if it's partly theoretical) and learn how to use it in meaningful ways.`
  }
];



const CV = () => {
  const { setTheme } = useTheme();
  
  // Set theme to cv when component mounts
  useEffect(() => {
    setTheme('cv');
  }, [setTheme]);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/documents/cv-oskar-wasmer.pdf';
    link.setAttribute('download', 'cv-oskar-wasmer.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <XPBackground>
      <ClassicWindow title="My Design Journey" width="80%" height="95%">
        <div style={{ 
          padding: '20px', 
          width: '100%',
          maxWidth: '950px',
          margin: '0 auto'
        }}>
          {/* Header with photo placeholder */}
          <div style={{ 
            marginBottom: '30px', 
            background: 'linear-gradient(to bottom, #d8c1dd, #f8f0fc)',
            border: '2px solid #9f7aea',
            borderRadius: '8px',
            padding: '15px 20px', 
            boxShadow: '3px 3px 6px rgba(0,0,0,0.2)',
            display: 'flex',
            maxWidth: '850px',
            gap: '20px',
            margin: '40px auto'
          }}>
            {/* Photo placeholder with Y2K style frame */}
            <div style={{
              width: '120px',
              height: '150px',
              flexShrink: 0,
              background: 'white',
              border: '3px ridge #9f7aea',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: '#7d336a',
              textAlign: 'center',
              boxShadow: '2px 2px 5px rgba(0,0,0,0.15)'
            }}>
              Your Photo<br/>Here
            </div>
            
            <div>
              <h1 style={{ 
                fontFamily: 'Popstar Pop, Tahoma, Arial, sans-serif',
                color: '#7d336a',
                fontSize: '28px',
                marginBottom: '15px',
                textShadow: '1px 1px 2px rgba(255,255,255,0.8)'
              }}>
                Oskar Wasmer
              </h1>
            </div>
          </div>
          
          {/* Timeline content */}
          {timelinePeriods.map((period, index) => (
            <div key={index} style={{
              marginBottom: '40px',
              background: '#f8f0fc',
              border: '1px solid #9f7aea',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '2px 2px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '15px',
                borderBottom: '1px solid #d8c1dd',
                paddingBottom: '10px'
              }}>
                <div style={{
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  color: '#7d336a',
                  backgroundColor: 'rgba(157, 50, 172, 0.1)',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  border: '1px solid #9f7aea',
                  minWidth: '100px',
                  textAlign: 'center'
                }}>
                  {period.years}
                </div>
                
                <h2 style={{
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '18px',
                  color: '#7d336a',
                  margin: 0
                }}>
                  {period.title}
                </h2>
              </div>
              
              <div style={{
                fontFamily: 'Tahoma, Arial, sans-serif',
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#333'
              }}>
                {period.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} style={{ marginBottom: '15px' }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
          
          {/* Skills section */}
          <div style={{ 
            marginTop: '30px', 
            background: 'linear-gradient(to bottom, #d8c1dd, #f8f0fc)',
            border: '2px solid #9f7aea',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '3px 3px 6px rgba(0,0,0,0.2)',
            maxWidth: '690px',
            margin: '30px auto 0'
          }}>
            {/* Decorative line instead of title */}
            <div style={{
              height: '2px',
              background: '#7d336a',
              width: '100%',
              maxWidth: '200px',
              margin: '0 auto 20px',
              borderRadius: '1px'
            }}></div>
            
            {/* Contact card */}
            <div style={{
              width: '250px',
              margin: '20px auto',
              backgroundColor: 'white',
              border: '1px solid #9f7aea',
              borderRadius: '8px',
              padding: '15px',
              textAlign: 'center',
              boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.2)'
            }}>
              <h2 style={{
                fontFamily: 'Popstar Pop, Tahoma, Arial, sans-serif',
                color: '#7d336a',
                fontSize: '16px',
                marginBottom: '10px'
              }}>
                Contact
              </h2>
              <p style={{
                margin: '0',
                fontFamily: 'Tahoma, Arial, sans-serif',
                fontSize: '13px',
                color: '#4a5568',
                lineHeight: '1.6'
              }}>
                Email: oskar.wasmer@gmail.com<br />
                Phone: (+41) 78 629 37 83<br />
                Address: Neuhausstrasse 12, 4057 Basel
              </p>
            </div>
          </div>
          
          {/* Bottom buttons */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '20px',
            marginTop: '25px',
            borderTop: '1px solid #d8c1dd',
            paddingTop: '15px'
          }}>
            <Link to="/">
              <ClassicXPButton>
                Back to Home
              </ClassicXPButton>
            </Link>
            
            <ClassicXPButton onClick={handleDownloadCV}>
              Download CV (PDF)
            </ClassicXPButton>
          </div>
        </div>
      </ClassicWindow>
    </XPBackground>
  );
};

export default CV;