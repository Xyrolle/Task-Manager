import React from 'react';
import { useParams } from 'react-router-dom';

import Task from '../Task/Task';

const TaskList = () => {
	let { projectID } = useParams();
	return (
		<div>
			<h1>Task List</h1>
			<Task />
			<Task />
		</div>
	);
};

export default TaskList;
