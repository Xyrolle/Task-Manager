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
        <form className='modalForm' id='modalForm' aria-label='some-form-name'>
          <h3>Add your team</h3>
          <label htmlFor='email'>
            Start collaborating today by adding your team
          </label>
          <input
            id='email'
            type='email'
            placeholder='Email'
            //   onChange=
          ></input>

          <label htmlFor='priorityList'>Add to a project</label>
          <select
            id='priorityList'
            name='priorityList'
            required
            //   onChange=
          >
            <option>Project 1</option>
            <option>Project 2</option>
            <option>Project 3</option>
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

      <div
        className='bg'
        onClick={ctx.closeModal}
        // role='background'
        data-testid='background'
      />
    </div>
  );
};

export default Modal;
