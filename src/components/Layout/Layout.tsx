import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './Layout.css';
import LayoutHeader from './LayoutHeader/LayoutHeader';
import LayoutNavigation from './LayoutNavigation/LayoutNavigation';
import { AppContext } from '../../context/AppContext';

const Layout: React.FC = () => {
  const { projectId } = useParams();

  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }

  useEffect(() => {
    ctx.setProjectId(projectId);
  }, []);

  return (
    <div>
      <LayoutHeader />
      <LayoutNavigation />
    </div>
  );
};

export default Layout;
