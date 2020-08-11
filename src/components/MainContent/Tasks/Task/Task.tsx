import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useQuery, useMutation, queryCache, useInfiniteQuery } from 'react-query';

import assignPencil from '../../../../assets/assignPencil.svg';
import subtask from '../../../../assets/subtask.svg';
import clock from '../../../../assets/clock.svg';
import calendar from '../../../../assets/calendar.svg';
import eye from '../../../../assets/eye.svg';
import comments from '../../../../assets/comments.svg';
import tag from '../../../../assets/tag.png';

import { Icon } from '@iconify/react';
import alertCircleCheck from '@iconify/icons-mdi/alert-circle-check';
import checkCircle from '@iconify/icons-mdi/check-circle';
import bellIcon from '@iconify/icons-mdi/bell';
import clockTimeFourOutline from '@iconify/icons-mdi/clock-time-four-outline';

import { axiosConfig } from '../../../../utils/axiosConfig';

import { ITask, ITag } from './ITask';

import AddTagDropdown from './AddTagDropdown/AddTagDropdown';
import addTaskPlus from '../../../../assets/addTaskPlus.svg';

import './Task.css';

interface ITasks {
	data: ITask[];
	page_current: number;
	page_total: number;
}

const Task: React.FC<ITask> = ({
	description,
	title,
	creationDate,
	tags,
	id,
	task_list,
	parent,
	contributors,
	parent_id
}: ITask) => {
	const [ isCompleted, setIsCompleted ] = useState(false);
	const [ showDescription, setShowDescription ] = useState(false);
	const [ openSubtasks, setOpenSubtasks ] = useState(false);
	const [ isAddingSubtask, setIsAddingSubtask ] = useState(false);

	const addSubtaskTitle = useRef<HTMLInputElement>(null);
	const addSubtaskDescription = useRef<HTMLTextAreaElement>(null);

	const showHideDescription = () => {
		let setTo =
			showDescription ? false :
			true;
		setShowDescription(setTo);
	};

	const getSubtasks = async () => {
		if (parent) {
			let subtasks: any = [];
			await Promise.all(
				parent.map((subtask: any) =>
					axios
						.get(`http://46.101.172.171:8008/tasks/item/${subtask.child}`, axiosConfig)
						.then((res: any) => {
							subtasks.push(res.data);
						})
				)
			);
			return subtasks;
		}
	};

	const { data: subtasks } = useQuery<any, any>([ 'subtasks', id ], getSubtasks, { enabled: openSubtasks });

	const deleteTask: any = ({ task_id }: any) => {
		axios
			.delete(`http://46.101.172.171:8008/tasks/item/${task_id}`, axiosConfig)
			.catch((err) => console.error(err));
	};

	const deleteTag: any = ({ tag_id, task_id }: any) => {
		axios.delete(`http://46.101.172.171:8008/tags/task_tag/set/${task_id}/${tag_id}`, axiosConfig);
	};

	const [ deleteTaskMutate ] = useMutation(deleteTask, {
		onMutate:
			(newData: any) => {
				setTimeout(() => {
					if (parent_id) {
						queryCache.setQueryData([ 'subtasks', parent_id ], (prev: any) => {
							if (prev) {
								return prev.filter((task: ITask) => task.id !== newData.task_id);
							}
						});
					} else {
						queryCache.cancelQueries(task_list);
						queryCache.setQueryData(task_list, (prev: any) => {
							if (prev) {
								prev.forEach(
									(taskPage: ITasks) =>
										(taskPage.data = taskPage.data.filter(
											(task: ITask) => task.id !== newData.task_id
										))
								);

								return prev;
							}
						});
					}
				}, 300);
			},
		onSettled:
			() => {
				if (parent_id) {
					queryCache.invalidateQueries([ 'subtasks', id ]);
					queryCache.invalidateQueries([ 'subtasks', parent_id ]);
				}
			}
	});

	const [ deleteTagMutate ]: any = useMutation(deleteTag, {
		onMutate:
			(newData: any) => {
				if (contributors) {
					queryCache.cancelQueries(`details-for-task-${newData.task_id}`);
					queryCache.setQueryData(`details-for-task-${newData.task_id}`, (prev: any) => {
						prev.tags = prev.tags.filter((tag: ITag) => tag.id !== newData.tag_id);
						return prev;
					});
				} else if (parent_id) {
					queryCache.cancelQueries([ 'subtasks', parent_id ]);
					queryCache.setQueryData([ 'subtasks', parent_id ], (prev: any) => {
						if (prev) {
							let subtask_to_change = prev.find((subtask: ITask) => subtask.id === newData.task_id);
							subtask_to_change.tags = subtask_to_change.tags.filter(
								(tag: ITag) => tag.id !== newData.tag_id
							);
							return prev;
						}
					});
				} else {
					queryCache.cancelQueries(task_list);
					queryCache.setQueryData(task_list, (prev: any) => {
						console.log(prev, 'in delete tag');
						let task_to_change = prev.map((taskPage: ITasks) => {
							return taskPage.data.find((task: ITask) => task.id === newData.task_id);
						});
						console.log(task_to_change[0], 'task to change');
						task_to_change[0].tags = task_to_change[0].tags.filter((tag: any) => {
							return tag.id !== newData.tag_id;
						});
						return prev;
					});
				}
			}
	});

	const addSubtask = async ({ parent, title, description }: any) => {
		addSubtaskTitle.current!.value = '';
		addSubtaskDescription.current!.value = '';
		const res = await axios.post(
			'http://46.101.172.171:8008/tasks/add_subtask_to',
			{
				child:
					{
						title,
						description
					},
				parent
			},
			axiosConfig
		);
	};

	const [ addSubtaskMutate ] = useMutation(addSubtask, {
		onMutate:
			(newData: any) => {
				const { title, description, parent_id } = newData;
				queryCache.cancelQueries([ 'subtasks', id ]);
				queryCache.cancelQueries([ 'subtasks', parent_id ]);
				queryCache.setQueryData([ 'subtasks', id ], (prev: any) => {
					if (prev) {
						console.log(...prev, 'in add subtask', [
							prev,
							{ title, description, parent_id, id: new Date().toISOString() }
						]);
						return [ ...prev, { title, description, parent_id, id: new Date().toISOString() } ];
					}
				});
				queryCache.setQueryData([ 'subtasks', parent_id ], (prev: any) => {
					if (prev) {
						return prev;
					}
				});
			},
		onSettled:
			() => {
				if (parent_id) {
					queryCache.invalidateQueries([ 'subtasks', parent_id ]);
					queryCache.invalidateQueries(`details-for-task-${parent_id}`);
					queryCache.invalidateQueries(`details-for-task-${id}`);
					setTimeout(() => {
						queryCache.invalidateQueries([ 'subtasks', id ]);
					}, 500);
				} else {
					queryCache.invalidateQueries(task_list);
				}
			}
	});

	const completeTask = () => {
		setIsCompleted((isCompleted) => !isCompleted);
		deleteTaskMutate({ task_id: id, task_list });
	};

	return (
		<div className='task-row'>
			<span onClick={completeTask}>
				<Icon
					icon={checkCircle}
					className={
						'check icon ' +
						(
							isCompleted ? 'task-completed-check' :
							'')
					}
				/>
			</span>
			<span className='assigned-to'>
				Anyone
				<img src={assignPencil} alt='assign to' className='assign-pencil icon' />
			</span>
			<div className='task-info-tooltip'>
				<Link
					to={`task_info/${id}`}
					onClick={(evt) =>

							task_list === '0' ? evt.preventDefault() :
							null}
				>
					<span
						className={
							'task-title ' +
							(
								isCompleted ? 'title-completed' :
								'')
						}
					>
						{
							title.length > 4 ? title.slice(0, 3) + '...' :
							title}
					</span>
				</Link>
				<div className='task-ifno-text'>
					<span className='task-tooltip-title'>{title}</span>
					<span className='task-tooltip-date'>Created At: {creationDate}</span>
				</div>
			</div>
			{tags &&
				tags.length > 0 &&
				tags.map((tag: ITag) => (
					<span className='tag-oval' key={uuidv4()}>
						{tag.title}
						<span
							className='close-tag-btn'
							onClick={() => deleteTagMutate({ tag_id: tag.id, task_id: id })}
						>
							&times;
						</span>
					</span>
				))}
			{
				description ? <span className='open-close-description' onClick={showHideDescription}>
					{
						showDescription ? 'less...' :
						'more...'}
				</span> :
				''}
			<img
				src={subtask}
				alt='add subtask'
				onClick={() => {
					setOpenSubtasks((old) => !old);
					setIsAddingSubtask(false);
				}}
				className='subtask icon pd-left-10'
			/>
			<Icon icon={clockTimeFourOutline} className='clock icon pd-left-10' />
			<img src={calendar} alt='calendar' className='calendar icon pd-left-10' />
			<Icon icon={alertCircleCheck} className='exclamation important icon pd-left-10' />
			<div className='progress pd-left-10'>
				<span className='percentage icon'>0%</span>
				<span className='progress-slider'>progress</span>
			</div>
			<div className='description-tooltip'>
				<Icon icon={bellIcon} className='bell bell-active icon pd-left-10' />
				<span className='tooltip-text'>Current Reminders</span>
			</div>
			{task_list && (
				<div className='description-tooltip'>
					<img src={comments} alt='add comment' className='comments icon pd-left-10' />
					<span className='tooltip-text'>Add Comment</span>
				</div>
			)}
			<div className='description-tooltip'>
				<img src={tag} alt='add tag' className='tag icon pd-left-10' />
				<span className='tooltip-text'>Add Tag</span>
				{/* <AddTagDropdown /> */}
			</div>
			<img src={eye} alt='eye icon' className='eye icon pd-left-10' />
			{description &&
			showDescription && (
				<div className='task-description-content'>
					<p>{description}</p>
				</div>
			)}
			{openSubtasks &&
				subtasks &&
				subtasks.map((subtask: ITask) => (
					<Task
						title={subtask.title}
						description={subtask.description}
						id={subtask.id}
						task_list={subtask.task_list}
						creationDate={subtask.creationDate}
						tags={subtask.tags}
						parent={subtask.parent}
						parent_id={id}
						key={subtask.id}
					/>
				))}
			{openSubtasks &&
			!isAddingSubtask && (
				<div className='add-subtask-container'>
					<button className='add-subtask' onClick={() => setIsAddingSubtask(true)}>
						<span>&#43;</span> Add Subtask
					</button>
				</div>
			)}
			{isAddingSubtask && (
				<div className='add-subtask-container'>
					<div className='add-task-container'>
						<img src={addTaskPlus} alt='add task plus' className='add-task-plus' />
						<input
							type='text'
							placeholder='What needs to be done?'
							ref={addSubtaskTitle}
							className='add-task-input'
						/>
					</div>
					<div className='task-description'>
						<label>
							Provide a detailed description <small>(Optional)</small>
						</label>
						<textarea rows={10} cols={60} ref={addSubtaskDescription} className='description-area' />
					</div>
					<button
						className='btn'
						onClick={() =>
							addSubtaskMutate({
								parent: id,
								parent_id,
								title: addSubtaskTitle.current!.value,
								description: addSubtaskDescription.current!.value
							})}
					>
						Save changes
					</button>
					<span className='divider'>or</span>
					<span className='cancel' onClick={() => setIsAddingSubtask(false)}>
						Cancel
					</span>
				</div>
			)}
		</div>
	);
};

export default Task;
