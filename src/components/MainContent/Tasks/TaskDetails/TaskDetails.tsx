import React, { useRef, useState } from 'react';
import { useQuery, useMutation, queryCache, useInfiniteQuery } from 'react-query';
import axios from 'axios';

import { useParams } from 'react-router-dom';

import Task from '../Task/Task';
import Comment from '../Comment/Comment';

import './TaskDetails.css';

let axiosConfig = {
	headers:
		{
			Authorization: `Basic YWRtaW46cXdlMTIz`
		}
};

const TaskDetails: React.FC = () => {
	const [ hasMore, setHasMore ] = useState(true);
	const [ comments_page_id, setPageID ] = useState(1);

	const { task_id } = useParams();

	const loadMoreButtonRef = useRef<HTMLButtonElement | null>(null);

	const fetchTaskDetails: any = async () => {
		const res = await axios.get(`http://46.101.172.171:8008/tasks/item/${task_id}`, axiosConfig);
		return res.data;
	};

	const fetchComments: any = async () => {
		const res = await axios.get(
			`http://46.101.172.171:8008/comment/from_task/${task_id}/${comments_page_id}`,
			axiosConfig
		);

		return res.data;
	};

	const { error, data: taskInfo } = useQuery<any, any>(`details-for-task-${task_id}`, fetchTaskDetails);

	const {
		status,
		data: comments,
		isFetching,
		isFetchingMore,
		fetchMore,
		canFetchMore
	} = useInfiniteQuery(`comments-${task_id}`, fetchComments, {
		getFetchMore: () => setPageID((old) => old + 1)
	});

	const commentArea = useRef<HTMLTextAreaElement>(null);

	const addComment = async ({ task_id, text }: any) => {
		const res = await axios.post(`http://46.101.172.171:8008/comment/to_task/${task_id}`, { text }, axiosConfig);
		return res.data;
	};

	const [ addCommentMutate ] = useMutation(addComment, {
		onMutate:
			(newData: any) => {
				const query = `comments-${task_id}`;
				queryCache.cancelQueries(query);
				queryCache.setQueryData(query, (prev: any) => {
					return prev.concat({ ...newData, date: '0', author: 'You' });
				});
			},
		onSettled: () => queryCache.invalidateQueries(`comments-${task_id}`)
	});

	console.log(hasMore);

	if (!comments) return <div>loading</div>;

	return (
		<div className='details-container'>
			details
			{taskInfo && (
				<Task
					description={taskInfo.description}
					title={taskInfo.title}
					creationDate={taskInfo.creationDate}
					tags={taskInfo.tags}
					id={task_id}
					list_id={'0'}
				/>
			)}
			<div className='comments-section'>
				<h3>Comments</h3>
				{comments &&
					comments
						.flat()
						.map((comment: any) => (
							<Comment
								text={comment.text}
								author={comment.author}
								date={comment.date}
								id={comment.id}
								key={comment.id}
							/>
						))}
			</div>
			<div className='add-comments-section'>
				<label>Add Comment</label>
				<textarea rows={10} cols={80} ref={commentArea} className='description-area' />
				<button className='btn' onClick={() => addCommentMutate({ task_id, text: commentArea.current!.value })}>
					Add Comment
				</button>
			</div>
			<div className='btn-container'>
				<button
					ref={loadMoreButtonRef}
					onClick={() => {
						fetchMore();
					}}
					disabled={!hasMore || isFetching}
					className={
						'btn load-more-lists ' +
						(
							!hasMore || isFetching ? 'disabledBtn' :
							'')
					}
				>
					{
						isFetchingMore ? 'Loading more...' :
						hasMore ? 'Load More' :
						'Nothing more to load'}
				</button>
			</div>
			<div className='add-tags-section'>
				<label>Add Tag</label>
				<textarea rows={10} cols={80} className='description-area' />
				<button className='btn'>Add Tag</button>
			</div>
		</div>
	);
};

export default TaskDetails;
