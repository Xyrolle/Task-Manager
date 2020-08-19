import React, { useContext, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import './Time.css';
import { useParams } from 'react-router';
import { AppContext } from '../../../context/AppContext';
import { TimesInterface, TimeGroupInterface } from './interfaces'
import TimeTable from './TimeTable/TimeTable';
import { getTimeGroups } from './utils';

const Time: React.FC = () => {
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
                data.map((page: TimesInterface) =>
                  page.data.map((timeGroup: TimeGroupInterface, key: number) => (
                    <TimeTable timeGroup={timeGroup} key={key} />
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
