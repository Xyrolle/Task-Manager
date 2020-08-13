import React, { useContext, useState } from 'react';
import TimePoints from './TimePoints';
import { useInfiniteQuery } from 'react-query';
import { axiosConfig } from '../../../utils/axiosConfig';
import axios from 'axios';
import './Time.css';
import { useParams } from 'react-router';
import { AppContext } from '../../../context/AppContext';
import { TimesInterface, TimeGroupInterface } from './interfaces'

const Time: React.FC = () => {
  const [pageId, setPageId] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { projectId } = useParams();

  const getTimeGroups = async (key: string, projectId: string, next = 1) => {
    console.log('next', next);
    const response = await axios.get(
      `http://46.101.172.171:8008/times/time_groups/${projectId}/${next}`,
      await axiosConfig
    );
    console.log(response)
    return response.data;
  };

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  }: any = useInfiniteQuery(['getTimeGroups', `${projectId}`], getTimeGroups, {
    getFetchMore: (lastGroup: TimesInterface) => {
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
                data.map((page: TimesInterface, ) =>
                  page.data.map((timeGroup: TimeGroupInterface, key: number) => (
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
