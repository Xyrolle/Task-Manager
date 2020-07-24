import React, { Fragment, useState, useRef } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import arrow from '../../../../assets/arrow.svg';
import addTaskPlus from '../../../../assets/addTaskPlus.svg';

import Task from '../Task/Task';

import './TaksList.css';

let axiosConfig = {
	headers:
		{
			Authorization: `Basic YWRtaW46cXdlMTIz`
		}
};

const TaskList = ({ name, id }: any) => {
	const [ isOpen, setIsOpen ] = useState(false);
	const [ isAddingTask, setIsAddingTask ] = useState(false);
	const { data: tasks } = useQuery(id, fetchTasks);
	let { projectID } = useParams();

	const addTask = (title: string, description: string) => {
		console.log(title, description);
		axios
			.post(
				'http://46.101.172.171:8008/tasks/',
				{
					title: title,
					description: description,
					task_list: id
				},
				axiosConfig
			)
			.then((response) => response)
			.catch((error) => console.error(error));
	};

	const taskInput = useRef<HTMLInputElement>(null);
	const taskDescription = useRef<HTMLTextAreaElement>(null);

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
					onClick={() => {
						setIsOpen((isOpen) => !isOpen);
						setIsAddingTask(false);
					}}
				/>
				<h3 className='list-label'>{name}</h3>
			</div>
			<div className='task-container'>
				{isOpen && !tasks.length && <div className='no-tasks'>No tasks in this list yet.</div>}
				{isOpen &&
					tasks.length > 0 &&
					tasks.map((task: any) => (
						<Task
							title={task.title}
							description={task.description}
							creationDate={task.creation_date}
							id={task.id}
						/>
					))}
				{isOpen &&
				!isAddingTask && (
					<button className='btn add-task' onClick={() => setIsAddingTask(true)}>
						<span>+</span> Add Task
					</button>
				)}
				{isOpen &&
				isAddingTask && (
					<Fragment>
						<div className='add-task-container'>
							<img src={addTaskPlus} alt='add task plus' className='add-task-plus icon' />
							<input
								type='text'
								placeholder='What needs to be done?'
								ref={taskInput}
								className='add-task-input'
							/>
						</div>
						<label>
							Provide a detailed description <small>(Optional)</small>
						</label>
						<textarea rows={10} cols={60} ref={taskDescription} className='description-area' />
						<button
							className='btn'
							onClick={() => addTask(taskInput.current!.value, taskDescription.current!.value)}
						>
							Save changes
						</button>
						<span className='divider'>or</span>
						<span className='cancel' onClick={() => setIsAddingTask(false)}>
							Cancel
						</span>
					</Fragment>
				)}
			</div>
		</Fragment>
	);
};

const fetchTasks = async (id: any) => {
	console.log(id, 'is');
	try {
		const res = await axios.get(`http://46.101.172.171:8008/tasks/task_list/${id}/1`, {
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
