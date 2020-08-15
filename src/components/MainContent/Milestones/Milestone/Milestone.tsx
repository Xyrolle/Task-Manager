import React from 'react';
import { useMutation, queryCache } from 'react-query';
import moment from 'moment';

import { Icon } from '@iconify/react';
import checkCircle from '@iconify/icons-mdi/check-circle';

import { IMilestone } from './IMilestone';

import { completeMilestone } from './utils';

import './Milestone.css';

const Milestone: React.FC<IMilestone> = ({ title, description, end_date, author, id, project }: IMilestone) => {
	const parsedEndDate = moment.parseZone(end_date).format('LLLL').split(',');
	const mth = parsedEndDate[1].split(' ')[1],
		day = parsedEndDate[1].split(' ')[2],
		dw = parsedEndDate[0];

	console.log(mth, day, dw);

	const [ deleteMilestoneMutate ] = useMutation(completeMilestone, {
		onMutate:
			(newData: string) => {
				queryCache.cancelQueries([ 'milestones', project ]);
				queryCache.setQueryData([ 'milestones', project ], (prev: any) => {
					prev.forEach(
						(milestonePage: any) =>
							(milestonePage.data = milestonePage.data.filter(
								(milestone: IMilestone) => milestone.id !== newData
							))
					);

					return prev;
				});
			}
	});

	return (
		<div className='milestone-row'>
			<div className='milestone-date-container'>
				<div className='milestone-date-line'>{mth}</div>
				<div className='milestone-date'>
					<span>{day}</span>
					<div className='milestone-weekDay'>{dw}</div>
				</div>
			</div>
			<div className='milestone-main'>
				<div className='milestone-title-row'>
					<span onClick={() => deleteMilestoneMutate(id)}>
						<Icon icon={checkCircle} className='milestone-check' />
					</span>
					<span className='milestone-title'>{title}</span>
				</div>
				<div className='milestone-author'>{author}</div>
				<p className='milestone-description'>{description}</p>
			</div>
		</div>
	);
};

export default Milestone;
