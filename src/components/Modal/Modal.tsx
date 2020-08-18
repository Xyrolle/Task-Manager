import React from 'react';

import './Modal.css';
import { ProjectInterface } from 'pages/Projects/interfaces';

interface ModalProps {
  isUpgradeModalOpen: boolean;
  closeModal: () => void;
  data: [];
}

const Modal: React.FC<ModalProps> = ({
  isUpgradeModalOpen,
  closeModal,
  data,
}) => {
  const params = !isUpgradeModalOpen
    ? [
      'Add your team',
      'Start collaborating today by adding your team',
      'Invite',
    ]
    : ['Upgrade', 'Upgrade today for free', 'Go'];

  return (
    <div>
      <div className="modalContainer">
        <form className="modalForm" id="modalForm" aria-label="some-form-name">
          <h3>{params[0]}</h3>
          <label htmlFor="email">{params[1]}</label>
          {!isUpgradeModalOpen && (
            <div className="modalInputContainer">
              <input
                id="email"
                type="email"
                placeholder="Email"
              //   onChange=
              />

              <label htmlFor="priorityList" className="secondModalLabel">
                Add to a project
              </label>
              <select
                id="priorityList"
                name="priorityList"
                required
              //   onChange=
              >
                {data &&
                  data.map((project: ProjectInterface, key: number) => (
                    <option key={key}>{project.name}</option>
                  ))}
              </select>
            </div>
          )}

          <div className="modalBtns">
            <button
              type="button"
              className="cancelModalButton"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="inviteModalButton"
            //   onClick=
            >
              {params[2]}
            </button>
          </div>
        </form>
      </div>
      <div
        role="button"
        tabIndex={0}
        aria-label="Close modal"
        className="bg"
        onClick={closeModal}
        data-testid="background"
      />
    </div>
  );
};

export default Modal;
