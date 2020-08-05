import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, queryCache, useQuery } from 'react-query';

import './../Agenda.css';
import Agenda from '../AgendaComponent/Agenda';
import { getAgendaById } from '../queries';
import { updateAgendaContent } from '../queries';

const AgendaDetails: React.FC = () => {
  const { agendaID } = useParams();
  const { status, data, error } = useQuery(agendaID, getAgendaById);
  const [onEditContent, setonEditContent] = useState(false);
  const agendaContentTextArea = useRef<HTMLTextAreaElement>(null);
  const [mutate] = useMutation(updateAgendaContent, {
    onMutate: (newData: any) => {
      queryCache.cancelQueries(agendaID);
      const snapshot = queryCache.getQueryData(agendaID);
      queryCache.setQueryData(agendaID, (prev: any) => {
        return {
          content: newData.content,
          tags: prev.tags,
          title: prev.title,
        };
      });
      return () => queryCache.setQueryData(agendaID, snapshot);
    },
    onError: (error: any, newData: any, rollback: any) => rollback(),
    onSettled: () => queryCache.prefetchQuery(agendaID),
  });

  if (status === 'loading') return <div>loading</div>;
  if (status === 'error') return <div>error!{JSON.stringify(error)}</div>;

  return (
    <div>
      <button
        className='editAgendaButton'
        onClick={() => setonEditContent(true)}
      >
        Edit content
      </button>
      <Agenda agenda={data} style={'notebookDetails'} />
      {!onEditContent && <p>{data.content}</p>}
      <p>{data.id}</p>
      {onEditContent && (
        <div className='editContentWrap'>
          <textarea ref={agendaContentTextArea} className='contentTextArea'>
            {data.content}
          </textarea>
          <div className='textAreaButtonsWrap'>
            <button
              className='publishAgendaButton'
              onClick={async () => {
                mutate({
                  id: data.id,
                  title: data.title,
                  content: agendaContentTextArea.current!.value,
                });
                await setonEditContent(false);
              }}
            >
              Publish as New Version
            </button>
            <span> or </span>
            <button
              className='cancelButton'
              onClick={() => setonEditContent(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendaDetails;
