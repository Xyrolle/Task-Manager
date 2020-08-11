import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import { getAgendasByProjectId } from './queries';
import './Agenda.css';
import Agenda from './AgendaComponent/Agenda';

const AgendaContent: React.FC = ({ }) => {
  const { projectId } = useParams();

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore
  }: any = useInfiniteQuery(['getAllAgendas', `${projectId}`],
    getAgendasByProjectId,
    {
      getFetchMore: (lastGroup: any, allPages: any) => {
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
      <div className="agendaHeader">
        <h3 role="heading">Notebooks</h3>
        <Link to={`agenda/create`} data-testid="createAgenda">
          <button className="agendaHeaderButton">
            Add a notebook
          </button>
        </Link>
      </div>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
            <>
              {data && data.map((data: any, key: number) => (
                data.data.map((agenda: any, key: number) => (
                  <div key={key}>
                    <Agenda agenda={agenda} />
                  </div>
                ))
              ))}
            </>
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
    </div>
  );
};
export default AgendaContent;
