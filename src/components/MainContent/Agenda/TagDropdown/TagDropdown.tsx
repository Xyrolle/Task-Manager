import React, { useRef } from 'react';
import axios from 'axios';
import { useMutation, queryCache } from 'react-query';
import { useParams } from 'react-router-dom';
import './TagDropdown.css';
import { axiosConfig } from 'utils/axiosConfig';
import { setTagToAgenda, createTag } from '../queries';






const TagDropdown: React.FC<{ agendaId: number }> = ({ agendaId }) => {
  const tagNameInput = useRef<HTMLInputElement>(null);
  const { projectId } = useParams();
  const [mutate] = useMutation(createTag, {
    onMutate: (newData: any) => {
      queryCache.cancelQueries(['getAllAgendas', projectId]);
      queryCache.setQueryData(['getAllAgendas', projectId], (prev: any) => {
        const index = prev[0].data.findIndex((e: any) => e.id === agendaId);
        prev[0].data[index].tags.push({
          id: new Date(),
          title: newData.title
        });
        return prev;
      });
    },
    onError: (error) => console.log(error),
    onSettled: () => queryCache.invalidateQueries(['getAllAgendas', projectId])
  });

  return (
    <div className='tagLinkDropdownContainer'>
      <header className='tagLinkDropdownHeader'>
        <input
          ref={tagNameInput}
          type='text'
          autoComplete='off'
          placeholder='Tag Name'
        />
        <button
          onClick={async () => {
            await mutate({
              title: tagNameInput.current!.value,
              agendaId,
              projectId,
            });
          }}
        >
          Add
        </button>
      </header>
    </div>
  );
};

export default TagDropdown;
