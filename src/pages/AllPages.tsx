import React, { useContext, useEffect } from 'react';

import { AppContext } from 'context/AppContext';
import Modal from 'components/Modal/Modal';
import AddTaskListModal from 'components/Modal/AddTaskListModal/AddTaskListModal';
import AddProjectModal from 'components/Modal/AddProjectModal/AddProjectModal';
import AddLinkModal from 'components/Modal/AddLinkModal/AddLinkModal';
import AddTimeModal from 'components/Modal/AddTimeModal/AddTimeModal';
import ProjectsPage from './ProjectsPage/ProjectsPage';

const AllPages: React.FC = () => {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }
  const { setUserInfo, openModal, userDetails, closeModal } = ctx;
  useEffect(() => {
    setUserInfo();
  }, []);

  const handleModal = () => {
    switch (openModal) {
      case 'taskListModal':
        return <AddTaskListModal closeModal={closeModal} />;
      case 'addTeamModal':
        return <Modal isUpgradeModalOpen={false} closeModal={closeModal} />;
      case 'upgradeModal':
        return <Modal isUpgradeModalOpen={true} closeModal={closeModal} />;
      case 'addProjectModal':
        return (
          <AddProjectModal userId={userDetails.id} closeModal={closeModal} />
        );
      case 'linkModal':
        return (
          <AddLinkModal closeModal={closeModal} userDetails={userDetails} />
        );
      case 'timeModal':
        return <AddTimeModal closeModal={closeModal} />;
      default:
        return;
    }
  };

  return (
    <div>
      {handleModal()}
      {userDetails && <ProjectsPage />}
    </div>
  );
};

export default AllPages;
