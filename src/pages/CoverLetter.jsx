// src/pages/CoverLetter.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClassicWindow from '../components/ui/ClassicWindow';
import ClassicXPButton from '../components/ui/ClassicXPButton';
import XPBackground from '../components/ui/XPBackground';
import { useTheme } from '../components/ui/ThemeProvider';

const CoverLetter = () => {
  const { setTheme } = useTheme();
  
  // Set theme to coverletter when component mounts
  useEffect(() => {
    setTheme('coverletter');
  }, [setTheme]);

  return (
    <XPBackground>
      <ClassicWindow title="My Cover Letter">
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ 
            textAlign: 'center', 
            fontFamily: 'Popstar, Tahoma, Arial, sans-serif',
            color: '#aa4215',
            fontSize: '24px',
            marginBottom: '30px'
          }}>
            Cover Letter
          </h1>
          
          <div style={{ 
            fontFamily: 'Tahoma, Arial, sans-serif',
            fontSize: '14px',
            lineHeight: '1.6',
            color: '#333'
          }}>
            <p>Dear Admissions Committee,</p>
            
            <p>I am writing to express my interest in the Master's program in Environmental Sciences. With a strong foundation in environmental engineering from ETH Lausanne and practical experience in various ecological and social contexts, I am eager to further develop my expertise in this field.</p>
            
            <p>My journey in environmental sciences began during my bachelor's studies, where I developed a deep understanding of the complex interactions between natural systems and human activities. What particularly draws me to this program is the opportunity to combine technical knowledge with practical applications aimed at creating sustainable solutions.</p>
            
            <p>During my civil service at Oekoskop, I gained valuable experience in environmental protection and conservation in alpine regions. This hands-on work allowed me to witness firsthand the delicate balance of ecosystems and the importance of thoughtful human intervention. My technical background, combined with programming skills in Python, R, and data visualization tools, has enabled me to develop models and simulations that help illustrate complex environmental dynamics – as demonstrated in my forest ecosystem simulation project.</p>
            
            <p>Beyond my academic and professional experiences, I bring a thoughtful, team-oriented approach to my work. As someone who values encounters with others and the exchange of diverse perspectives, I believe I would contribute positively to the collaborative learning environment of your program. My experience leading a robotics course for primary school students also reflects my commitment to sharing knowledge and inspiring interest in technical and scientific fields.</p>
            
            <p>I am particularly interested in exploring how technology and data analysis can enhance our understanding of environmental systems and inform policy decisions. The interdisciplinary nature of your program, combining ecological principles with practical applications, aligns perfectly with my goal to develop innovative approaches to environmental challenges.</p>
            
            <p>Thank you for considering my application. I look forward to the possibility of continuing my educational journey at your institution and contributing to the important work of environmental stewardship and sustainability.</p>
            
            <p style={{ marginTop: '30px' }}>Sincerely,<br />Oskar Wasmer</p>
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '20px',
            marginTop: '40px'
          }}>
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

export default CoverLetter;