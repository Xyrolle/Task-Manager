import React from 'react';

import './Header.css';
import Vector from '../../assets/Vector.svg';
import SearchIcon from '../../assets/SearchIcon.svg';
import Bell from '../../assets/Bell.svg';
import Plus from '../../assets/Plus.svg';

const Header: React.FC = () => {
  return (
    <header className='mainHeader'>
      <nav className='nav'>
        <div className='mainHeadList'>
          <div className='logo'>
            <span>Task</span> <span>Manager</span>
          </div>
          <ul>
            <li>Home</li>
            <li>Projects</li>
            <li>Planning</li>
            <li>Everything</li>
            <li>Calendar</li>
            <li>People</li>
          </ul>
        </div>
        <div className='mainHeadBtns'>
          <button type='button' className='addTeamBtn'>
            <img src='//cdn-pjs.teamwork.com/tko/public/assets/svg/inlinehelp/inviteusers.svg' />{' '}
            Add Your Team
          </button>
          <button type='button' className='upgradeBtn'>
            Upgrade Now
          </button>
          <span className='searchCircle'>
            <img src={SearchIcon} alt='search' className='search' />
          </span>
          <div className='plus'></div>
          <div className='folder'></div>
          <span className='bellContainer'>
            <img src={Bell} alt='bell' className='bell' />
          </span>
          <span className='profileCircle'>
            <span>EO</span>
          </span>
          <img src={Vector} alt='vector' className='vector' />
        </div>
      </nav>
    </header>
  );
};

export default Header;
