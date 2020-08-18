import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';

import { getProjects } from 'utils/getProjects';
import { AppContext } from 'context/AppContext';
import Header from 'components/Header/Header';
import AddTaskListModal from 'components/Modal/AddTaskListModal/AddTaskListModal';
import AddProjectModal from 'components/Modal/AddProjectModal/AddProjectModal';
import AddLinkModal from 'components/Modal/AddLinkModal/AddLinkModal';
import MainContent from 'components/MainContent/MainContent';
import MessageModal from 'components/Modal/MessageModal/MessageModal';
import AddTimeModal from '../components/Modal/AddTimeModal/AddTimeModal';
import AddMilestoneModal from 'components/Modal/AddMilestoneModal/AddMilestoneModal';
import Modal from '../components/Modal/Modal';

const AllPages: React.FC = () => {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }
  const { setUserInfo, openModal, userDetails, closeModal, isLayoutActive } = ctx;
  useEffect(() => {
    setUserInfo();
  }, []);

  const { data } = useQuery(['getProjects', userDetails && userDetails.id], userDetails && getProjects);

  const handleModal = () => {
    switch (openModal) {
      case 'milestones':
        return <AddMilestoneModal />;
      case 'tasks':
        return <AddTaskListModal closeModal={closeModal} />;
      case 'addTeamModal':
        return <Modal isUpgradeModalOpen={false} closeModal={closeModal} data={data.data} />;
      case 'upgradeModal':
        return <Modal isUpgradeModalOpen={true} closeModal={closeModal} data={data.data} />;
      case 'addProjectModal':
        return <AddProjectModal userId={userDetails.id} closeModal={closeModal} />;
      case 'links':
        return <AddLinkModal closeModal={closeModal} userDetails={userDetails} />;
      case 'time':
        return <AddTimeModal closeModal={closeModal} />;
      case 'messages':
        return <MessageModal closeModal={closeModal} />;
      default:
        return;
    }
  };

  return (
    <div>
      <Header />
      {handleModal()}
      {userDetails && <MainContent isLayoutActive={isLayoutActive} />}
    </div>
  );
};

export default AllPages;
