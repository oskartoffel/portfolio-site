// src/pages/CV.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClassicWindow from '../components/ui/ClassicWindow';
import ClassicXPButton from '../components/ui/ClassicXPButton';
import XPBackground from '../components/ui/XPBackground';
import { useTheme } from '../components/ui/ThemeProvider';

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
              <p style={{
                fontFamily: 'Tahoma, Arial, sans-serif',
                fontSize: '14px',
                color: '#4a5568',
                lineHeight: '1.4'
              }}>
                Designer and environmental engineer looking to combine technical knowledge with creative thinking to address complex challenges.
              </p>
            </div>
          </div>
          
          {/* Timeline content without years, only titles and content */}
          {/* Section 1 */}
          <div style={{
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
              <h2 style={{
                fontFamily: 'Tahoma, Arial, sans-serif',
                fontSize: '18px',
                color: '#7d336a',
                margin: 0
              }}>
                1. Youth: Embracing My Appearance
              </h2>
            </div>
            
            <div style={{
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#333'
            }}>
              <p>The first process that came to mind—where I used a creative approach—was thinking about my appearance. Part of this was out of necessity: as a child with braces, glasses, an eye patch, and fiery-red curly hair, I felt like standing out from other kids. For a long time, I hated feeling to be different and tried to blend in by wearing my hair very short or hiding under hats. Through my clothing choices, I tried to communicate, that I'm just the same as others. Somehow, in my teens, this started to shift. Step by step, I learned to accept those differences. For example, I began choosing glasses I actually liked, instead of ones I hoped nobody would notice. By highlighting certain "different" things about myself, I started gaining acceptance for who I was. This process of hiding or highlighting remains a fluid dynamic to this day.</p>
              
              <p>If I feel good in my body, I might wear a crop top, glittery jewelry, or dye my mustache to bring out my red hair. On days when I'm not feeling my best, I might pull on baggy clothes and a hoodie to avoid anyone noticing me—or my hair, which at times resembles a bird's nest. If I really want to show someone that a meeting or event is special to me, I'll plan a more thought-through outfit, groom myself carefully, and make sure my hair is on point.</p>
              
              <p>For me, the way I present myself is a form of communication for others It also helped me begin the process of accepting myself and who I am. When I was younger, I never wanted to "be different." Today, I'm actually somewhat grateful for it, because it taught me a lot about self-acceptance and might represent my very first creative designing approach.</p>
              
              <p>I do want to add one important note: this is just my personal experience of feeling different. I'm aware that many people face an entirely different level of pressure due to skin color, sexuality, gender, or other physical or mental traits. I don't want to trivialize anyone else's experiences, nor do I want to imply that being different is always good or empowering.</p>
            </div>
          </div>
          
          {/* Section 2 */}
          <div style={{
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
              <h2 style={{
                fontFamily: 'Tahoma, Arial, sans-serif',
                fontSize: '18px',
                color: '#7d336a',
                margin: 0
              }}>
                2. Discovering Ecstasy: The Joy of Nonconformity
              </h2>
            </div>
            
            <div style={{
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#333'
            }}>
              <p>At some point, I discovered "ecstasy" in a broader sense—spaces or moments that allow for more intense awareness of ourselves and each other. For me, "ecstasy" can refer to a wide range of states and experiences: exploring my sexuality, extreme nature outings in the mountains or wilderness, dancing, and drug use. These states are often very intense, bringing heightened feelings of love, joy, fear, sadness, or freedom. They're usually experienced alone, with a partner, or in small groups. Such moments require a lot of trust among those involved—trust initially based on following shared social norms.</p>
              
              <p>With the support of wonderful people, I began noticing how in these intense, ecstatic moments, certain social norms become irrelevant as long as everyone consents. By stepping away from norms like gender roles or power dynamics, a massive creative freedom emerged. It felt like I (or we) could actively "design" these experiences, shaping them however those involved wanted. Realizing you didn't have to be bound by typical social expectations in these moments was incredibly liberating.</p>
              
              <p>In the beginning, this newfound freedom applied mostly to those extreme experiences. Meanwhile, I was studying to become an environmental engineer—memorizing hundreds of flood barriers and dam types as fast as possible. We had to work hard, leaving little space to rethink ourselves or society on a deeper level. So, for a while, my discovery of these thinking processes and behaviors stayed confined to my ecstatic moments.</p>
              
              <p>As I neared the end of my bachelor's degree, though, some of my rigid worldviews started to wobble, and I began questioning my studies. But since I was so close to graduating, dropping out didn't seem like an option anymore. So I finished my bachelor's in winter 2023, determined to take a step back and gain some distance.</p>
            </div>
          </div>
          
          {/* Section 3 */}
          <div style={{
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
              <h2 style={{
                fontFamily: 'Tahoma, Arial, sans-serif',
                fontSize: '18px',
                color: '#7d336a',
                margin: 0
              }}>
                3. Reevaluating My Life: The Big Shift
              </h2>
            </div>
            
            <div style={{
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#333'
            }}>
              <p>That craving for distance took me back to Basel after four years in Lausanne. Beyond wanting space and time, I didn't have a concrete plan. My only commitment was my part-time job, which left me plenty of free hours. With so much time on my hands, I could now rethink and reflect, and what had once been limited to intense, ecstatic moments began to spread into my everyday life.</p>
              
              <p>Suddenly, everything was up for debate: my relationships, how I thought about love and happiness, my future plans, and my views on how power is distributed on this planet. I tried putting each element into the context of influences from my family, my environment, and society at large. I started asking how I wanted to live in the future, how I wanted to think about community, love, work, or even the idea of having a family. By not restricting myself to social norms, these questions opened up a huge creative freedom—where before, things had felt very binary and straightforward.</p>
              
              <p>During this time, I was lucky to explore many different jobs: teaching robotics to children, renovating and transforming an attic, or riding as a bicycle courier. I especially enjoyed working on the construction site; we were a small, supportive group, and I learned a lot about how a house is built.</p>
              
              <p>Along the way, I also met new people, and together we started to envision long-term lifestyles without nuclear families and suburban houses. Bit by bit, my old ideas about life, existence, and the world started to fade away, making space for fresh perspectives.</p>
              
              <p>It might sound lovely when described this way, but it wasn't always easy. When you start questioning everything, huge voids can appear. If you begin to dissect the value of everything, sometimes it feels like nothing matters. My bachelor's degree suddenly felt like nothing more than proof I could perform under pressure. I started noticing toxic masculine patterns in my older friendships and relationships—patterns that had always been there. My studies and my friendships, for better or worse, shaped my identity, so watching them unravel can be overwhelming.</p>
              
              <p>Sometimes, I caught myself daydreaming about how simple life might have been if I'd stayed in that old "bubble": living in a monogamous relationship with kids, in a quaint house, maybe working for an environmental startup that helps me greenwash my soul. But these thoughts are short-lived.</p>
              
              <p>On a personal level, things can indeed be more complicated or exhausting because of this creative freedom—especially when I think about how many times I've had to explain to my parents why I no longer want to continue my academic career. But in return, I feel that decisions are now much more tangible and meaningful, because it truly seems like they matter. I value this newfound empowerment over my own life a lot.</p>
              
              <p>From a societal perspective, I also believe it's important for individuals to examine the norms and power structures they've experienced, and to question their own role in capitalist, patriarchal, and imperialist mechanisms. Precisely because of this responsibility, I'd be thrilled to meet more people who are also eager to break away from norms and bring their own experiences, perspectives, and stories into the mix.</p>
            </div>
          </div>
          
          {/* Contact card */}
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