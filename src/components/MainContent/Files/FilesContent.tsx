import React, { useState } from 'react';
import axios from 'axios';
import { axiosConfig } from '../../../utils/axiosConfig'
import { useParams } from 'react-router-dom'
import { useQuery, useInfiniteQuery } from 'react-query';
import AddFileModal from './AddFileModal/AddFileModal';
import './FilesContent.css'
import FileComponent from './FileComponent/FileComponent'

const getFiles = async (key: string, projectId: string, page = 1) => {
    const response = await axios.get(`http://46.101.172.171:8008/files/files_item_view_by_project/${projectId}/${page}`,
        axiosConfig
    );
    return response.data;
}
interface foo {
    data: Array<object>;
}

const FilesContent: React.FC = () => {
    const [isAddFileOpen, setIsAddFileOpen] = useState(false);
    const handleShowModal = () => setIsAddFileOpen(false);
    const { projectId } = useParams();
    const {
        status,
        data,
        error,
        isFetching,
        isFetchingMore,
        fetchMore,
        canFetchMore
    }: any = useInfiniteQuery(['getFiles', `${projectId}`],
        getFiles,
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
                    setIsAddFileOpen(!isAddFileOpen)}
                className="addFileButton"
            >
                + Add File
            </button>
            {isAddFileOpen && <AddFileModal handleShowModal={handleShowModal} />}
            <div className="fileComponentWrap">
                {status === 'loading' ? (
                    <p>Loading...</p>
                ) : status === 'error' ? (
                    <span>Error: {error.message}</span>
                ) : (
                            <>
                                {data && data[0].map((file: any, key: any) => {
                                    return <div key={key}>
                                        <FileComponent file={file} />
                                    </div>
                                })}
                            </>
                        )}
            </div>
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

export default FilesContent;
