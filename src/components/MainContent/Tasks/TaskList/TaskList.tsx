import React, { Fragment, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import arrow from '../../../../assets/arrow.svg';

import Task from '../Task/Task';
import TaskLists from '../TaskLists/TaskLists';

import './TaksList.css';

const TaskList = ({ name }: any) => {
	const [ isOpen, setIsOpen ] = useState(false);
	const { data: tasks } = useQuery('tasks', fetchTasks);
	let { projectID } = useParams();

	console.log(tasks);

	return (
		<Fragment>
			<div className='task-list-row'>
				<img
					src={arrow}
					alt='arrow'
					className={
						'show-tasks-arrow ' +
						(
							isOpen ? 'arrow-close' :
							'')
					}
					onClick={() => setIsOpen((isOpen) => !isOpen)}
				/>
				<h3 className='list-label'>{name}</h3>
			</div>
			<div className='task-container'>
				{isOpen &&
					tasks &&
					tasks.map((task: any) => (
						<Task
							title={task.title}
							description={task.description}
							creationDate={task.creation_date}
							id={task.id}
						/>
					))}
			</div>
		</Fragment>
	);
};

const fetchTasks = async () => {
	try {
		const res = await axios.get('http://46.101.172.171:8008/tasks/task_list/1/1', {
			headers:
				{
					Authorization: `Basic YWRtaW46cXdlMTIz`
				}
		});
		return res.data;
	} catch (err) {
		console.error('error while fetching task lists', err);
	}
};

export default TaskList;
