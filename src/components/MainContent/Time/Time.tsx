import React, { useContext, useState } from 'react';
import TimePoints from './TimePoints';
import { useInfiniteQuery } from 'react-query';
import { axiosConfig } from '../../../utils/axiosConfig';
import axios from 'axios';
import './Time.css';
import { useParams } from 'react-router';
import { AppContext } from '../../../context/AppContext';

import TimeTable from './TimeTable/TimeTable';

import {getTimeGroups} from './utils';

const Time: React.FC = () => {
  const [pageId, setPageId] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { projectId } = useParams();

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  }: any = useInfiniteQuery(['getTimeGroups', `${projectId}`], getTimeGroups, {
    getFetchMore: (lastGroup: any, allPages: any) => {
      if (lastGroup.page_current + 1 > lastGroup.page_total) {
        return false;
      } else {
        return lastGroup.page_current + 1;
      }
    },
  });

  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }

  const loadMoreButtonRef = React.useRef<HTMLButtonElement | null>(null);
  return (
    <div>
      <div className="timeContentHeader">
        <h3>Time</h3>
        <button
          onClick={() => ctx.setOpenModal('timeModal')}
          className='addProjectButton'
        >
          + Add Time
      </button>
      </div>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <span> {error.message.includes("500")
          ? <div>
            Times are empty.
        </div>
          : <span>{error.message}</span>} </span>
      ) : (
            <>
              {data &&
                data.map((page: any, key: any) =>
                  page.data.map((timeGroup: any, key: any) => (
                    <TimeTable timeGroup={timeGroup} />
                  ))
                )}
              <div>
                {console.log('hasmore', hasMore)}

                {console.log('canfetchmore', canFetchMore)}
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
            </>
          )}
    </div>
  );
};

export default Time;
