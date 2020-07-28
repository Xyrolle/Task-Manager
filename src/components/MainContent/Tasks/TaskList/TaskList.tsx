import React, { Fragment, useState, useRef } from 'react';
import { useQuery, useMutation, queryCache } from 'react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import arrow from '../../../../assets/arrow.svg';
import addTaskPlus from '../../../../assets/addTaskPlus.svg';

import { Icon, InlineIcon } from '@iconify/react';
import ellipsisDotsH from '@iconify/icons-vaadin/ellipsis-dots-h';

import Task from '../Task/Task';

import './TaksList.css';

type AddTaskParams = {
	title: string;
	description: string;
};

const TaskList = ({ name, id, task_count, description }: any) => {
	const [ isOpen, setIsOpen ] = useState(false);
	const [ isAddingTask, setIsAddingTask ] = useState(false);
	const { error, data: tasks = {} } = useQuery(id, fetchTasks, {
		enabled: isOpen
	});
	let { projectID } = useParams();
	const taskInput = useRef<HTMLInputElement>(null);
	const taskDescription = useRef<HTMLTextAreaElement>(null);

	description = 'description';

	let axiosConfig = {
		headers:
			{
				Authorization: `Basic YWRtaW46cXdlMTIz`
			}
	};

	const addTask: any = async ({ title, description }: AddTaskParams) => {
		taskInput.current!.value = '';
		taskDescription.current!.value = '';
		const res = await axios
			.post(
				'http://46.101.172.171:8008/tasks/',
				{
					title,
					description,
					task_list: id
				},
				axiosConfig
			)
			.then((res) => res)
			.catch((err) => console.log('Error: can not add a task'));
		if (res) {
			return res.data;
		}
	};

	const deleteTaskList: any = ({ id }: any) => {
		console.log(id);
		axios
			.delete(`http://46.101.172.171:8008/project/tasklist_delete/${id}`, axiosConfig)
			.catch((err) => console.log('Error: can not delete a task list'));
	};

	const [ deleteTaskListMutate ]: any = useMutation(deleteTaskList, {
		onMutate:
			(newData: any) => {
				queryCache.cancelQueries(newData);
				queryCache.setQueryData('task-lists', (prev: any) => {
					const filteredRes = prev.map((taskLists: any) => {
						return taskLists.filter((taskList: any) => {
							return taskList.id !== newData.id;
						});
					});
					return filteredRes;
				});
			}
	});

	const [ mutate ]: any = useMutation(addTask, {
		onMutate:
			(newData: any) => {
				queryCache.cancelQueries(id);
				if (newData.title.length > 1) {
					queryCache.setQueryData(id, (prev: any) => [ ...prev, { ...newData, id: new Date().toISOString } ]);
				}
			},
		onSettled: () => queryCache.invalidateQueries(id)
	});

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
				<div className='taskList-tooltip'>
					<Icon icon={ellipsisDotsH} className='dots' />
					<div className='taskList-content'>
						<ul>
							<li className='delete-task-list' onClick={() => deleteTaskListMutate({ id })}>
								Delete Task List
							</li>
						</ul>
					</div>
				</div>
				<span className='task-count'>{task_count}</span>
			</div>
			{tasks && (
				<div className='task-container'>
					{description &&
					isOpen && (
						<div className='list-description'>
							<p>{description}</p>
						</div>
					)}
					{isOpen && !tasks.length && <div className='no-tasks'>No tasks in this list yet.</div>}
					{isOpen &&
						tasks.length > 0 &&
						tasks.map((task: any) => (
							<Task
								title={task.title}
								description={task.description}
								creationDate={task.creation_date}
								id={task.id}
								list_id={id}
								key={task.id}
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
								<img src={addTaskPlus} alt='add task plus' className='add-task-plus' />
								<input
									type='text'
									placeholder='What needs to be done?'
									ref={taskInput}
									className='add-task-input'
								/>
							</div>
							<div className='task-description'>
								<label>
									Provide a detailed description <small>(Optional)</small>
								</label>
								<textarea rows={10} cols={60} ref={taskDescription} className='description-area' />
							</div>
							<button
								className='btn'
								onClick={() =>
									mutate({
										title: taskInput.current!.value,
										description: taskDescription.current!.value
									})}
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
			)}
		</Fragment>
	);
};

const fetchTasks = async (id: any) => {
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
