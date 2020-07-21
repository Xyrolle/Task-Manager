import React from 'react';
import { Link } from 'react-router-dom';

import check from '../../../../assets/check.svg';
import assignPencil from '../../../../assets/assignPencil.svg';
import subtask from '../../../../assets/subtask.svg';
import clock from '../../../../assets/clock.svg';
import calendar from '../../../../assets/calendar.svg';
import exclamation from '../../../../assets/exclamation.svg';

import { Icon, InlineIcon } from '@iconify/react';
import alertCircleCheck from '@iconify/icons-mdi/alert-circle-check';
// npm install --save-dev @iconify/react @iconify/icons-mdi
import checkCircle from '@iconify/icons-mdi/check-circle';

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
		</div>
	);
};

export default Task;
