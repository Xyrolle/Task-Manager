import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import TimePoints from './TimePoints';
import { useInfiniteQuery } from 'react-query';
import { axiosConfig } from '../../../utils/axiosConfig';
import axios from 'axios';
import './Time.css';
import { useParams } from 'react-router';
import createMixins from '@material-ui/core/styles/createMixins';
import { AppContext } from '../../../context/AppContext';

const Time: React.FC = () => {
  const [pageId, setPageId] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { projectId } = useParams();

  const getTimeGroups = async () => {
    const response = await axios.get(
      `http://46.101.172.171:8008/times/time_groups/${projectId}/${pageId}`,
      await axiosConfig
    );
    return response.data;
  };

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
  }: any = useInfiniteQuery('getTimeGroups', getTimeGroups, {
    getFetchMore: () => pageId,
  });

  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }

  const loadMoreButtonRef = React.useRef<HTMLButtonElement | null>(null);
  return (
    <div>
      <button
        onClick={() => ctx.setOpenModal('timeModal')}
        className='addProjectButton'
      >
        + Add Time
      </button>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          {data &&
            data.map((page: any, key: any) =>
              page.data.map((timeGroup: any, key: any) => (
                <div key={key}>
                  <div className='tableHeaderWrap'>
                    <div className='tableHeader'>
                      <div className='timeDescription'>
                        <p>Description</p>
                      </div>
                      <div className='timeTaskList'>
                        <p>Task list</p>
                      </div>
                      <div className='timeStartDate'>
                        <p>Start</p>
                      </div>
                      <div className='timeEndDate'>
                        <p>End</p>
                      </div>
                    </div>
                  </div>
                  <TimePoints id={timeGroup.id} />
                </div>
              ))
            )}
          <div>
            {console.log('hasmore', hasMore)}

            <button
              ref={loadMoreButtonRef}
              onClick={() => fetchMore()}
              disabled={!hasMore || isFetchingMore}
            >
              {isFetchingMore
                ? 'Loading more...'
                : hasMore
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
