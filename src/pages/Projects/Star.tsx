import React, { useEffect } from 'react';
import axios from 'axios';
import { useMutation, queryCache, useQuery } from 'react-query';
import { axiosConfig } from '../../utils/axiosConfig'
import star from '../../assets/star.svg'
import { Icon, InlineIcon } from '@iconify/react';
import starFilled from '@iconify/icons-ant-design/star-filled';

const getLikes = async () => {
    const response = await axios.get(`http://46.101.172.171:8008/project/liked_projects_by_users/5/1/`,
        axiosConfig
    );
    return response.data
}

const addLikeToProject = async (project: number) => {
    await axios.post(`http://46.101.172.171:8008/project/liked_projects_add/`,
        {
            project,
        },
        axiosConfig
    );
}

const Star: React.FC<{ userId: number, projectId: number }> = ({ userId, projectId }) => {
    const { status, data, error } = useQuery('getLikes', getLikes);

    const [mutate] = useMutation(addLikeToProject, {
        onMutate: (newData: any) => {
            queryCache.cancelQueries('getLikes');
            const snapshot = queryCache.getQueryData('getLikes');
            queryCache.setQueryData('getLikes', (prev: any) => {
                return [...prev, { project: newData }]
            });
            return () => queryCache.setQueryData('getLikes', snapshot);
        },
        onError: (error: any, newData: any, rollback: any) => rollback(),
        // onSettled: () => queryCache.prefetchQuery(createProject)
    })

    return (
        <div onClick={() => mutate(projectId)} >
            {data && data.some((element: any) => {
                return element.project == projectId
            }) ? <Icon icon={starFilled} color="gold" className="starIcon" />
                :
                <Icon icon={starFilled} color="#ccc" className="starIcon" />
            }
        </div>
    );
};
export default Star;
