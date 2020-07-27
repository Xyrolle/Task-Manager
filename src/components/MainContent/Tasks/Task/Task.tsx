import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

import ITask from './ITask';

import './Task.css';

// add task info popup

let axiosConfig = {
	headers:
		{
			Authorization: `Basic YWRtaW46cXdlMTIz`
		}
};

const Task: React.FC<ITask> = ({ description, title, creationDate, id }: ITask) => {
	const [ isCompleted, setIsCompleted ] = useState(false);
	const [ showDescription, setShowDescription ] = useState(false);

	const showHideDescription = () => {
		let setTo =
			showDescription ? false :
			true;
		setShowDescription(setTo);
	};

	const completeTask = () => {
		setIsCompleted((isCompleted) => !isCompleted);
		axios
			.post(`http://46.101.172.171:8008/tasks/close_task/${id}`, { task_id: 59 }, axiosConfig)
			.then((response) => response)
			.catch((error) => console.error(error));
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
			<span
				className={
					'task-title ' +
					(
						isCompleted ? 'title-completed ' :
						'') +
					(
						description ? '' :
						'no-description')
				}
			>
				{title}
			</span>
			{
				description ? <span className='open-close-description' onClick={showHideDescription}>
					{
						showDescription ? 'less...' :
						'more...'}
				</span> :
				''}
			<img src={subtask} alt='add subtask' className='subtask icon pd-left-10' />
			<img src={clock} alt='clock' className='clock icon pd-left-10' />
			<img src={calendar} alt='calendar' className='calendar icon pd-left-10' />
			<Icon icon={alertCircleCheck} className='exclamation important pd-left-10' />
			<div className='progress pd-left-10'>
				<span className='percentage'>0%</span>
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
