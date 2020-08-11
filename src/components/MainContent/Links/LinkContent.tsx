import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import { getLinks } from './queries';
import './LinkContent.css';
import LinkComponent from './LinkComponent/LinkComponent';
import { AppContext } from 'context/AppContext';


const LinkContent: React.FC = () => {
  const { projectId } = useParams();
  // const { status, data, error } = useQuery(['getLinks', projectId], getLinks);
  const [isAddLinkOpen, setIsAddLinkOpen] = useState(false);
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore
  }: any = useInfiniteQuery(['getLinks', `${projectId}`],
    getLinks,
    {
      getFetchMore: (lastGroup: any, allPages: any) => {
        console.log('lastgroup', lastGroup)
        if (lastGroup.page_current + 1 > lastGroup.page_total) {
          return false;
        } else {
          return lastGroup.page_current + 1;
        }
      }
    })
  const loadMoreButtonRef = React.useRef<HTMLButtonElement | null>(null);
  return (
    <div>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
            <div className="linkComponentContainer">
              <div className="linkContentHeader">
                <h3 role="heading">Links</h3>
                <button
                  onClick={() => ctx.setOpenModal('linkModal')}
                  className="addLinkButton"
                >
                  + Add Link
                </button>
              </div>
              {data && data.map((data: any, key: number) => (
                data.data.map((link: any, key: number) => (
                  <div key={key}>
                    <LinkComponent data={link} />
                  </div>
                ))
              ))}
            </div>
          )
      }
      <div>
        <button
          ref={loadMoreButtonRef}
          onClick={() => fetchMore()}
          disabled={!canFetchMore || isFetchingMore}
        >
          {isFetchingMore
            ? 'Loading more...'
            : canFetchMore
              ? 'Load More'
              : 'Nothing more to load'}
        </button>
      </div>
      <div>
        {isFetching && !isFetchingMore ? 'Background Updating...' : null}
      </div>
    </div >
  );
};

export default LinkContent;
