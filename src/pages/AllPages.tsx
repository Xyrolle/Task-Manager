import React, { useContext, useEffect } from 'react';

import { AppContext } from 'context/AppContext';
import ProjectsPage from './ProjectsPage/ProjectsPage';
import Modal from 'components/Modal/Modal';
import AddTaskListModal from 'components/Modal/AddTaskListModal/AddTaskListModal';
import AddProjectModal from 'components/Modal/AddProjectModal/AddProjectModal';
import AddLinkModal from 'components/Modal/AddLinkModal/AddLinkModal';
import AddTimeModal from 'components/Modal/AddTimeModal/AddTimeModal';

const AllPages: React.FC = () => {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }
  useEffect(() => {
    ctx.setUserInfo();
  }, []);

  const handleModal = () => {
    switch (ctx.openModal) {
      case 'taskListModal':
        return <AddTaskListModal />;
      case 'addTeamModal':
        return <Modal isUpgradeModalOpen={false} />;
      case 'upgradeModal':
        return <Modal isUpgradeModalOpen={true} />;
      case 'addProjectModal':
        return <AddProjectModal userId={ctx.userDetails.id} />;
      case 'linkModal':
        return <AddLinkModal />;
      case 'timeModal':
        return <AddTimeModal />;
      default:
        return;
    }
  };

  return (
    <div>
      {handleModal()}
      {ctx.userDetails && <ProjectsPage />}
    </div>
  );
};

export default AllPages;
