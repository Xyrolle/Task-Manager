import React, { useRef } from 'react';
import axios from 'axios';
import { useMutation, queryCache } from 'react-query';
import useHook from '../useHook'
import { axiosConfig } from 'utils/axiosConfig';

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

    })
    .catch(function (error) {
      console.log(error);
    });
};

interface AddProjectModalProps {
  userId: number;
  closeModal: () => void;
}
interface PrevDataAddProject {
  data: {
    project: {
      company: string;
      description: string;
      id: string;
      name: string;
    }
  }[]
  objects_per_page: number;
  objects_total: number;
  page_current: number;
  page_total: number;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ userId, closeModal }) => {
  const nameInput = useRef<HTMLInputElement>(null);
  const companyInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLTextAreaElement>(null);

  const [mutate] = useMutation(createProject, {
    onMutate: (newData: any) => {
      queryCache.cancelQueries(['getProjects', userId]);
      queryCache.setQueryData(['getProjects', userId.toString()], (prev: PrevDataAddProject[] | undefined) => {
        console.log('prev', prev)
        prev && prev[0].data.push({
          project: {
            id: new Date().toISOString(),
            company: newData.company,
            description: newData.description,
            name: newData.name,
          },
        });
        return prev;
      });
    },
    onError: (error: any, newData: any, rollback: any) => rollback(),
    onSettled: () => queryCache.invalidateQueries(['getProjects', userId.toString()])
  });

  let newData: any = { company: 'ebs', description: 'foo', name: 'dima' };
  let prev: any = [{ data: [] }];

  prev[0].data.push({ //return data
    project: {
      id: new Date(),
      company: newData.company,
      description: newData.description,
      name: newData.name,
    },
  })
  const { mutateCustom }: any = useHook();
  const handleMutate = () => {
    mutateCustom(
      ['getProjects', userId], //key
      {
        name: nameInput.current!.value, //newData
        description: descriptionInput.current!.value,
        company: companyInput.current!.value,
        userId: userId.toString(),
      },
      prev
    )
  }
  //custom hook WIP
  // useHook(
  //   ['getProjects', userId],
  //   {
  //     name: nameInput.current!.value,
  //     description: descriptionInput.current!.value,
  //     company: companyInput.current!.value,
  //     userId: userId.toString(),
  //   },
  //   prev
  // )


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
                  userId: userId.toString(),
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
