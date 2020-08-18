import React, { useRef, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useMutation, queryCache, useQuery } from 'react-query';
import { axiosConfig } from '../../../../utils/axiosConfig';
import { Link, EditLinkInterface, LinksInterface, LinkInterface } from '../interfaces';
import { AppContext } from '../../../../context/AppContext';
import { editLink } from '../queries'


const EditLinkModal: React.FC<{ handleShowModal(): void, data: Link }> = ({ handleShowModal, data }) => {
    const ctx = useContext(AppContext);
    const titleInput = useRef<HTMLInputElement>(null);
    const contentInput = useRef<HTMLTextAreaElement>(null);
    const { projectId } = useParams();
    if (!ctx) {
        throw new Error('You probably forgot to put <AppProvider>.');
    }

    const [mutate] = useMutation(editLink, {
        onMutate: (newData: EditLinkInterface) => {
            queryCache.cancelQueries(['getLinks', projectId]);
            queryCache.setQueryData(['getLinks', projectId], (prev: LinksInterface[] | undefined) => {
                prev && prev[0].data.find((link: LinkInterface) => {
                    if (link.id === newData.linkId) {
                        link.content = newData.content
                        link.title = newData.title
                        link.date = new Date().toISOString();
                    }
                })
                return prev
            });
        },
        onError: (error, newData, rollback) => console.log(error),
        onSettled: () => queryCache.invalidateQueries(['getLinks', projectId])
    })

    return (
        <div>
            <div className='modalContainer sectionFormLightbox'>
                <form className='addTaskListForm'>
                    <div className='addTaskListHeader'>
                        <h2 className='modal-title'>Edit Link</h2>
                    </div>
                    <div className='modal-body'>
                        <div className='form-group'>
                            <label>Give link a path *</label>
                            <input defaultValue={data.title} ref={titleInput} type='text' className='form-control' />
                        </div>
                        <div className='task-list-description'>
                            <label>
                                Give content
                            </label>
                            <textarea defaultValue={data.content} ref={contentInput} rows={30} cols={20} className='description-input' />
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
                            onClick={async () => {
                                mutate({
                                    userId: ctx.userDetails.id,
                                    linkId: data.id,
                                    projectId,
                                    title: titleInput.current!.value,
                                    content: contentInput.current!.value,
                                    tags: data.tags
                                })
                                await handleShowModal()
                            }}
                            type='button'
                            className='addList-btn btn'>
                            Edit Link
						</button>
                    </div>
                </form>
            </div>
            <div className='bg' />
        </div>
    );
};
export default EditLinkModal;
