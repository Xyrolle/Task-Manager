import React from 'react';

import './Layout.css';
import LayoutHeader from './LayoutHeader/LayoutHeader';

const Layout: React.FC = () => {
  return (
    <div>
      <LayoutHeader />
      <div className='layoutContent'></div>
    </div>
  );
};

export default Layout;
