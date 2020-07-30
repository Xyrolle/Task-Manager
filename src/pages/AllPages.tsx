import React, { useContext, Fragment } from 'react';

import ProjectsPage from './ProjectsPage/ProjectsPage';
import Modal from '../components/Modal/Modal';
import AddTaskListModal from '../components/MainContent/Tasks/AddTaskListModal/AddTaskListModal';
import { AppContext } from '../context/AppContext';

const AllPages: React.FC = () => {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }
  return (
    <div>
      {ctx.addTaskListModal ? (
        <Fragment>
          <AddTaskListModal />
          <ProjectsPage />
        </Fragment>
      ) : ctx.modalVisible ? (
        <Fragment>
          <Modal isUpgradeModalOpen={ctx.isUpgradeModalOpen} />
          <ProjectsPage />
        </Fragment>
      ) : (
        <ProjectsPage />
      )}
    </div>
  );
};

export default AllPages;
