import React, { useRef } from 'react';
import { useMutation, queryCache } from 'react-query';
import { CreateProjectInterface, ProjectsInterface, AddProjectModalProps } from 'pages/Projects/interfaces'
import { createProject } from 'pages/Projects/queries';

const AddProjectModal: React.FC<AddProjectModalProps> = ({ userId, closeModal }) => {
  const nameInput = useRef<HTMLInputElement>(null);
  const companyInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLTextAreaElement>(null);

  const [mutate] = useMutation(createProject, {
    onMutate: (newData: CreateProjectInterface) => {
      queryCache.cancelQueries(['getProjects', userId]);
      queryCache.setQueryData(['getProjects', userId.toString()], (prev: ProjectsInterface[] | undefined) => {
        prev && prev[0].data.push({
          id: new Date().getTime(),
          company: newData.company,
          description: newData.description,
          name: newData.name,
        });
        return prev;
      });
    },
    onError: (error) => console.log(error),
    onSettled: () => queryCache.invalidateQueries(['getProjects', userId.toString()])
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
            <button onClick={closeModal} type='button' className='closeBtn'>
              Close
            </button>
            <button
              onClick={async () => {
                await mutate({
                  name: nameInput.current!.value,
                  description: descriptionInput.current!.value,
                  company: companyInput.current!.value,
                });
                await closeModal();
              }}
              type='button'
              className='addList-btn btn'
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
      <div className='bg' onClick={closeModal} />
    </div>
  );
};
export default AddProjectModal;
