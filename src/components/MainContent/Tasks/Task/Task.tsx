import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, queryCache } from 'react-query';

import assignPencil from '../../../../assets/assignPencil.svg';
import subtask from '../../../../assets/subtask.svg';
import clock from '../../../../assets/clock.svg';
import calendar from '../../../../assets/calendar.svg';
import eye from '../../../../assets/eye.svg';
import comments from '../../../../assets/comments.svg';
import tag from '../../../../assets/tag.png';

import clockTimeFourOutline from '@iconify/icons-mdi/clock-time-four-outline';

import { Icon } from '@iconify/react';
import alertCircleCheck from '@iconify/icons-mdi/alert-circle-check';
import checkCircle from '@iconify/icons-mdi/check-circle';
import bellIcon from '@iconify/icons-mdi/bell';

import ITask from './ITask';

import './Task.css';

// add task info popup

let axiosConfig = {
	headers:
		{
			Authorization: `Basic YWRtaW46cXdlMTIz`
		}
};

const Task: React.FC<ITask> = ({ description, title, creationDate, id, list_id }: ITask) => {
	const [ isCompleted, setIsCompleted ] = useState(false);
	const [ showDescription, setShowDescription ] = useState(false);

	const showHideDescription = () => {
		let setTo =
			showDescription ? false :
			true;
		setShowDescription(setTo);
	};

	const deleteTask: any = ({ task_id }: any) => {
		axios
			.delete(`http://46.101.172.171:8008/tasks/item/${task_id}`, axiosConfig)
			.then((res) => console.log(res))
			.catch((err) => console.error(err));
	};

	const [ deleteTaskMutate ]: any = useMutation(deleteTask, {
		onMutate:
			(newData: any) => {
				console.log(list_id, id);
				queryCache.cancelQueries(list_id);
				queryCache.setQueryData(list_id, (prev: any) => {
					return prev.filter((task: ITask) => {
						console.log(task.id);
						return id !== task.id;
					});
				});
			}
	});

	const completeTask = () => {
		setIsCompleted((isCompleted) => !isCompleted);
		deleteTaskMutate({ task_id: id, list_id });
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
				<span
					className={
						'task-title ' +
						(
							isCompleted ? 'title-completed' :
							'')
					}
				>
					{
						title.length > 6 ? title.slice(0, 4) + '...' :
						title}
				</span>
				<div className='task-ifno-text'>
					<span className='task-tooltip-title'>{title}</span>
					<span className='task-tooltip-date'>Created At: {creationDate}</span>
				</div>
			</div>
			{
				description ? <span className='open-close-description' onClick={showHideDescription}>
					{
						showDescription ? 'less...' :
						'more...'}
				</span> :
				''}
			<img src={subtask} alt='add subtask' className='subtask icon pd-left-10' />
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
			<div className='description-tooltip'>
				<img src={comments} alt='add comment' className='comments icon pd-left-10' />
				<span className='tooltip-text'>Add Comment</span>
			</div>
			<div className='description-tooltip'>
				<img src={tag} alt='add tag' className='tag icon pd-left-10' />
				<span className='tooltip-text'>Add Tag</span>
			</div>
			<img src={eye} alt='eye icon' className='eye icon pd-left-10' />
			{description &&
			showDescription && (
				<div className='task-description-content'>
					<p>{description}</p>
				</div>
			)}
		</div>
	);
};

export default Task;
