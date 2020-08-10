import React, { useContext } from 'react';
import './ContentHeader.css';
import { AppContext } from 'context/AppContext';

const ContentHeader: React.FC = () => {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }
  const { activeLink, setOpenModal } = ctx;

  return (
    <div className="contentHeader">
      <h1 className="contentHeader-left">{activeLink}</h1>
      <div className="contentHeader-right">
        <button className="btn" onClick={() => setOpenModal('taskListModal')}>
          <span>+</span>
          {activeLink === 'Tasks' ? 'Add Task List' : 'Add details'}
        </button>
      </div>
    </div>
  );
};

export default ContentHeader;
