import axios from 'axios';
import { axiosConfig } from '../../../../utils/axiosConfig';

export const completeMilestone = async (id: string = '1') => {
	const res = await axios.delete(`http://46.101.172.171:8008/stage/item/${id}`, axiosConfig);
	return res.data;
};
