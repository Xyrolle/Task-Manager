import React from 'react';

import underConstruction from 'assets/under-construction.jpg';
import './UnderConstruction.css';

const UnderConstruction: React.FC = () => {
  return (
    <div className="underConstruction">
      <h2>Page is Under Construction...</h2>
      <img src={underConstruction} alt="underConstruction" />
    </div>
  );
};

export default UnderConstruction;
