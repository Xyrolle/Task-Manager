import React from 'react';
import './MainContent.css';
import ContentHeader from './ContentHeader/ContentHeader';

const MainContent: React.FC = () => {

  return (
    <div>
      <ContentHeader />
      <div className='contentContainer'>
        <h4>Main Content Component</h4>
      </div>
    </div>
  );
};

export default MainContent;
