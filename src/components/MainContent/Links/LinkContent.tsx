import React from 'react';
import { useParams } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import { getLinks } from './queries';
import './LinkContent.css';
import LinkComponent from './LinkComponent/LinkComponent';
import { LinksInterface, LinkInterface } from './interfaces'

const LinkContent: React.FC = () => {
  const { projectId } = useParams();

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
      getFetchMore: (lastGroup: LinksInterface) => {
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
              {data && data.map((data: LinksInterface) => (
                data.data.map((link: LinkInterface, key: number) => (
                  <div key={key} >
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
