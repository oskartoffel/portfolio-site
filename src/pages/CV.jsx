// src/pages/CV.jsx 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClassicWindow from '../components/ui/ClassicWindow';
import ClassicXPButton from '../components/ui/ClassicXPButton';
import XPBackground from '../components/ui/XPBackground';
import { useTheme } from '../components/ui/ThemeProvider';

// Timeline data
const timelineData = [
  {
    year: '1998',
    title: 'Born in Basel',
    description: 'Started life journey in Switzerland',
    details: [
      'Born into a loving family',
      'Early fascination with nature and the outdoors'
    ]
  },
  {
    year: '2004-2010',
    title: 'Primary School',
    description: 'First educational experiences',
    details: [
      'Developed interest in science and mathematics',
      'Enjoyed outdoor activities and environmental learning',
      'First experiences with computers and technology'
    ]
  },
  {
    year: '2010-2014',
    title: 'Secondary School',
    description: 'Continued education with focus on sciences',
    details: [
      'Advanced studies in mathematics and natural sciences',
      'Participation in environmental projects',
      'Growing interest in computer programming'
    ]
  },
  {
    year: '2014-2015',
    title: 'Technical Assistance at UKBB',
    description: 'Children\'s Hospital IT Support',
    details: [
      'Installed and maintained computer systems',
      'Provided technical support to hospital staff',
      'Assisted with data management and system updates',
      'Ensured reliable IT infrastructure for patient care'
    ]
  },
  {
    year: '2018-2019',
    title: 'Civil Service at Weizenkorn',
    description: 'Support work with people with disabilities',
    details: [
      'Assisted individuals in candle-making workshop',
      'Provided personalized support and guidance',
      'Helped organize daily activities and schedules',
      'Participated in community-building initiatives'
    ]
  },
  {
    year: '2019-2023',
    title: 'Bachelor in Environmental Engineering Sciences',
    description: 'ETH Lausanne',
    details: [
      'Focus on sustainable resource management and ecosystem dynamics',
      'Technical coursework in environmental modeling and data analysis',
      'Research project on forest ecosystem simulation',
      'Developed strong skills in Python, R, and GIS software'
    ]
  },
  {
    year: '2021-2024',
    title: 'Civil Service at Oekoskop',
    description: 'Environmental protection and conservation work',
    details: [
      'Maintained and protected alpine environmental regions',
      'Led kitchen team coordinating meals for staff',
      'Participated in sustainability projects and initiatives',
      'Documented ecological findings and observations'
    ]
  },
  {
    year: '2023',
    title: 'Robotics Course Instructor',
    description: 'Taught robotics to primary school students',
    details: [
      'Designed and led an introduction to robotics using Lego',
      'Created engaging curriculum for young learners',
      'Provided individual attention and support to students',
      'Fostered problem-solving and technological creativity'
    ]
  },
  {
    year: '2023-2024',
    title: 'Logistics Staff at Intersport',
    description: 'Managed inventory and shipping logistics',
    details: [
      'Coordinated incoming and outgoing shipments',
      'Maintained inventory accuracy and organized stock',
      'Implemented efficiency improvements in warehouse processes',
      'Developed team communication strategies'
    ]
  },
  {
    year: '2023-2024',
    title: 'Matura with focus on Mathematics and Physics',
    description: 'Gymnasium Kirschgarten',
    details: [
      'Specialized in advanced mathematics and physics',
      'Developed strong analytical and problem-solving skills',
      'Participated in science competitions and projects',
      'Final thesis on environmental modeling'
    ]
  },
  {
    year: '2024',
    title: 'Construction Work',
    description: 'Practical experience in construction',
    details: [
      'Assisted in roof demolition and reconstruction',
      'Gained hands-on experience in gardening and landscaping',
      'Developed skills in traditional building techniques',
      'Worked as part of a team on tight deadlines'
    ]
  }
];

