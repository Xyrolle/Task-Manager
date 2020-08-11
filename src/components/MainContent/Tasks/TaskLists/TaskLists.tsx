import React, { useRef } from 'react';
import axios from 'axios';

import { useInfiniteQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import TaskList from '../TaskList/TaskList';

import './TaskLists.css';

let axiosConfig = {
	headers:
		{
			Authorization: `Basic YWRtaW46cXdlMTIz`
		}
};

const TaskLists: React.FC = () => {
	const { projectID } = useParams();

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

	const fetchTaskLists = async (key: string, page_id: number = 1) => {
		const res = await axios.get(
			`http://46.101.172.171:8008/project/task_list_view_by_project/${projectID}/${page_id}/`,
			axiosConfig
		);
		return res.data;
	};

	const { data: lists, isFetching, isFetchingMore, fetchMore, canFetchMore } = useInfiniteQuery<
		ILists,
		string,
		number
	>('task-lists', fetchTaskLists, {
		getFetchMore:
			(prev) => {
				if (prev.page_current + 1 > prev.page_total) {
					return false;
				}
				return prev.page_current + 1;
			}
	});

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
						lists && canFetchMore ? 'Load More' :
						'Nothing more to load'}
				</button>
			</div>
		</div>
	);
};

export default TaskLists;
