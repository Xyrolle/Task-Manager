import React from 'react';
import { Link } from 'react-router-dom';

import './LayoutNavigation.css';

const LayoutNavigation = () => {
  return (
    <div className='layoutNavigation'>
      <ul>
        <li>
          <Link to='/overview'>Overview</Link>
        </li>
        <li>
          <Link to='/tasks'>Tasks</Link>
        </li>
        <li>
          <Link to='/milestones'>Milestones</Link>
        </li>
        <li>
          <Link to='/messages'>Messages</Link>
        </li>
        <li>
          <Link to='/files'>Files</Link>
        </li>
        <li>
          <Link to='/time'>Time</Link>
        </li>
        <li>
          <Link to='/agenda'>Notebooks</Link>
        </li>
        <li>
          <Link to='/people'>People</Link>
        </li>
        <li>
          <Link to='/settings'>Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default LayoutNavigation;