const CV = () => {
  const { setTheme } = useTheme();
  const [hoveredTimelineItem, setHoveredTimelineItem] = useState(null);
  
  // Set theme to cv when component mounts
  useEffect(() => {
    setTheme('cv');
  }, [setTheme]);

  return (
    <XPBackground>
      <ClassicWindow title="My CV">
        <div style={{ padding: '20px', width: '100%' }}>
          {/* Header */}
          <div style={{ 
            marginBottom: '30px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start'
          }}>
            <div>
              <h1 style={{ 
                fontFamily: 'Hybrid, Tahoma, Arial, sans-serif',
                color: '#7d336a',
                fontSize: '28px',
                marginBottom: '15px'
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
            
            <ClassicXPButton primary onClick={() => {
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
          
          {/* XP-style Timeline */}
          <div style={{ 
            marginTop: '40px',
            marginBottom: '40px',
            position: 'relative'
          }}>
            <h2 style={{ 
              fontFamily: 'Bubblicious, Tahoma, Arial, sans-serif',
              color: '#7d336a',
              fontSize: '24px',
              marginBottom: '20px',
              borderBottom: '2px solid #d53f8c',
              paddingBottom: '5px'
            }}>
              My Journey
            </h2>
            
            <div style={{ 
              display: 'flex',
              width: '100%',
              position: 'relative'
            }}>
              {/* Timeline Bar */}
              <div style={{ 
                width: '180px',
                minWidth: '180px',
                borderRight: '2px solid #9f7aea',
                paddingRight: '15px',
                position: 'relative',
                background: 'linear-gradient(to right, #f8f0fc, #f0e7fa)',
                marginRight: '20px',
                borderTopLeftRadius: '8px',
                borderBottomLeftRadius: '8px',
                boxShadow: '2px 0 5px rgba(0,0,0,0.05)'
              }}>
                {/* Year labels */}
                {timelineData.map((item, index) => (
                  <div 
                    key={index} 
                    style={{ 
                      padding: '15px 0',
                      position: 'relative',
                      cursor: 'pointer',
                      backgroundColor: hoveredTimelineItem === index 
                        ? 'rgba(159, 122, 234, 0.1)' 
                        : 'transparent',
                      transition: 'background-color 0.3s',
                      borderBottom: '1px solid #e9d8f4'
                    }}
                    onMouseEnter={() => setHoveredTimelineItem(index)}
                    onMouseLeave={() => setHoveredTimelineItem(null)}
                  >
                    <div style={{
                      fontFamily: 'Tahoma, Arial, sans-serif',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      color: '#7d336a',
                      textAlign: 'right',
                      paddingRight: '15px'
                    }}>
                      {item.year}
                    </div>
                    
                    {/* Timeline node */}
                    <div style={{
                      position: 'absolute',
                      right: '-23px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: hoveredTimelineItem === index 
                        ? '#d53f8c' 
                        : '#9f7aea',
                      border: '3px solid white',
                      boxShadow: '0 0 0 1px #d53f8c',
                      transition: 'all 0.3s ease',
                      zIndex: 2
                    }}></div>
                  </div>
                ))}
              </div>
              
              {/* Timeline Content */}
              <div style={{ flex: '1' }}>
                {timelineData.map((item, index) => (
                  <div 
                    key={index} 
                    style={{ 
                      padding: '15px',
                      marginBottom: '10px',
                      backgroundColor: hoveredTimelineItem === index 
                        ? '#f8f0fc' 
                        : 'white',
                      borderRadius: '8px',
                      boxShadow: hoveredTimelineItem === index 
                        ? '0 4px 6px rgba(160, 50, 120, 0.15)' 
                        : '0 1px 3px rgba(0,0,0,0.05)',
                      border: '1px solid #e9d8f4',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      opacity: hoveredTimelineItem === null || hoveredTimelineItem === index 
                        ? 1 
                        : 0.6
                    }}
                    onMouseEnter={() => setHoveredTimelineItem(index)}
                    onMouseLeave={() => setHoveredTimelineItem(null)}
                  >
                    <h3 style={{ 
                      margin: '0 0 10px 0', 
                      color: '#7d336a',
                      fontFamily: 'Tahoma, Arial, sans-serif',
                      fontWeight: 'bold',
                      fontSize: '16px'
                    }}>
                      {item.title}
                    </h3>
                    
                    <p style={{ 
                      margin: '0',
                      color: '#4a5568',
                      fontFamily: 'Tahoma, Arial, sans-serif',
                      fontSize: '14px'
                    }}>
                      {item.description}
                    </p>
                    
                    {/* Additional details shown on hover */}
                    {hoveredTimelineItem === index && (
                      <div style={{ 
                        marginTop: '15px',
                        padding: '10px',
                        backgroundColor: 'white',
                        borderRadius: '6px',
                        boxShadow: 'inset 0 0 3px rgba(0,0,0,0.1)',
                        border: '1px solid #e2e8f0'
                      }}>
                        <ul style={{ 
                          margin: '0',
                          paddingLeft: '20px',
                          color: '#4a5568',
                          fontFamily: 'Tahoma, Arial, sans-serif',
                          fontSize: '13px',
                          lineHeight: '1.5'
                        }}>
                          {item.details.map((detail, i) => (
                            <li key={i}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Skills section */}
          <div style={{ marginTop: '50px' }}>
            <h2 style={{ 
              fontFamily: 'Octuple Max, Tahoma, Arial, sans-serif',
              color: '#7d336a',
              fontSize: '24px',
              marginBottom: '20px',
              borderBottom: '2px solid #d53f8c',
              paddingBottom: '5px'
            }}>
              Skills & Competencies
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
              gap: '20px',
              marginBottom: '30px'
            }}>
              {/* Skill Card: Personal */}
              <div style={{ 
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '15px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ 
                  margin: '0 0 10px 0',
                  color: '#7d336a',
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '16px',
                  borderBottom: '1px solid #e2e8f0',
                  paddingBottom: '5px'
                }}>
                  Personal
                </h3>
                <ul style={{ 
                  margin: '0',
                  paddingLeft: '20px',
                  color: '#4a5568',
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '14px',
                  lineHeight: '1.6'
                }}>
                  <li>Teamfähig</li>
                  <li>Lernfreudig</li>
                  <li>Kommunikativ</li>
                </ul>
              </div>
              
              {/* Skill Card: Technical */}
              <div style={{ 
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '15px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ 
                  margin: '0 0 10px 0',
                  color: '#7d336a',
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '16px',
                  borderBottom: '1px solid #e2e8f0',
                  paddingBottom: '5px'
                }}>
                  Technical Skills
                </h3>
                <ul style={{ 
                  margin: '0',
                  paddingLeft: '20px',
                  color: '#4a5568',
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '14px',
                  lineHeight: '1.6'
                }}>
                  <li>Python, R-Studio, SQL</li>
                  <li>Matlab and C</li>
                  <li>QGIS and Excel</li>
                  <li>Data visualization</li>
                </ul>
              </div>
              
              {/* Skill Card: Professional */}
              <div style={{ 
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '15px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ 
                  margin: '0 0 10px 0',
                  color: '#7d336a',
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '16px',
                  borderBottom: '1px solid #e2e8f0',
                  paddingBottom: '5px'
                }}>
                  Professional Strengths
                </h3>
                <ul style={{ 
                  margin: '0',
                  paddingLeft: '20px',
                  color: '#4a5568',
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '14px',
                  lineHeight: '1.6'
                }}>
                  <li>Environmental care</li>
                  <li>Education & support</li>
                  <li>Logistics & organization</li>
                  <li>Handwerkliche Vielseitigkeit</li>
                </ul>
              </div>
              
              {/* Skill Card: Languages */}
              <div style={{ 
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '15px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ 
                  margin: '0 0 10px 0',
                  color: '#7d336a',
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '16px',
                  borderBottom: '1px solid #e2e8f0',
                  paddingBottom: '5px'
                }}>
                  Languages
                </h3>
                <ul style={{ 
                  margin: '0',
                  paddingLeft: '20px',
                  color: '#4a5568',
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  fontSize: '14px',
                  lineHeight: '1.6'
                }}>
                  <li>German - Native</li>
                  <li>English - Fluent (C1)</li>
                  <li>French - Fluent</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Contact section */}
          <div style={{ 
            marginTop: '30px',
            backgroundColor: '#f8f0fc',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <h2 style={{ 
              fontFamily: 'Popstar Pop, Tahoma, Arial, sans-serif',
              color: '#7d336a',
              fontSize: '20px',
              marginBottom: '15px'
            }}>
              Contact
            </h2>
            <p style={{ 
              margin: '0',
              fontFamily: 'Tahoma, Arial, sans-serif',
              fontSize: '14px',
              color: '#4a5568',
              lineHeight: '1.8'
            }}>
              Email: oskar.wasmer@gmail.com<br />
              Phone: (+41) 78 629 37 83<br />
              Address: Neuhausstrasse 12, 4057 Basel
            </p>
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '20px',
            marginTop: '40px'
          }}>
            <Link to="/">
              <ClassicXPButton>
                Back to Home
              </ClassicXPButton>
            </Link>
          </div>
        </div>
      </ClassicWindow>
    </XPBackground>
  );
};

export default CV;