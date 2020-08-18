import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import AddFileModal from './AddFileModal/AddFileModal';
import './FilesContent.css';
import FileComponent from './FileComponent/FileComponent';
import { FileInterface } from './interfaces';
import { getFiles } from './queries';

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
            getFetchMore: (lastGroup: FileInterface) => {
                //unncomment when pagination will be implemented on back end
                // if (lastGroup.page_current + 1 > lastGroup.page_total) {
                //     return false;
                // } else {
                // return lastGroup.page_current + 1;
                // }
                return 0;
            }
        })

    const loadMoreButtonRef = React.useRef<HTMLButtonElement | null>(null);

    return (
        <div>

            {isAddFileOpen && <AddFileModal handleShowModal={handleShowModal} />}
            <div className="fileComponentWrap">
                <div className="fileContentHeader">
                    <h3 role="heading">Links</h3>
                    <button
                        onClick={() =>
                            setIsAddFileOpen(!isAddFileOpen)}
                        className="addFileButton"
                    >
                        + Add File
                </button>
                </div>
                {status === 'loading' ? (
                    <p>Loading...</p>
                ) : status === 'error' ? (
                    <span>Error: {error.message}</span>
                ) : (
                            <>
                                {data && data[0].map((file: FileInterface, key: number) => {
                                    return <FileComponent file={file} key={key} />
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
