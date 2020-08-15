import React, { Fragment, useContext } from 'react';
import axios from 'axios';

import { useMutation, queryCache, useInfiniteQuery } from 'react-query';

import { axiosConfig } from '../../../utils/axiosConfig';

import { AppContext } from '../../../context/AppContext';

import Milestone from './Milestone/Milestone';

import './Milestones.css';

const Milestones: React.FC = () => {
	const ctx = useContext(AppContext);

	if (!ctx) {
		throw new Error('You probably forgot to put <AppProvider>.');
	}

	const fetchMilestones = async (key: string, project: string, page_id: number = 1) => {
		if (project) {
			const res = await axios.get(
				`http://46.101.172.171:8008/stage/from_project/${project}/${page_id}`,
				axiosConfig
			);
			return res.data;
		}
	};

	const { data: milestones, isFetching, isFetchingMore, fetchMore, canFetchMore } = useInfiniteQuery<
		any,
		any,
		number
	>([ 'milestones', ctx.projectId ], fetchMilestones, {
		getFetchMore:
			(prev) => {
				if (prev.page_current + 1 <= prev.page_total) {
					return prev.page_current + 1;
				}

				return false;
			}
	});

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
								project={ctx.projectId}
								key={milestone.id}
							/>
						))
					)}
			</div>
			<div>
				<button
					className={
						'btn ' +
						(
							isFetching || !canFetchMore ? 'disabledBtn' :
							'')
					}
					disabled={isFetching || !canFetchMore}
					onClick={() => fetchMore()}
				>
					{
						isFetchingMore ? 'Loading more...' :
						canFetchMore ? 'Load More' :
						'Nothing more to load'}
				</button>
			</div>
		</Fragment>
	);
};

export default Milestones;
