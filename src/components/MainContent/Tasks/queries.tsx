import axios from 'axios';
import { axiosConfig } from '../../../utils/axiosConfig';

export const fetchTaskLists = async (key: string, project: string, page_id: number = 1) => {
	const res = await axios.get(
		`http://46.101.172.171:8008/project/task_list_view_by_project/${project}/${page_id}/`,
		axiosConfig
	);

	return res.data;
};

export const fetchTasks = async (id: number, page_id: number = 1) => {
	const res = await axios.get(`http://46.101.172.171:8008/tasks/task_list/${id}/${page_id}`, axiosConfig);
	return res.data;
};

export const fetchTaskDetails = async (key: string, task_id: string) => {
	console.log(task_id);
	const res = await axios.get(`http://46.101.172.171:8008/tasks/item/${task_id}`, axiosConfig);
	return res.data;
};

export const fetchComments = async (key: string, task_id: any, page_id: number = 1) => {
	const res = await axios.get(`http://46.101.172.171:8008/comment/from_task/${task_id}/${page_id}`, axiosConfig);
	return res.data;
};
