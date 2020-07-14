import React from 'react';

import './MainContent.css';
import ContentHeader from './ContentHeader/ContentHeader';

const MainContent: React.FC = () => {
  return (
    <div>
      <ContentHeader />
      <div className='contentContainer'>
        Here should be component with columns
      </div>
    </div>
  );
};

export default MainContent;
