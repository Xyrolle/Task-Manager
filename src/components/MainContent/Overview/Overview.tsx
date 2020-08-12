import React from 'react';

import underConstruction from 'assets/under-construction.jpg';
import './Overview.css';

const Overview: React.FC = () => {
  return (
    <div className="construction">
      <h4>Under Construction...</h4>
      <img src={underConstruction} alt="Under Construction" />
    </div>
  );
};

export default Overview;
