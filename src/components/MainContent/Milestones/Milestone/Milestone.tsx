import React from 'react';

import { Icon } from '@iconify/react';
import checkCircle from '@iconify/icons-mdi/check-circle';

import { IMilestone } from './IMilestone';

import './Milestone.css';

const Milestone: React.FC<IMilestone> = ({ title, description, end_date, author, id }: IMilestone) => {
	const completeMilestone = () => {};

	return (
		<div className='milestone-row'>
			<div className='milestone-date-container'>
				<div className='milestone-date-line' />
				<div className='milestone-date'>{end_date}</div>
			</div>
			<div className='milestone-main'>
				<div className='milestone-title-row'>
					<Icon icon={checkCircle} className='milestone-check' />
					<span className='milestone-title'>{title}</span>
				</div>
				<div className='milestone-author'>{author}</div>
			</div>
		</div>
	);
};

export default Milestone;
