import React, { useContext } from 'react';

import './Modal.css';
import { AppContext } from 'context/AppContext';

interface ModalProps {
  isUpgradeModalOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ isUpgradeModalOpen }) => {
  const ctx = useContext(AppContext);

  const params = !isUpgradeModalOpen
    ? [
        'Add your team',
        'Start collaborating today by adding your team',
        'Invite',
      ]
    : ['Upgrade', 'Upgrade today for free', 'Go'];

  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }
  return (
    <div>
      <div className='modalContainer'>
        <form className='modalForm' id='modalForm' aria-label='some-form-name'>
          <h3>{params[0]}</h3>
          <label htmlFor='email'>{params[1]}</label>
          {!isUpgradeModalOpen && (
            <div className='modalInputContainer'>
              <input
                id='email'
                type='email'
                placeholder='Email'
                //   onChange=
              ></input>

              <label htmlFor='priorityList' className='secondModalLabel'>
                Add to a project
              </label>
              <select
                id='priorityList'
                name='priorityList'
                required
                //   onChange=
              >
                {/* will use code below when we rearrange get data from API to query files. */}
                {/* {ctx.data &&
                  ctx.data.map(({ project }: any, key: number) => (
                    <option key={project.id}>{project.name}</option>
                  ))} */}
              </select>
            </div>
          )}

          <div className='modalBtns'>
            <button
              type='button'
              className='cancelModalButton'
              onClick={ctx.closeModal}
            >
              Cancel
            </button>
            <button
              type='button'
              className='inviteModalButton'
              //   onClick=
            >
              {params[2]}
            </button>
          </div>
        </form>
      </div>

      <div className='bg' onClick={ctx.closeModal} data-testid='background' />
    </div>
  );
};

export default Modal;
