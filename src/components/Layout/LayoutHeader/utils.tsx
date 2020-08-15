import axios from 'axios';
import { axiosConfig } from '../../../utils/axiosConfig';

export const getProjectDetails = async (key: string, project_id: number) => {
	console.log('project id is', project_id);
	const res = await axios.get(`http://46.101.172.171:8008/project/${project_id}/`, axiosConfig);
	console.log(res);
	return res.data;
};
