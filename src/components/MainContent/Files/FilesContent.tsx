import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import './FilesContent.css';
import FileComponent from './FileComponent/FileComponent';
import { FileInterface } from './interfaces';
import { getFiles } from './queries';

const FilesContent: React.FC = () => {
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
            <div className="fileComponentWrap">
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
