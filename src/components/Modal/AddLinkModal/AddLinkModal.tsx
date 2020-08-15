import React, { useRef, useContext } from 'react';
import axios from 'axios';
import { useMutation, queryCache } from 'react-query';
import { useParams } from 'react-router-dom';
import { axiosConfig } from 'utils/axiosConfig';
import { AppContext } from 'context/AppContext';
import { AddLinkInterface, LinksInterface } from 'components/MainContent/Links/interfaces'

const addLink = async ({ projectId, userId, title, content }: AddLinkInterface) => {
  try {
    const response = await axios.post(
      `http://46.101.172.171:8008/link/`,
      {
        project: projectId,
        user: userId,
        title,
        content,
        tags: [],
      },
      await axiosConfig
    );
    if (response.status === 200) {

    }
    return response.data;
  } catch (err) { }
};

interface AddLinkModalProps {
  userDetails: any;
  closeModal: () => void;
}

const AddLinkModal: React.FC<AddLinkModalProps> = ({ userDetails, closeModal }) => {
  const titleInput = useRef<HTMLInputElement>(null);
  const contentInput = useRef<HTMLTextAreaElement>(null);
  const { projectId } = useParams();
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }

  const [mutate] = useMutation(addLink, {
    onMutate: (newData: AddLinkInterface) => {
      queryCache.cancelQueries(['getLinks', projectId]);
      const snapshot = queryCache.getQueryData(['getLinks', newData.projectId]);
      queryCache.setQueryData(['getLinks', newData.projectId], (prev: LinksInterface[] | undefined) => {
        prev && prev[0].data.push({
          id: new Date().getTime(),
          title: newData.title,
          content: newData.content,
          user: newData.userId,
          tags: [],
          comments: [],
          date: new Date().toISOString(),
          project: +newData.projectId
        });
        return prev;
      });
      return () => queryCache.setQueryData('getLinks', snapshot);
    },
    onError: (error: any, newData: any, rollback: any) => rollback(),
    onSettled: () => queryCache.invalidateQueries(['getLinks', ctx.projectId])
  });

  return (
    <div>
      <div className='modalContainer sectionFormLightbox'>
        <form className='addTaskListForm'>
          <div className='addTaskListHeader'>
            <h2 className='modal-title'>Add Link</h2>
          </div>
          <div className='modal-body'>
            <div className='form-group'>
              <label>Give link a path *</label>
              <input ref={titleInput} type='text' className='form-control' />
            </div>
            <div className='task-list-description'>
              <label>Give content</label>
              <textarea
                ref={contentInput}
                rows={30}
                cols={20}
                className='description-input'
              />
            </div>
          </div>
          <div className='modal-footer'>
            <button onClick={closeModal} type='button' className='closeBtn'>
              Close
            </button>
            <button
              onClick={async () => {
                mutate({
                  projectId: ctx.projectId,
                  userId: userDetails.id,
                  title: titleInput.current!.value,
                  content: contentInput.current!.value,
                });
                await closeModal();
              }}
              type='button'
              className='addList-btn btn'
            >
              Add Link
            </button>
          </div>
        </form>
      </div>
      <div className='bg' onClick={closeModal} />
    </div>
  );
};
export default AddLinkModal;
