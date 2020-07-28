import React from 'react';

import './BellDropdown.css';
import Bell from '../../../assets/Bell.svg';

const BellDropdown: React.FC = () => {
  return (
    <div className='bellDropdownContainer'>
      <header className='bellDropdownHeader'>Notifications</header>
      <div className='bellDropdownContent' role='contentinfo'>
        <img src={Bell} alt='bell' className='bell' />
        <h4>No Notifications</h4>
        <p>You currently have no notifications.</p>
      </div>
    </div>
  );
};

export default BellDropdown;
