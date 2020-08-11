import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useMutation, queryCache } from 'react-query';

import { AppContext } from 'context/AppContext';
import { axiosConfig } from 'utils/axiosConfig';
import './Messages.css';

// const deleteMessage = ({ id }: string) => {
//   axios.delete(
//     `http://46.101.172.171:8008/message/message_delete/${id}`,
//     axiosConfig
//   );
// };

const Messages: React.FC = () => {
  //   const [allMessages, setAllMessages] = useState();
  const ctx = useContext(AppContext);

  //   const getMessages = async (consignee: string, page_id: string) => {
  //     const response = await axios.get(
  //       `http://46.101.172.171:8008/message/message_display_by_consignee/${consignee}/${page_id}`,
  //       axiosConfig
  //     );
  //     setAllMessages(response.data);
  //   };

  if (!ctx) {
    throw new Error('You probably forgot to put <AppProvider>.');
  }
  const { setOpenModal } = ctx;

  //   const [mutate] = useMutation(createMessage, {
  //     onMutate: (newData: any) => {
  //       queryCache.cancelQueries(['getMessages', userId.toString()]);
  //     },
  //   });

  return (
    <div className="messagesContainer">
      {/* <button type="button" onClick={() => getMessages('1', '1')}>
        See messages
      </button>
      {allMessages} */}
      <button type="button" onClick={() => setOpenModal('messageModal')}>
        Add message
      </button>
    </div>
  );
};

export default Messages;
