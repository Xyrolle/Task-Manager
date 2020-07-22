import React from 'react';
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

import './Task.css';

const Task = () => {
	return (
		<div className='task-row'>
			<Icon icon={checkCircle} className='check icon' />
			<span className='assigned-to'>
				Anyone
				<img src={assignPencil} alt='assign to' className='assign-pencil icon' />
			</span>
			<Link to='/taskInfo' className='task-title'>
				Task title
			</Link>
			<img src={subtask} alt='add subtask' className='subtask icon pd-left-10' />
			<img src={clock} alt='clock' className='clock icon pd-left-10' />
			<img src={calendar} alt='calendar' className='calendar icon pd-left-10' />
			<Icon icon={alertCircleCheck} className='exclamation important pd-left-10' />
			<div className='progress pd-left-10'>
				<span className='percentage'>0%</span>
				<span className='progress-slider'>hello</span>
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
		</div>
	);
};

export default Task;
