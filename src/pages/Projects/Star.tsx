import React, { useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { axiosConfig } from '../../utils/axiosConfig'

const getLikes = async () => {
    const response = await axios.get(`http://46.101.172.171:8008/project/liked_projects_by_users/5/1/`,
        axiosConfig
    );
    // console.log(response)
    return response.data
}


const Star: React.FC<{ userId: number, projectId: number }> = ({ userId, projectId }) => {
    const { status, data, error } = useQuery('getLikes', getLikes);


    useEffect(() => {
        // return response.data;
    }, [])

    return (
        <div onClick={getLikes}>
            {/* {console.log(data)} */}
            {data && data.some((element: any) => {
                console.log('element', element.project, projectId)
                return element.project == projectId
            }) ? <div>starred</div> : <div>non-starred</div>}
            as
        </div>
    );
};
export default Star;
