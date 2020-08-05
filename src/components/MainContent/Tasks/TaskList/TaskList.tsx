import React, { Fragment, useState, useRef, useMemo } from 'react';
import { useQuery, useMutation, queryCache } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
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
	const [ isEditing, setIsEditing ] = useState(false);
	let { projectID } = useParams();
	const taskInput = useRef<HTMLInputElement>(null);
	const [ listEditingName, setListEditingName ] = useState(name);
	const taskDescription = useRef<HTMLTextAreaElement>(null);

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
			.catch(() => console.log('Error: can not add a task'));
		if (res) {
			return res.data;
		}
	};

	const deleteTaskList: any = ({ id }: any) => {
		axios
			.delete(`http://46.101.172.171:8008/project/tasklist_delete/${id}`, axiosConfig)
			.catch(() => console.log('Error: can not delete a task list'));
	};

	const [ deleteTaskListMutate ]: any = useMutation(deleteTaskList, {
		onMutate:
			(newData: any) => {
				queryCache.cancelQueries(newData.id);
				queryCache.setQueryData('task-lists', (prev: any) => {
					prev = prev.map((taskLists: any) => {
						taskLists.data = taskLists.data.filter((taskList: any) => {
							return taskList.id !== newData.id;
						});
						return taskLists;
					});
					return prev;
				});
			}
	});

	const [ mutate ]: any = useMutation(addTask, {
		onMutate:
			(newData: any) => {
				console.log(newData, 'isdg new data');
				queryCache.cancelQueries(id);
				if (newData.title.length > 1) {
					queryCache.setQueryData(id, (prev: any) => {
						console.log(prev, 'is prev', [ ...prev.data, { ...newData, id: new Date().toISOString() } ]);
						prev['data'] = [ ...prev.data, { ...newData, id: new Date().toISOString() } ];
						return prev;
					});
				}
			},
		onSettled: () => queryCache.invalidateQueries(id)
	});

	const saveChanges = () => {
		setIsEditing(false);
		axios.put(
			`http://46.101.172.171:8008/project/tasklist_update/${id}/`,
			{
				name: listEditingName,
				project: 115
			},
			axiosConfig
		);
	};

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
				{
					isEditing ? <Fragment>
						<input
							type='text'
							className='edit-input'
							value={listEditingName}
							onChange={(evt) => setListEditingName(evt.target.value)}
						/>
						<button className='btn save-changes' onClick={() => saveChanges()}>
							Save Changes
						</button>
					</Fragment> :
					<h3 className='list-label'>{listEditingName}</h3>}
				<div className='taskList-tooltip'>
					<Icon icon={ellipsisDotsH} className='dots' />
					<div className='taskList-content'>
						<ul>
							<li className='delete-task-list' onClick={() => deleteTaskListMutate({ id })}>
								Delete Task List
							</li>
							<li
								className='edit-list'
								onClick={() => {
									setIsEditing(true);
								}}
							>
								Edit List
							</li>
						</ul>
					</div>
				</div>
				<span className='task-count'>{task_count}</span>
			</div>
			{tasks.data && (
				<div className='task-container'>
					{description &&
					isOpen && (
						<div className='list-description'>
							<p>{description}</p>
						</div>
					)}
					{isOpen && !tasks.data.length && <div className='no-tasks'>No tasks in this list yet.</div>}
					{isOpen &&
						tasks.data.length > 0 &&
						tasks.data.map((task: any) => (
							<Task
								title={task.title}
								description={task.description}
								creationDate={task.creation_date}
								tags={task.tags}
								id={task.id}
								task_list={id}
								key={uuidv4()}
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
