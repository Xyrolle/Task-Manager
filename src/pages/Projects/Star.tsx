import React from 'react';
import axios from 'axios';
import { useMutation, queryCache, useQuery } from 'react-query';
import { Icon } from '@iconify/react';
import starFilled from '@iconify/icons-ant-design/star-filled';
import { axiosConfig } from 'utils/axiosConfig';
import { getLikes, addLikeToProject } from './queries'

const Star: React.FC<{ userId: number, projectId: number }> = ({
  userId,
  projectId,
}) => {
  const { status, data, error } = useQuery('getLikes', getLikes);

  const [mutate] = useMutation(addLikeToProject, {
    onMutate: (newData: any) => {
      queryCache.cancelQueries('getLikes');
      const snapshot = queryCache.getQueryData('getLikes');
      queryCache.setQueryData('getLikes', (prev: any) => {
        prev.data.push({ project: newData });
        return prev;
      });
      return () => queryCache.setQueryData('getLikes', snapshot);
    },
    onError: (error: any, newData: any, rollback: any) => rollback(),
    // onSettled: () => queryCache.prefetchQuery(createProject)
  });

  return (
    <div onClick={() => mutate(projectId)}>
      {data &&
        data.data.some((element: any) => {
          return element.project == projectId;
        }) ? (
          <Icon icon={starFilled} color="gold" className="starIcon" />
        ) : (
          <Icon icon={starFilled} color="#ccc" className="starIcon" />
        )}
    </div>
  );
};
export default Star;
