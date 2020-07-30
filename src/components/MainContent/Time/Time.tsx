import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
// import { getTimeGroups } from './queries';
import TimePoints from './TimePoints';
import AddTimeModal from './AddTimeModal/AddTimeModal';
import { useInfiniteQuery } from 'react-query'
import { axiosConfig } from '../../../utils/axiosConfig';
import axios from 'axios'
import './Time.css'

const Time: React.FC = () => {
    const [isAddTimeModalOpen, setIsAddTimeModalOpen] = useState(false)
    const [pageId, setPageId] = useState(1)
    const [hasMore, setHasMore] = useState(true);

    const getTimeGroups = async () => {
        try {
            const response = await axios.get(`http://46.101.172.171:8008/times/time_groups/84/${pageId}`,
                await axiosConfig
            );
            return response.data;
        } catch (err) {
            console.log('Error: no more task lists to load');
            await setHasMore(false);
        }
    }

    const handleShowModal = () => setIsAddTimeModalOpen(false);
    const {
        status,
        data,
        error,
        isFetching,
        isFetchingMore,
        fetchMore,
    }: any = useInfiniteQuery('getTimeGroups'
        ,
        getTimeGroups,
        {
            getFetchMore: () => { setPageId((pageId) => pageId + 1) }
        })

    const loadMoreButtonRef = React.useRef<HTMLButtonElement | null>(null);
    return (
        <div >
            <button
                onClick={() =>
                    setIsAddTimeModalOpen(!isAddTimeModalOpen)}
                className="addProjectButton"
            >
                + Add Time
            </button>

            {isAddTimeModalOpen && <AddTimeModal handleShowModal={handleShowModal} />}
            {status === 'loading' ? (
                <p>Loading...</p>
            ) : status === 'error' ? (
                <span>Error: {error.message}</span>
            ) : (
                        <>
                            {data && data.map((page: any, key: any) => (
                                page.map((timeGroup: any, key: any) => (
                                    <div>
                                        <div className="tableHeaderWrap" >
                                            <div className="tableHeader">
                                                <div className="timeDescription">
                                                    <p>Description</p>
                                                </div>
                                                <div className="timeTaskList">
                                                    <p>Task list</p>
                                                </div>
                                                <div className="timeStartDate">
                                                    <p>Start</p>
                                                </div>
                                                <div className="timeEndDate">
                                                    <p>End</p>
                                                </div>
                                            </div >
                                        </div>
                                        <TimePoints id={timeGroup.id} />
                                    </div>
                                ))
                            ))}
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
