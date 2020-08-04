import React, { useRef } from 'react';
import axios from 'axios';
import { useMutation, queryCache, useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import './TagDropdown.css';
import { axiosConfig } from '../../../../utils/axiosConfig'
import { link } from 'fs';
interface createTagInterface {
  title: string;
  linkId: number;
  projectId: string;
}
const setTagToLink = async (linkId: number, id: string) => {
  const response = await axios.get(`http://46.101.172.171:8008/tags/link_tag/set/${linkId}/${id}`,
    axiosConfig)
  return response.data
}

const createTag = async ({ title, linkId, projectId }: createTagInterface): Promise<void> => {
  const response = await axios.post('http://46.101.172.171:8008/tags/create', {
    title
  },
    axiosConfig
  )
  if (response.status === 200) {
    queryCache.setQueryData(['getLinks', '84'], (prev: any) => {
      const index = prev.data.findIndex((e: any) => e.id === linkId)

      prev.data[index].tags.push({
        id: response.data.id,
        title: response.data.title
      })
      return prev;
    });
    await setTagToLink(linkId, response.data.id);
  }
  return response.data
}


const TagDropdown: React.FC<{ linkId: number }> = ({ linkId }) => {
  const tagNameInput = useRef<HTMLInputElement>(null)
  const { projectId } = useParams();
  const [mutate] = useMutation(createTag, {
    onMutate: (newData: any) => {
      queryCache.cancelQueries(['getLinks', linkId]);
    },
    onError: (error: any, newData: any, rollback: any) => rollback(),
    // onSettled: () => queryCache.prefetchQuery('getProjects)
  })

  return (
    <div className='tagLinkDropdownContainer'>
      <header className='tagLinkDropdownHeader'>
        <input ref={tagNameInput} type='text' autoComplete='off' placeholder='Tag Name' />
        <button onClick={() => {
          mutate({
            title: tagNameInput.current!.value,
            linkId,
            projectId
          })
        }}>
          Add
        </button>
      </header>
      {/* <div className='folderDropdownContent' role='contentinfo'></div> */}
    </div>
  );
};

export default TagDropdown;