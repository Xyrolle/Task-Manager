import React from 'react';

import underConstruction from 'assets/under-construction.jpg';
import './UnderConstruction.css';

interface UnderConstructionProps {
  title: string;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({ title }) => {
  return (
    <div className="underConstruction">
      <h2>{`${title} Page is Under Construction...`}</h2>
      <img src={underConstruction} alt="Under Construction" />
    </div>
  );
};

export default UnderConstruction;
