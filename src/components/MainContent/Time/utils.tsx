import axios from 'axios';

import { axiosConfig } from '../../../utils/axiosConfig';

export const getTimeGroups = async (key: string, projectId: string, next = 1) => {
	console.log('next', next);
	const response = await axios.get(`http://46.101.172.171:8008/times/time_groups/${projectId}/${next}`, axiosConfig);
	console.log(response);
	return response.data;
};
