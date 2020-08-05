import React, { useRef, useContext } from 'react';
import axios from 'axios';
import { useMutation, queryCache, useQuery } from 'react-query';

import { axiosConfig } from 'utils/axiosConfig';
import { AppContext } from 'context/AppContext';

interface foo {
  name: string;
  description: string;
  company: string;
  userId: string;
}
const createProject = ({
  name,
  description,
  company,
  userId,
}: foo): Promise<void> => {
  return axios
    .post(
      'http://46.101.172.171:8008/project/project_create/',
      {
        name,
        description,
        company,
      },
      axiosConfig
    )
    .then(function (response) {
      queryCache.setQueryData(['getProjects', 5], (prev: any) => {
        prev.data.push({
          project: {
            id: response.data.id,
            company,
            description,
            name,
          },
        });
        return prev;
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

const AddProjectModal: React.FC<{ userId: number }> = ({ userId }) => {
  const nameInput = useRef<HTMLInputElement>(null);
  const companyInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLTextAreaElement>(null);

  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }

  const [mutate] = useMutation(createProject, {
    onMutate: (newData: any) => {
      queryCache.cancelQueries(['getProjects', userId.toString()]);
    },
    onError: (error: any, newData: any, rollback: any) => rollback(),
    // onSettled: () => queryCache.prefetchQuery('getProjects)
  });

  return (
    <div>
      <div className='modalContainer sectionFormLightbox'>
        <form className='addTaskListForm'>
          <div className='addTaskListHeader'>
            <h2 className='modal-title'>Add Task List</h2>
          </div>
          <div className='modal-body'>
            <div className='form-group'>
              <label>Give project a name *</label>
              <input ref={nameInput} type='text' className='form-control' />
            </div>
            <div className='form-group'>
              <label>Give project a company *</label>
              <input ref={companyInput} type='text' className='form-control' />
            </div>
            <div className='task-list-description'>
              <label>Give project a description*</label>
              <textarea
                ref={descriptionInput}
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
                await mutate({
                  name: nameInput.current!.value,
                  description: descriptionInput.current!.value,
                  company: companyInput.current!.value,
                  userId: userId.toString(),
                });
                await ctx.closeModal;
              }}
              type='button'
              className='addList-btn btn'
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
      <div className='bg' onClick={ctx.closeModal} />
    </div>
  );
};
export default AddProjectModal;
