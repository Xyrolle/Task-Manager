import React, { useRef, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useMutation, queryCache, useQuery } from 'react-query';
import { axiosConfig } from '../../../../utils/axiosConfig';
import { Link } from '../interfaces';
import { AppContext } from '../../../../context/AppContext';


interface foo {
    userId: number;
    linkId: number;
    projectId: string;
    title: string;
    content: string;
    tags: Array<{}>
}
const editLink = async ({ userId, linkId, projectId, title, content, tags }: foo) => {
    try {
        const response = await axios.patch(`http://46.101.172.171:8008/link/${projectId}/item/${linkId}`, {
            project: projectId,
            user: userId,
            title,
            content,
            tags
        },
            await axiosConfig
        );
        if (response.status === 200) {
            // queryCache.setQueryData(['getLinks', projectId], (prev: any) => {
            //     prev.data.push({
            //         id: response.data.id,
            //         // title,
            //         // content,
            //         // user: userId,
            //         tags: []
            //     });
            //     return prev
            // });)
        }
        console.log(response)
        return response.data;
    } catch (err) {
    }
}

const EditLinkModal: React.FC<{ handleShowModal(): void, data: Link }> = ({ handleShowModal, data }) => {
    const ctx = useContext(AppContext);
    const titleInput = useRef<HTMLInputElement>(null);
    const contentInput = useRef<HTMLTextAreaElement>(null);
    const { projectId } = useParams();
    if (!ctx) {
        throw new Error('You probably forgot to put <AppProvider>.');
    }

    const [mutate] = useMutation(editLink, {

        onMutate: (newData: any) => {
            queryCache.cancelQueries(['getLinks', projectId]);
            const snapshot = queryCache.getQueryData(['getLinks', projectId]);

            return () => queryCache.setQueryData('getLinks', snapshot);
        },
        onError: (error: any, newData: any, rollback: any) => rollback(),
        // onSettled: () => queryCache.prefetchQuery('getTimeGroups')
    })

    return (
        <div>
            {console.log(data)}
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
