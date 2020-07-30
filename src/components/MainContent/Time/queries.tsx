
import axios from 'axios';
import { axiosConfig } from '../../../utils/axiosConfig';

export const getTimeGroups = async () => {
    const response = await axios.get('http://46.101.172.171:8008/times/time_groups/84/1',
        await axiosConfig
    );
    return response.data;
}
export const getTimePoints = async (string: string, timeGroupId: string) => {
    const response = await axios.get(`http://46.101.172.171:8008/times/time_groups/item/${timeGroupId}/time_points/1`,
        await axiosConfig
    );

    return response.data;
}