import React, { Fragment } from 'react';
import axios from 'axios';

import { useMutation, queryCache, useInfiniteQuery } from 'react-query';

import { axiosConfig } from '../../../utils/axiosConfig';

import Milestone from './Milestone/Milestone';

import './Milestones.css';

const Milestones: React.FC = () => {
	const projectID = 115;

	const fetchMilestones = async (key: string) => {
		const res = await axios.get('http://46.101.172.171:8008/stage/from_project/115/1', axiosConfig);
		console.log(res, 'from milstones');
		return res.data;
	};

	const { data: milestones, isFetching, fetchMore, canFetchMore } = useInfiniteQuery<
		any,
		any,
		number
	>(`milestones-${projectID}`, fetchMilestones, {
		getFetchMore:
			(prev) => {
				if (prev.page_current + 1 < prev.page_total) {
					return prev.page_current + 1;
				}

				return false;
			}
	});

	{
		console.log(milestones);
	}

	return (
		<Fragment>
			<div className='milestones-container'>
				{milestones &&
					milestones.map((milestonesPage) =>
						milestonesPage.data.map((milestone: any) => (
							<Milestone
								title={milestone.title}
								description={milestone.description}
								end_date={milestone.end_date}
								author={milestone.autor}
								id={milestone.id}
								key={milestone.id}
							/>
						))
					)}
			</div>
			<div>
				<button className='btn'>Load more</button>
			</div>
		</Fragment>
	);
};

export default Milestones;
