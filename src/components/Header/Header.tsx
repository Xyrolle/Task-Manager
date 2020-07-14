import React from 'react';

import './Header.css';

const Header: React.FC = () => {
  return (
    <header className='mainHeader'>
      <nav className='nav'>
        <ul>
          <li>Home</li>
          <li>Projects</li>
          <li>Planning</li>
          <li>Everything</li>
          <li>Calendar</li>
          <li>People</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
