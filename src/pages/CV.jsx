// src/pages/CV.jsx - Fixed timeline styling and reverted to original header bars
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClassicWindow from '../components/ui/ClassicWindow';
import ClassicXPButton from '../components/ui/ClassicXPButton';
import XPBackground from '../components/ui/XPBackground';
import { useTheme } from '../components/ui/ThemeProvider';

// Timeline data for each period
const timelinePeriods = [
  {
    years: '1998-2014',
    title: 'Early Life',
    items: [
      'Born in Basel',
      'Primary School in Basel',
      'Secondary School with focus on sciences',
      'First introduction to computers and technology'
    ]
  },
  {
    years: '2014-2018',
    title: 'Highschool & First Work',
    items: [
      'Technical Assistance at UKBB (Children\'s Hospital IT Support)',
      'Gymnasium Kirschgarten',
      'Matura with focus on Mathematics and Physics',
      'Participation in science competitions and projects'
    ]
  },
  {
    years: '2018-2019',
    title: 'Civil Service & Travel',
    items: [
      'Civil Service at Weizenkorn (support work with people with disabilities)',
      'Traveling through several European countries',
      'Volunteered on organic farms',
      'Personal growth and exploration period'
    ]
  },
  {
    years: '2020-2023',
    title: 'University Studies',
    items: [
      'Bachelor in Environmental Engineering Sciences at ETH Lausanne',
      'Civil Service at Oekoskop (environmental protection work)',
      'Research project on forest ecosystem simulation',
      'Developed skills in Python, R, and environmental modeling'
    ]
  },
  {
    years: '2023-2025',
    title: 'Professional Development',
    items: [
      'Robotics Course Instructor for primary school students',
      'Logistics Staff at Intersport',
      'Construction Work experience',
      'Preparing for Masters program application'
    ]
  }
];

