import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

import TaskList from '../TaskList/TaskList';

const TaskLists = () => {
	const { data: lists } = useQuery('task-lists', fetchTaskLists);

	console.log(lists);

	if (!lists) return <h5>loading</h5>;

	return <div>{lists.map((taskList: any) => <TaskList name={taskList.name} id={taskList.id} />)}</div>;
};

export default TaskLists;

const fetchTaskLists = async () => {
	try {
		const res = await axios.get('http://46.101.172.171:8008/project/task_list_view_by_project/10/1/', {
			headers:
				{
					Authorization: `Basic YWRtaW46cXdlMTIz`
				}
		});

		console.log(res.data);
		return res.data;
	} catch (err) {
		console.error('error while fetching task lists', err);
	}
};
