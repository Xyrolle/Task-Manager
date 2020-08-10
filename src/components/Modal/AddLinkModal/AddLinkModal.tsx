import React, { useRef, useContext } from 'react';
import axios from 'axios';
import { useMutation, queryCache } from 'react-query';
import { useParams } from 'react-router-dom';
import { axiosConfig } from 'utils/axiosConfig';
import { AppContext } from 'context/AppContext';

interface foo {
  projectId: string;
  userId: number;
  title: string;
  content: string;
}
const createTimePoints = async ({ projectId, userId, title, content }: foo) => {
  try {
    const response = await axios.post(
      `http://46.101.172.171:8008/link/`,
      {
        project: '137',
        user: userId,
        title,
        content,
        tags: [],
      },
      await axiosConfig
    );
    if (response.status === 200) {
      queryCache.setQueryData(['getLinks', projectId], (prev: any) => {
        prev.data.push({
          id: response.data.id,
          title,
          content,
          user: userId,
          tags: [],
        });
        return prev;
      });
    }
    return response.data;
  } catch (err) { }
};

const AddLinkModal: React.FC = () => {
  const ctx = useContext(AppContext);
  const titleInput = useRef<HTMLInputElement>(null);
  const contentInput = useRef<HTMLTextAreaElement>(null);
  const { projectId } = useParams();

  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }

  const [mutate] = useMutation(createTimePoints, {
    onMutate: (newData: any) => {
      queryCache.cancelQueries(['getLinks', projectId]);
      const snapshot = queryCache.getQueryData(['getLinks', projectId]);

      return () => queryCache.setQueryData('getLinks', snapshot);
    },
    onError: (error: any, newData: any, rollback: any) => rollback(),
    // onSettled: () => queryCache.prefetchQuery('getTimeGroups')
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
            <button onClick={ctx.closeModal} type='button' className='closeBtn'>
              Close
            </button>
            <button
              onClick={async () => {
                mutate({
                  projectId,
                  userId: ctx.userDetails.id,
                  title: titleInput.current!.value,
                  content: contentInput.current!.value,
                });
                await ctx.closeModal();
              }}
              type='button'
              className='addList-btn btn'
            >
              Add Link
            </button>
          </div>
        </form>
      </div>
      <div className='bg' onClick={ctx.closeModal} />
    </div>
  );
};
export default AddLinkModal;
