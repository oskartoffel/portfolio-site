// src/pages/CV.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Window from '../components/ui/Window';

const CV = () => {
  return (
    <div className="xp-desktop">
      <Window title="My CV">
        <h1>My Curriculum Vitae</h1>
        {/* Add your CV content here */}
        <div className="field-row" style={{ justifyContent: 'center', marginTop: '20px' }}>
          <button>Download CV</button>
          <Link to="/"><button>Back to Home</button></Link>
        </div>
      </Window>
    </div>
  );
};

//export default CV;

// src/pages/CoverLetter.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Window from '../components/ui/Window';

const CoverLetter = () => {
  return (
    <div className="xp-desktop">
      <Window title="My Cover Letter">
        <h1>Cover Letter</h1>
        {/* Add your cover letter content here */}
        <div className="field-row" style={{ justifyContent: 'center', marginTop: '20px' }}>
          <button>Download Cover Letter</button>
          <Link to="/"><button>Back to Home</button></Link>
        </div>
      </Window>
    </div>
  );
};

//export default CoverLetter;