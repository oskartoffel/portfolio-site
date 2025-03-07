// src/pages/CV.jsx - With improved timeline hover effects
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

// Skills data
const skillsData = [
  {
    title: "Technical Skills",
    items: [
      "Python, R-Studio, SQL",
      "Matlab and C",
      "QGIS and Excel",
      "Data visualization"
    ]
  },
  {
    title: "Languages",
    items: [
      "German - Native",
      "English - Fluent (C1)",
      "French - Fluent"
    ]
  }
];

// Additional content that appears when hovering over a period
const expandedContent = {
  '1998-2014': 'During my early years, I developed a curiosity for the natural world and technology. My time in primary and secondary school laid the foundation for my interest in science and mathematics, which would later influence my educational path. I began exploring computers and programming through small projects and games.',
  '2014-2018': 'My high school years were formative for my academic interests. Working at the Children\'s Hospital IT Support gave me practical technology experience while I pursued a rigorous academic program. My Matura thesis explored environmental modeling, combining my interest in computing with environmental sciences.',
  '2018-2019': 'This period of civil service and travel was essential for my personal growth. Working with people with disabilities at Weizenkoreople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eueople with disabilities at Weizenkorn taught me patience and a deeper understanding of diverse human experiences. My travels across Eun taught me patience and a deeper understanding of diverse human experiences. My travels across Europe and volunteering on organic farms connected me to sustainable practices and different cultures.',
  '2020-2023': 'My bachelor studies at ETH Lausanne gave me a strong technical foundation in environmental engineering. I developed specialized skills in data analysis and modeling environmental systems. My work at Oekoskop further reinforced my commitment to environmental protection, working on projects to preserve Alpine ecosystems.',
  '2023-2025': 'My recent professional experiences have diversified my skillset and prepared me for advanced studies. Teaching robotics to children has improved my communication and teaching abilities, while my logistics and construction roles have given me practical insights into resource management and physical systems.'
};