const CV = () => {
  const { setTheme } = useTheme();
  
  // Set theme to cv when component mounts
  useEffect(() => {
    setTheme('cv');
  }, [setTheme]);

  return (
    <XPBackground>
      <ClassicWindow title="My CV" width="95%" height="95%">
        <div style={{ 
          padding: '20px', 
          width: '100%',
          maxWidth: '1100px', // More compact width
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
            gap: '20px'
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
                fontFamily: 'Tahoma, Arial, sans-serif',
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
                lineHeight: '1.6',
                maxWidth: '600px'
              }}>
                Als ruhiger, aufgeschlossener Mensch schätze ich die Begegnungen mit
                anderen und die Möglichkeit, im Austausch neue Blickwinkel zu entdecken.
                Dabei suche ich meinen Weg in dieser Gesellschaft und möchte so
                aufmerksam und respektvoll wie möglich mit Umwelt und Mitmenschen
                umgehen.
              </p>
            </div>
          </div>
          
          {/* My Journey Header */}
          <h2 style={{ 
            fontFamily: 'Bubblicious, Tahoma, Arial, sans-serif',
            color: '#7d336a',
            fontSize: '28px',
            textAlign: 'center',
            textShadow: '2px 2px 0 #fff',
            marginBottom: '20px',
          }}>
            My Journey
          </h2>
          
          {/* Timeline container */}
          <div style={{ 
            display: 'flex',
            width: '100%',
            position: 'relative',
            border: '2px solid #e9d8f4',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
            minHeight: '800px'
          }}>
            {/* Left sidebar with years - extends full height */}
            <div style={{ 
              width: '140px', // Increased width
              minWidth: '140px', // Increased width 
              background: 'linear-gradient(to right, #e9d8f4, #f8f0fc)',
              borderRight: 'none',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}>
              {/* Single vertical purple timeline line */}
              <div style={{
                position: 'absolute',
                top: '0',
                bottom: '0',
                right: '0px', // Moved away from the content
                width: '2px',
                background: '#7d336a',
                zIndex: 1
              }}></div>
              
              {/* Year labels - distributed evenly */}
              {timelinePeriods.map((period, index) => (
                <div 
                  key={index} 
                  style={{ 
                    position: 'relative',
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: index < timelinePeriods.length - 1 ? '1px solid #d8c1dd' : 'none',
                    padding: '20px 0'
                  }}
                >
                  {/* Year labels with Y2K styling */}
                  <div style={{
                    fontFamily: 'Tahoma, Arial, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    color: '#7d336a',
                    textShadow: '1px 1px 0 #fff',
                    padding: '10px 5px',
                    textAlign: 'center',
                    zIndex: 2
                  }}>
                    {period.years}
                  </div>
                  
                  {/* Mac OS inspired 3D glossy button */}
                  <div style={{
                    position: 'absolute',
                    right: '-8px', // Aligned with the timeline line
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 35%, #d094ed, #7d336a)', // Glossy effect
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 0 3px rgba(0, 0, 0, 0.3), inset 0 0 2px rgba(255, 255, 255, 0.8)',
                    zIndex: 3
                  }}></div>
                </div>
              ))}
            </div>
            
            {/* Right content area */}
            <div style={{ 
              flex: '1',
              backgroundColor: 'rgba(248, 240, 252, 0.2)',
              padding: '20px 20px 20px 30px', // Added more left padding
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '10px' // Added margin to separate from the years column
            }}>
              {/* Display one box per time period */}
              {timelinePeriods.map((period, index) => (
                <div 
                  key={index}
                  style={{
                    flex: 1,
                    marginBottom: index < timelinePeriods.length - 1 ? '20px' : '0',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Content box */}
                  <div style={{
                    background: 'white',
                    borderRadius: '8px',
                    border: '1px solid #9f7aea',
                    overflow: 'hidden',
                    boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
                    margin: '10px 0',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    {/* Original header bar style (vertical gradient) */}
                    <div style={{
                      padding: '8px 12px',
                      background: 'linear-gradient(to bottom, #9f7aea, #7d336a)', // Vertical gradient
                      color: 'white',
                      fontFamily: 'Tahoma, Arial, sans-serif',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                      textShadow: '1px 1px 1px rgba(0, 0, 0, 0.4)',
                      borderRadius: '6px 6px 0 0' // Rounded top corners
                    }}>
                      {period.title}
                    </div>

                    {/* Bulleted list */}
                    <div style={{ 
                      padding: '15px',
                      flex: '1'
                    }}>
                      <ul style={{
                        margin: '0',
                        paddingLeft: '20px',
                        color: '#4a5568',
                        fontFamily: 'Tahoma, Arial, sans-serif',
                        fontSize: '14px',
                        lineHeight: '1.6'
                      }}>
                        {period.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Skills section with same header style as timeline items */}
          <div style={{ marginTop: '30px', maxWidth: '1000px', margin: '30px auto 0' }}>
            {/* Header with original style */}
            <div style={{ 
              padding: '8px 15px',
              background: 'linear-gradient(to bottom, #9f7aea, #7d336a)', // Vertical gradient
              color: 'white',
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontWeight: 'bold',
              fontSize: '16px',
              borderRadius: '8px',
              textAlign: 'center',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 2px 2px 5px rgba(0,0,0,0.15)',
              textShadow: '1px 1px 1px rgba(0, 0, 0, 0.4)',
              marginBottom: '15px'
            }}>
              Skills & Competencies
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
              gap: '15px',
              marginBottom: '20px'
            }}>
              {/* Personal */}
              <div style={{ 
                backgroundColor: 'white',
                border: '1px solid #9f7aea',
                borderRadius: '8px',
                padding: '0',
                boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}>
                {/* Header with original style */}
                <div style={{ 
                  padding: '5px 10px',
                  background: 'linear-gradient(to bottom, #9f7aea, #7d336a)', // Vertical gradient
                  color: 'white',
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  textAlign: 'center',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
                  textShadow: '1px 1px 1px rgba(0,0,0,0.4)',
                  borderRadius: '6px 6px 0 0'
                }}>
                  Personal
                </div>
                <ul style={{ 
                  margin: '8px 0',
                  paddingLeft: '25px',
                  paddingRight: '10px',
                  color: '#4a5568',
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '13px',
                  lineHeight: '1.4'
                }}>
                  <li>Teamfähig</li>
                  <li>Lernfreudig</li>
                  <li>Kommunikativ</li>
                </ul>
              </div>
              
              {/* Technical Skills */}
              <div style={{ 
                backgroundColor: 'white',
                border: '1px solid #9f7aea',
                borderRadius: '8px',
                padding: '0',
                boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  padding: '5px 10px',
                  background: 'linear-gradient(to bottom, #9f7aea, #7d336a)', // Vertical gradient
                  color: 'white',
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  textAlign: 'center',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
                  textShadow: '1px 1px 1px rgba(0,0,0,0.4)',
                  borderRadius: '6px 6px 0 0'
                }}>
                  Technical Skills
                </div>
                <ul style={{ 
                  margin: '8px 0',
                  paddingLeft: '25px',
                  paddingRight: '10px',
                  color: '#4a5568',
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '13px',
                  lineHeight: '1.4'
                }}>
                  <li>Python, R-Studio, SQL</li>
                  <li>Matlab and C</li>
                  <li>QGIS and Excel</li>
                  <li>Data visualization</li>
                </ul>
              </div>
              
              {/* Professional Strengths */}
              <div style={{ 
                backgroundColor: 'white',
                border: '1px solid #9f7aea',
                borderRadius: '8px',
                padding: '0',
                boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  padding: '5px 10px',
                  background: 'linear-gradient(to bottom, #9f7aea, #7d336a)', // Vertical gradient
                  color: 'white',
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  textAlign: 'center',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
                  textShadow: '1px 1px 1px rgba(0,0,0,0.4)',
                  borderRadius: '6px 6px 0 0'
                }}>
                  Professional Strengths
                </div>
                <ul style={{ 
                  margin: '8px 0',
                  paddingLeft: '25px',
                  paddingRight: '10px',
                  color: '#4a5568',
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '13px',
                  lineHeight: '1.4'
                }}>
                  <li>Environmental care</li>
                  <li>Education & support</li>
                  <li>Logistics & organization</li>
                  <li>Handwerkliche Vielseitigkeit</li>
                </ul>
              </div>
              
              {/* Languages */}
              <div style={{ 
                backgroundColor: 'white',
                border: '1px solid #9f7aea',
                borderRadius: '8px',
                padding: '0',
                boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  padding: '5px 10px',
                  background: 'linear-gradient(to bottom, #9f7aea, #7d336a)', // Vertical gradient
                  color: 'white',
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  textAlign: 'center',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)',
                  textShadow: '1px 1px 1px rgba(0,0,0,0.4)',
                  borderRadius: '6px 6px 0 0'
                }}>
                  Languages
                </div>
                <ul style={{ 
                  margin: '8px 0',
                  paddingLeft: '25px',
                  paddingRight: '10px',
                  color: '#4a5568',
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '13px',
                  lineHeight: '1.4'
                }}>
                  <li>German - Native</li>
                  <li>English - Fluent (C1)</li>
                  <li>French - Fluent</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Bottom buttons - matching style */}
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
              link.href = '/documents/cv-oskar-wasmer.pdf';
              link.setAttribute('download', 'cv-oskar-wasmer.pdf');
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}>
              Download CV (PDF)
            </ClassicXPButton>
          </div>
        </div>
      </ClassicWindow>
    </XPBackground>
  );
};

export default CV;