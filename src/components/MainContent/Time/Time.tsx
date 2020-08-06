import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import TimePoints from './TimePoints';
import AddTimeModal from './AddTimeModal/AddTimeModal';
import { useInfiniteQuery } from 'react-query'
import { axiosConfig } from '../../../utils/axiosConfig';
import axios from 'axios'
import './Time.css'
import { useParams } from 'react-router';

const Time: React.FC = () => {
    const [isAddTimeModalOpen, setIsAddTimeModalOpen] = useState(false)
    const [pageId, setPageId] = useState(1)
    const [hasMore, setHasMore] = useState(true);
    const { projectId } = useParams();

    const getTimeGroups = async (key: string, param1: number, next = 1) => {
        console.log('next', next)
        const response = await axios.get(`http://46.101.172.171:8008/times/time_groups/${projectId}/${next}`,
            await axiosConfig
        );
        return response.data;
    }

    const handleShowModal = () => setIsAddTimeModalOpen(false);
    const {
        status,
        data,
        error,
        isFetching,
        isFetchingMore,
        fetchMore,
        canFetchMore
    }: any = useInfiniteQuery(['getTimeGroups', 1],
        getTimeGroups,
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
                                page.data.map((timeGroup: any, key: any) => (
                                    <div key={key}>
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
