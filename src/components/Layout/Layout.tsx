import React from 'react';
import { Link } from 'react-router-dom';

import './Layout.css';
import LayoutHeader from './LayoutHeader/LayoutHeader';

import LayoutNavigation from './LayoutNavigation/LayoutNavigation';

const Layout: React.FC = () => {
  return (
    <div>
      <LayoutHeader />
      <LayoutNavigation />
    </div>
  );
};

export default Layout;
