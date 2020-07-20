import React, { useContext } from 'react';

import ProjectsPage from './ProjectsPage/ProjectsPage';
import Modal from '../components/Modal/Modal';
import { AppContext } from '../context/AppContext';

const AllPages: React.FC = () => {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }
  return (
    <div>
      {ctx.modalVisible ? (
        <>
          <Modal />
          <ProjectsPage />
        </>
      ) : (
        <ProjectsPage />
      )}
    </div>
  );
};

export default AllPages;