const CV = () => {
  const { setTheme } = useTheme();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  // Toggle expanded content when clicking the arrow
  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };
  
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
      <ClassicWindow title="My CV" width="80%" height="95%">
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
          
          {/* Timeline container */}
                      <div style={{ 
            display: 'flex',
            width: '100%',
            position: 'relative',
            border: '2px solid #e9d8f4',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
            minHeight: '680px',
            transition: 'all 0.3s ease',
            padding: '0' // Removed padding to allow full extension
          }}>
            {/* Timeline Grid with two columns: years and content */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '140px 1fr',
              width: '100%',
              position: 'relative',
              gridGap: '0', // Ensure no gap between columns
              padding: '20px 0' // Add padding to the grid instead
            }}>
              {/* Left column background - continuous shading */}
              <div style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: '140px',
                background: 'linear-gradient(to right, #e9d8f4, #f8f0fc)',
                zIndex: 0
              }}></div>
              
              {/* Vertical purple timeline line - extended fully */}
              <div style={{
                position: 'absolute',
                top: '0',
                bottom: '0',
                left: '140px', // At the end of the years column
                width: '2px',
                background: '#7d336a',
                zIndex: 1
              }}></div>
              
              {/* Timeline entries */}
              {timelinePeriods.map((period, index) => (
                <React.Fragment key={index}>
                  {/* Year column */}
                  <div 
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        position: 'relative',
                        height: 'auto',
                        minHeight: '180px',
                        transition: 'all 0.4s ease',
                        cursor: 'pointer',
                        backgroundColor: hoveredIndex === index ? 'rgba(157, 50, 172, 0.1)' : 'transparent',
                        marginBottom: '40px',
                        zIndex: 2,
                        // Add these properties to fix the vertical fill:
                        paddingTop: '0',
                        paddingBottom: '0'
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                    <div style={{
                      fontFamily: 'Tahoma, Arial, sans-serif',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      color: hoveredIndex === index ? '#5d1b68' : '#7d336a',
                      textShadow: '1px 1px 0 #fff',
                      padding: '10px',
                      textAlign: 'center',
                      width: '100%',
                      position: 'absolute',
                      top: '35.5px', // Positioned 15.5px below the bullet point (30px + 15.5px)
                      transition: 'color 0.3s ease'
                    }}>
                      {period.years}
                    </div>
                    
                    {/* Purple dot marker aligned with content header */}
                    <div style={{
                      position: 'absolute',
                      right: '-9px', // Position on the timeline
                      top: '30px',
                      width: hoveredIndex === index ? '20px' : '16px',
                      height: hoveredIndex === index ? '20px' : '16px',
                      borderRadius: '50%',
                      background: hoveredIndex === index ? 
                        'radial-gradient(circle at 35% 35%, #f8c6ff, #7d336a)' : 
                        'radial-gradient(circle at 35% 35%, #d094ed, #7d336a)',
                      border: '1px solid rgba(255, 255, 255, 0.8)',
                      boxShadow: hoveredIndex === index ? 
                        '0 0 8px rgba(125, 51, 106, 0.6), inset 0 0 4px rgba(255, 255, 255, 0.8)' : 
                        '0 0 3px rgba(0, 0, 0, 0.3), inset 0 0 2px rgba(255, 255, 255, 0.8)',
                      zIndex: 3,
                      transition: 'all 0.3s ease'
                    }}></div>
                  </div>
                  
                  {/* Content column */}
                  <div 
                    style={{
                      backgroundColor: 'rgba(248, 240, 252, 0.2)',
                      padding: '0 20px 0 30px',
                      height: hoveredIndex === index ? 'auto' : '180px', // Increased height
                      minHeight: '180px',
                      transition: 'all 0.4s ease',
                      cursor: 'pointer',
                      marginBottom: '45px', // Increased spacing between entries
                      position: 'relative',
                      zIndex: 2
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Content box */}
                    <div style={{
                      background: 'white',
                      borderRadius: '8px',
                      border: `1px solid ${hoveredIndex === index ? '#9a4cbc' : '#9f7aea'}`,
                      overflow: 'hidden',
                      boxShadow: hoveredIndex === index ? 
                        '3px 3px 10px rgba(125, 51, 106, 0.3)' : 
                        '2px 2px 6px rgba(0,0,0,0.1)',
                      padding: '15px',
                      height: '100%',
                      transition: 'all 0.3s ease'
                    }}>
                      {/* Content title */}
                      <div style={{
                        fontFamily: 'Tahoma, Arial, sans-serif',
                        fontSize: hoveredIndex === index ? '20px' : '18px',
                        fontWeight: 'bold',
                        color: hoveredIndex === index ? '#5d1b68' : '#7d336a',
                        marginBottom: '12px',
                        transition: 'all 0.3s ease'
                      }}>
                        {period.title}
                      </div>
                      
                      {/* List items */}
                      <ul style={{
                        margin: '0',
                        paddingLeft: '20px',
                        color: hoveredIndex === index ? '#333' : '#4a5568',
                        fontFamily: 'Tahoma, Arial, sans-serif',
                        fontSize: hoveredIndex === index ? '15px' : '14px',
                        lineHeight: '1.6',
                        transition: 'all 0.3s ease'
                      }}>
                        {period.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                      
                      {/* Expanded content that appears when hovered */}
                      {hoveredIndex === index && (
                        <div style={{
                          marginTop: '15px',
                          padding: '10px',
                          backgroundColor: 'rgba(248, 240, 252, 0.4)',
                          borderRadius: '6px',
                          border: '1px dashed #9f7aea',
                          fontSize: '14px',
                          lineHeight: '1.5',
                          fontFamily: 'Tahoma, Arial, sans-serif',
                          color: '#333',
                          // Add a max-height with overflow to prevent large layout shifts
                          maxHeight: '150px',
                          overflowY: 'auto',
                          animation: 'fadeIn 0.5s ease'
                        }}>
                          {expandedContent[period.years]}
                        </div>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
          
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
            
            {/* Skills are horizontally aligned */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: '30px',
              marginBottom: '20px'
            }}>
              {skillsData.map((skill, index) => (
                <div key={index} style={{
                  backgroundColor: 'white',
                  border: '1px solid #9f7aea',
                  borderRadius: '8px',
                  padding: '12px',
                  boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
                  width: '250px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontFamily: 'Tahoma, Arial, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    color: '#7d336a',
                    marginBottom: '8px',
                    borderBottom: '1px solid #e9d8f4',
                    paddingBottom: '4px'
                  }}>
                    {skill.title}
                  </div>
                  <ul style={{
                    margin: '0',
                    padding: '0',
                    listStyle: 'none',
                    color: '#4a5568',
                    fontFamily: 'Tahoma, Arial, sans-serif',
                    fontSize: '13px',
                    lineHeight: '1.4',
                    textAlign: 'center'
                  }}>
                    {skill.items.map((item, i) => (
                      <li key={i} style={{ margin: '6px 0' }}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
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