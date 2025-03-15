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

  const handleDownloadCoverLetter = () => {
    // Create a link to download the PDF
    const link = document.createElement('a');
    link.href = '/documents/cover-letter-oskar-wasmer.pdf';
    link.setAttribute('download', 'cover-letter-oskar-wasmer.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <XPBackground>
      <ClassicWindow title="My Cover Letter">
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ 
            backgroundColor: '#fff5f1',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            border: '1px solid #f27d0c',
            position: 'relative',
            marginBottom: '25px',
            fontFamily: 'Tahoma, Arial, sans-serif',
            lineHeight: '1.6',
            color: '#333',
            fontSize: '14px'
          }}>
            <p>Dear [Recipient],</p>

            <p>My name is Oskar (he/him) and with this letter I would like to apply for the transversal design master. This letter marks the conclusion of my application process for the Transversal Design master's program—a journey that began about three months ago while getting my hair cut by Lilo, who is currently enrolled in the program. Since then, I have gathered information, spoken with many people, visited the campus, and eventually decided to apply. In the process following this decision, countless thoughts and emotions emerged—especially during the creation of my portfolio— e articulate why I want to pursue this degree.</p>

            <p>My initial motivation comes from a frustration carried over from my environmental engineering studies. As the degree was labeled "environmental," I expected it to tackle our ongoing climate crisis. Instead, the curriculum was purely technical, with no space for politics, sociology, economics, ethics, or reflecting on their own perspective. This narrow focus also became noticeable in peoples mindsets: "We, as the Western elite with our knowledge and progress, are the chosen ones who will save the world." Independent thinking was not encouraged, and we were trained to perform under pressure rather than providing us a space to critically think.</p>

            <p>So when I finished my bachelor's, I was there with a degree but frustrated and did not know what to do with it. But when I discovered a research-based design master's program that welcomes people with diverse backgrounds, a new prospect startet to develop. Suddenly, there seemed to be a constructive way to use, share, and communicate the knowledge I had gained about the environment.</p>

            <p>Deciding to apply took time, largely because I grew up in an environment that prioritized a linear academic path leading to a secure job, stable income, and eventually a hose with a nuclear family. Creativity was not discouraged, but neither was it actively supported, so it often felt like there was no space for it. However, your wider view of "design" engaged me to revisit the ways I had already been designing without using that term. Understanding that design can exist independently of physical objects gave me a new lens on my past experiences—making me realize I had been creatively designing for longer than I thought. This realization helped me to get encouraged to apply.</p>

            <p>As this new perspective on past processes felt crucial on the path to applying for this program, I decided to share my insights (<Link to="/cv">interactive CV</Link>). But besides that I also wanted to present a rather concrete project by revisiting a simulation of trees, deer, and wolves I had programmed during my bachelor's. My goal was to visualize it in a new way, bringing in elements from my previous studies to simplify a complex ecological concept and illustrate the value of healthy ecosystems in a playful, accessible manner.</p>

            <p>The process (<Link to="/behind-works">behind my works</Link>) of this project, that eventually ended up with a website (<Link to="/ecosystem-simulation">forest simulation</Link>) was a demanding time. In the end, I am not fully satisfied with the result and would have loved to expand the visualization further. Nevertheless, I found the whole process, in which I gave myself the time and space to create something freely and design things the way I wanted, very enriching. Over the last 4 weeks, this freedom has led to an eagerness to work on the portfolio that I have rarely felt and I have at times I was able to fully immerse into my codes.</p>

            <p>And now imagining the possibility of having an infrastructure through a study program that provides space to create projects freely on my own or with other sounds genuinely exciting.</p>

            <p>For me, this "infrastructure" includes not just practical resources like workspaces or softwares but also a platform to meet people who want to question norms, expand ideas, and discover new ways of seeing the world. And frrom what I understand, the Transversal Design master's program offers exactly that—a space where we can discuss, think critically, deconstruct, play, and design together. Contributing to such an environment appeals to me greatly.</p>

            <p>On a personal level, I have always appreciated how my view of the world and on my life was challenged as a result of encountering new perspectives and backgrounds. And on a societal level, where many developments feel very unsettling to me, I think it is extremely important to come together and try to rethink the processes that dominate our world. For me, this includes confronting power structures on a larger level, such as capitalism, capitalism, or patriarchy as well as questions about how we want to shape community life on a smaller level.</p>

            <p>Whenever multiple people collaborate, communication matters—verbally, visually, or in more abstract forms. Perhaps that's what "design" means to me at the end of my application process: making through a form of communication thoughts, feelings, inner conflicts, or a discomfort tangible for oneself or others.</p>

            <p>Somehow, that is what I tried to do with this portfolio. I had an inner feeling that your program could be something for me, and I also believe I have insights to share that might interest others in the program. Through this letter, and through my website, simulation, design-focused life story, and supporting texts, I have tried to make this feeling that this could be match tangible for you. If this resonates with you I would be excited to meet and get to know you and discuss the possibility of me starting Transversal Design studies this summer.</p>

            <p>Thank you very much for your time and for reading and engaging with my thoughts.<br/>
            Sincerely, and hopefully seeing you soon,<br/>
            Oskar Wasmer</p>
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
            
            <ClassicXPButton onClick={handleDownloadCoverLetter}>
              Download Cover Letter (PDF)
            </ClassicXPButton>
          </div>
        </div>
      </ClassicWindow>
    </XPBackground>
  );
};

export default CoverLetter;