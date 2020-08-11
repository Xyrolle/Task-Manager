import React from 'react';

import './PlusDropdown.css';

const PlusDropdown: React.FC = () => {
  const sections = [
    'Overview',
    'Tasks',
    'Milestones',
    'Messages',
    'Files',
    'Time',
    'Notebooks',
    'People',
    'Settings',
  ];

  return (
    <div className="plusDropdownContainer">
      <header className="plusDropdownHeader">Quick Add</header>
      <div className="plusDropdownContent" role="contentinfo">
        {sections.map(sect => (
          <div
            className="plusDropdownButton"
            key={sect}
            // onClick=
          >
            <h4>{sect.charAt(0)}</h4>
            <span>{sect}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlusDropdown;
