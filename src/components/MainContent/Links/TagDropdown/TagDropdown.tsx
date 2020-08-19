import React, { useRef } from 'react';
import { useMutation, queryCache, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import './TagDropdown.css';
import { CreateTagInterface, LinksInterface, LinkInterface } from '../interfaces';
import { createTag } from '../queries';



const TagDropdown: React.FC<{ linkId: number }> = ({ linkId }) => {
  const tagNameInput = useRef<HTMLInputElement>(null)
  const { projectId } = useParams();

  const [mutate] = useMutation(createTag, {
    onMutate: (newData: CreateTagInterface) => {
      queryCache.cancelQueries(['getLinks', projectId]);
      const previousData = queryCache.getQueryData((['getLinks', projectId]));
      queryCache.setQueryData(['getLinks', projectId], (prev: LinksInterface[] | undefined) => {
        console.log('prev ', prev && prev)
        const index: number | undefined = prev && prev[0].data.findIndex((e: LinkInterface) => e.id === newData.linkId)
        prev && index && prev[0].data[index].tags.push({
          id: new Date().getTime(),
          title: newData.title
        })
        return prev;
      });
      // return () => queryCache.setQueryData('getLinks', prz)
    },
    onError: (error, newData, rollback) => console.log(error),
    onSettled: () => queryCache.invalidateQueries(['getLinks', projectId])
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
    </div>
  );
};

export default TagDropdown;