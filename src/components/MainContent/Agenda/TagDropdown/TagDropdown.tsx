import React, { useRef } from 'react';
import axios from 'axios';
import { useMutation, queryCache } from 'react-query';
import { useParams } from 'react-router-dom';

import './TagDropdown.css';
import { axiosConfig } from 'utils/axiosConfig';

interface createTagInterface {
  title: string;
  agendaId: number;
  projectId: string;
}
const setTagToAgenda = async (agendaId: number, id: string) => {
  const response = await axios.get(
    `http://46.101.172.171:8008/tags/agenda_tag/set/${agendaId}/${id}`,
    axiosConfig
  );
  return response.data;
};

const createTag = async ({
  title,
  agendaId,
  projectId,
}: createTagInterface): Promise<void> => {
  const response = await axios.post(
    'http://46.101.172.171:8008/tags/create',
    {
      title,
    },
    axiosConfig
  );
  if (response.status === 200) {
    queryCache.setQueryData(['getAllAgendas', projectId], (prev: any) => {
      const index = prev.data.findIndex((e: any) => e.id === agendaId);

      prev.data[index].tags.push({
        id: response.data.id,
        title: response.data.title,
      });
      return prev;
    });
    await setTagToAgenda(agendaId, response.data.id);
  }
  return response.data;
};

const TagDropdown: React.FC<{ agendaId: number }> = ({ agendaId }) => {
  const tagNameInput = useRef<HTMLInputElement>(null);
  const { projectId } = useParams();
  const [mutate] = useMutation(createTag, {
    onMutate: (newData: any) => {
      queryCache.cancelQueries(['getAllAgendas', projectId]);
    },
    onError: (error: any, newData: any, rollback: any) => rollback(),
    // onSettled: () => queryCache.prefetchQuery('getProjects)
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
      {/* <div className='folderDropdownContent' role='contentinfo'></div> */}
    </div>
  );
};

export default TagDropdown;
