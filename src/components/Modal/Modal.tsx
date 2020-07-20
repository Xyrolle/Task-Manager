import React, { useContext } from 'react';

import './Modal.css';
import { AppContext } from '../../context/AppContext';

const Modal: React.FC = () => {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }

  return (
    <div>
      <div className='modalContainer'>
        <form className='modalForm' id='modalForm'>
          <div className='upperModalContainer'>
            <h3>Add your team</h3>
            <span>Start collaborating today by adding your team</span>
          </div>
          <input
            placeholder='Email'
            //   onChange=
          ></input>
          <span>Add to a project</span>
          <select
            name='projectList'
            required
            //   onChange=
          >
            <option value='1'>Project 1</option>
            <option value='2'>Project 2</option>
            <option value='3'>Project 3</option>
          </select>
          <div className='modalBtns'>
            <button
              type='button'
              className='cancelModalButton'
              //   onClick=
            >
              Cancel
            </button>
            <button
              type='button'
              className='inviteModalButton'
              //   onClick=
            >
              Invite
            </button>
          </div>
        </form>
      </div>

      <div className='bg' onClick={ctx.closeModal} />
    </div>
  );
};

export default Modal;
