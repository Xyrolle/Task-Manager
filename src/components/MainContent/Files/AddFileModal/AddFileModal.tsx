import React, { useState, useRef, useContext } from 'react';
import { useMutation, queryCache } from 'react-query';
import { useParams } from 'react-router'
import { AppContext } from '../../../../context/AppContext';
import { FileUploadInterface } from '../interfaces'
import { uploadFile } from '../queries';

const AddFileModal: React.FC<{ handleShowModal(): void }> = ({ handleShowModal }) => {
    const [fileInput, setFileInput] = useState()
    const ctx = useContext(AppContext);
    const titleInput = useRef<HTMLInputElement>(null);

    const { projectId } = useParams();
    if (!ctx) {
        throw new Error('You probably forgot to put <AppProvider>.');
    }

    const [mutate] = useMutation(uploadFile, {
        onMutate: (newData: FileUploadInterface) => {
            queryCache.cancelQueries('getFiles', projectId);
            const snapshot = queryCache.getQueryData(['getFiles', projectId]);
            queryCache.setQueryData(['getFiles', projectId], (prev: FileUploadInterface[][] | undefined) => {
                prev && prev[0].push(newData)
                return prev;
            });
            return () => queryCache.setQueryData(['getFiles', projectId], snapshot);
        },
        onError: (error: any, newData: any, rollback: any) => rollback(),
        onSettled: () => queryCache.invalidateQueries(['getFiles', projectId])
    })

    return (
        <div>
            <div className='modalContainer sectionFormLightbox'>
                <form className='addTaskListForm'>
                    <div className='addTaskListHeader'>
                        <h2 className='modal-title'>Add File</h2>
                    </div>
                    <div className='modal-body'>
                        <div className='form-group'>
                            <label>Give file a title</label>
                            <input ref={titleInput} type='text' className='form-control' />
                        </div>
                        <div className='task-list-description'>
                            <label>
                                Select file
                            </label>
                            <input type="file" onChange={(e: any) => {
                                // console.log()
                                setFileInput(e.target.files[0])
                            }} />
                        </div>

                    </div>
                    <div className='modal-footer'>
                        <button
                            onClick={() => handleShowModal()}
                            type='button'
                            className='closeBtn' >
                            Close
						</button>
                        <button
                            disabled={!fileInput}
                            onClick={async () => {
                                mutate({
                                    projectId,
                                    title: titleInput.current!.value,
                                    upload: fileInput
                                })
                                // console.log(fileInput)
                                await handleShowModal()
                            }}
                            type='button'
                            className='addList-btn btn'>
                            Add File
						</button>
                    </div>
                </form>
            </div>
            <div className='bg' />
        </div>
    );
};
export default AddFileModal;
