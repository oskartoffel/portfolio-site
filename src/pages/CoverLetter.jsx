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
      <ClassicWindow title="Cover Letter & CV">
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
            <p>Dear Admissions Committee,</p>

            <p>I am Oskar (he/him), and herewith I would like to apply for the Transversal Design master's program.</p>

            <p>My initial motivation comes from a frustration carried over from my environmental engineering studies, which I completed with a bachelor's degree. As the degree is labeled as "environmental," I expected it to constructively tackle our ongoing climate crisis and the ecological and social consequences it has. Instead, the curriculum was purely technical, with no space for politics, sociology, economics, ethics or reflections on own perspectives. This narrow center of attention also became noticeable in the overall mindset, that perceives the students as western elites who will save the world through their knowledge and technical innovation. Independent thinking was not encouraged, and we were trained to perform under pressure rather than providing us a space to critically think.</p>

            <p>Once I finished my bachelor and received my degree, I was left feeling frustrated and did not really know what to do with it. Discovering this research-based design master's program developed a new prospect. Suddenly, there seemed to be a constructive way to use, share, and communicate the knowledge I had gained through environmental studies.</p>

            <p>The decision to send my application took me some time, mostly because I grew up in an environment that prioritized a linear academic path leading to a secure job, stable income, and eventually a house with a nuclear family. Creativity was not discouraged, but neither was it actively supported, so it often felt like there was no space for it. However, your broader perspective on design engaged me to revisit the ways I had already been designing without framing it that way. Understanding that design can exist independently of physical objects gave me a new lens on my past experiences. From the early days when I tried to communicate feelings with clothing and appearance changes to the active shaping of my relationships and my way of living in many aspects in recent years.</p>

            <p>These realizations encouraged me to apply.</p>

            <p>Still I wanted to present a concrete project by revisiting a simulation of a functioning ecosystem including trees, deer, and wolves I had programmed for a class in my bachelor. My goal was to visualize it in a new way, bringing in elements from my previous studies to simplify a complex ecological concept and illustrate the value of healthy ecosystems in a playful, accessible manner.</p>

            <p>The process of creating this project, and eventually generating a website was demanding. Seeing the result, I wished I had more time to expand the visualization, as I remark different elements of the simulation that could have further been evolved. Nevertheless, I found the whole process, in which I gave myself the time and space to create and design something freely very enriching. Over the last 4 weeks, this freedom has led to an eagerness to work on the portfolio that I have rarely felt and I have at times been able to fully immerse into my codes.</p>

            <p>The possibility of having an infrastructure through a study program that provides space to create freely by myself or in groups sounds genuinely appealing. I imagine this "infrastructure" not only as practical resources like workspaces or softwares but also as a platform to meet people who are interested in questioning norms, expanding ideas, and discovering new ways of seeing the world. From what I understand, the Transversal Design master's program offers exactly that—a space where we can discuss, think critically, deconstruct, play, and design together. Being part of and contributing to such an environment intrigues me greatly.</p>

            <p>On a personal level, I have always appreciated how my view of the world and on my life has been challenged as a result of encountering new perspectives and backgrounds. On a societal level, where the current development concerns me, the possibility of coming together and rethinking the processes and dynamics that dominate our world are very important to me. For me, this includes confronting power structures on a larger level such as capitalism, colonialism and patriarchy as well as questions about how we want to shape community on a smaller level.</p>

            <p>Whenever multiple people collaborate, communication matters—verbally, visually, or in more abstract forms. Perhaps that is what I understand under design at the end of my application process: creative thinking and processing to communicate and engage with thoughts, feelings, inner conflicts or discomforts by oneself or with others. That is also somehow what I have tried to do with this portfolio, by sharing my website, simulations and supporting texts to convey my thoughts and feelings, that I believe your programme fits my intentions as well as my perspectives might be interesting to others in the programme.</p>

            <p>Thank you very much for your time and for reading and engaging with my thoughts. I am looking forward to hearing from you and hope to see you soon.</p>

            <p>Sincerely,<br/>
            Oskar Wasmer</p>
          </div>
          
          {/* Navigation button */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: '25px'
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

export default CoverLetter;