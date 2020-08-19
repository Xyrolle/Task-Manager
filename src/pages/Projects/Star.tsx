import React from 'react';
import { useMutation, queryCache, useQuery } from 'react-query';
import { Icon } from '@iconify/react';
import starFilled from '@iconify/icons-ant-design/star-filled';
import { getLikes, addLikeToProject } from './queries'

const Star: React.FC<{ userId: number, projectId: number }> = ({
  userId,
  projectId,
}) => {
  const { status, data, error } = useQuery('getLikes', getLikes);

  const [mutate] = useMutation(addLikeToProject, {
    onMutate: (newData: number) => {
      queryCache.cancelQueries('getLikes');
      queryCache.setQueryData('getLikes', (prev: any) => {
        prev.data.push({ project: newData });
        return prev;
      });
    },
    onError: (error) => console.log(error),
    onSettled: () => queryCache.invalidateQueries('getLikes')
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
