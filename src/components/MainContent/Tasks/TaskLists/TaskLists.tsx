import React, { useRef, useContext } from 'react';
import axios from 'axios';

import { useInfiniteQuery } from 'react-query';

import { AppContext } from '../../../../context/AppContext';

import TaskList from '../TaskList/TaskList';
import { fetchTaskLists } from '../queries';

import './TaskLists.css';

interface IList {
	id: number;
	name: string;
	project: number;
	task_count: number;
	description?: string;
}

interface ILists {
	data: IList[];
	page_current: number;
	page_total: number;
}

let axiosConfig = {
	headers:
		{
			Authorization: `Basic YWRtaW46cXdlMTIz`
		}
};

const TaskLists: React.FC = () => {
	const ctx = useContext(AppContext);

	if (!ctx) {
		throw new Error('You probably forgot to put <AppProvider>.');
	}

	const { data: lists, isFetching, isFetchingMore, fetchMore, canFetchMore } = useInfiniteQuery<ILists, any, number>(
		[ 'task-lists', ctx.projectId ],
		fetchTaskLists,
		{
			getFetchMore:
				(prev) => {
					if (prev.page_current + 1 > prev.page_total) {
						return false;
					}
					return prev.page_current + 1;
				}
		}
	);

	const loadMoreButtonRef = useRef<HTMLButtonElement | null>(null);

	if (!lists) return <h5>loading</h5>;

	return (
		<div>
			{lists &&
				lists.map((lists_page: ILists) => {
					return (
						lists_page &&
						lists_page.data.map((taskList: IList) => (
							<TaskList
								name={taskList.name}
								id={taskList.id}
								task_count={taskList.task_count}
								description={taskList.description}
								project={ctx.projectId}
								key={taskList.id}
							/>
						))
					);
				})}
			<div className='btn-container'>
				<button
					ref={loadMoreButtonRef}
					onClick={() => {
						fetchMore();
					}}
					disabled={!canFetchMore || isFetching}
					className={
						'btn load-more-lists ' +
						(
							!canFetchMore || isFetching ? 'disabledBtn' :
							'')
					}
				>
					{
						isFetchingMore ? 'Loading more...' :
						canFetchMore ? 'Load More' :
						'Nothing more to load'}
				</button>
			</div>
		</div>
	);
};

export default TaskLists;
