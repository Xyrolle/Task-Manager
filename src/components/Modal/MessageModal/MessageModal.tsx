import React, { useState } from 'react';
import axios from 'axios';
import { useMutation, queryCache } from 'react-query';
import { v4 as uuidv4 } from 'uuid';

import { axiosConfig } from 'utils/axiosConfig';
import './MessageModal.css';

interface MessageModalProps {
  closeModal: () => void;
  data: [];
}

// interface Foo {
//   title: string;
//   content: string;
//   projectId: string;
//   userId: string;
// }

const MessageModal: React.FC<MessageModalProps> = ({ closeModal, data }) => {
  const [messageTitle, setMessageTitle] = useState('');
  console.log('messageTitle', messageTitle);
  const [messageContent, setMessageContent] = useState('');
  console.log('messageContent', messageContent);
  const [projectId, setProjectId] = useState(123);
  console.log('projectId', projectId);

  const createMessage = () => {
    axios
      .post(
        'http://46.101.172.171:8008/message/message_create/',
        {
          id: uuidv4(),
          title: messageTitle,
          content: messageContent,
          date: new Date(),
          project: 137,
          consignee: 1,
        },
        axiosConfig
      )
      .then(res => console.log(res))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <div className="modalContainer">
        <form className="modalForm" id="modalForm" aria-label="some-form-name">
          <label htmlFor="title">Add title</label>
          <div className="modalInputContainer">
            <input
              id="title"
              placeholder="Title"
              maxLength={100}
              onChange={e => setMessageTitle(e.target.value)}
            />
            <label htmlFor="title">Message Content</label>
            <textarea
              id="content"
              maxLength={200}
              onChange={e => setMessageContent(e.target.value)}
            />

            <label htmlFor="priorityList" className="secondModalLabel">
              Choose project
            </label>
            <select id="priorityList" name="priorityList" required>
              {data &&
                data.map(({ project }: any, key: number) => (
                  <option key={project.id}>{project.name}</option>
                ))}
            </select>
          </div>
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
              className="addModalButton"
              onClick={async () => {
                await createMessage();
                closeModal();
              }}
            >
              Add message
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

export default MessageModal;
