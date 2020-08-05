import React, { useState, useContext } from 'react';
import { Route, useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';

import { getLinks } from './queries';
import './LinkContent.css';
import LinkComponent from './LinkComponent/LinkComponent';
import { AppContext } from 'context/AppContext';

const LinkContent: React.FC = () => {
  const { projectId } = useParams();
  const { status, data, error } = useQuery(['getLinks', projectId], getLinks);
  const [isAddLinkOpen, setIsAddLinkOpen] = useState(false);
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }

  return (
    <div>
      <button
        onClick={() => ctx.setOpenModal('linkModal')}
        className='addLinkButton'
      >
        + Add Link
      </button>
      <div className='linkComponentContainer'>
        {data &&
          data.data.map((link: any, key: number) => (
            <div key={key}>
              <LinkComponent data={link} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default LinkContent;
