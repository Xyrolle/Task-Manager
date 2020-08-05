import React, { useRef, useState } from 'react';
import { useQuery, useMutation, queryCache, useInfiniteQuery } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
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

interface CommentType {
	[x: string]: CommentType[] | undefined;
	data: [];
	page_current: any;
	page_total: any;
}

const TaskDetails: React.FC = () => {
	const [ tagExist, setTagExist ] = useState(false);
	const { task_id } = useParams();

	const fetchTaskDetails: any = async () => {
		const res = await axios.get(`http://46.101.172.171:8008/tasks/item/${task_id}`, axiosConfig);
		return res.data;
	};

	const { error, data: taskInfo } = useQuery<any, any>(`details-for-task-${task_id}`, fetchTaskDetails);

	const { status, data: comments, isFetching, isFetchingMore, fetchMore, canFetchMore } = useInfiniteQuery<
		CommentType,
		[any, any],
		any
	>(
		[ `comments`, task_id ],
		async (key: any, comments_page_id: any, abc?: any) => {
			console.log(comments_page_id, 'is page id for comments', key, 'abc', abc);
			const res = await axios.get(
				`http://46.101.172.171:8008/comment/from_task/${task_id}/${comments_page_id}`,
				axiosConfig
			);
			console.log(res.data, 'is data');
			return res.data;
		},
		{
			getFetchMore:
				(prev: any, all: any) => {
					console.log('prev is ', prev, prev.page_current + 1, all);
					return prev.page_curent + 1;
				}
		}
	);

	console.log(comments, canFetchMore, 'are comments');
	const commentArea = useRef<HTMLTextAreaElement>(null);
	const tagArea = useRef<HTMLTextAreaElement>(null);

	const addComment = async ({ task_id, text }: any) => {
		commentArea.current!.value = '';
		const res = await axios.post(`http://46.101.172.171:8008/comment/to_task/${task_id}`, { text }, axiosConfig);
		return res.data;
	};

	const [ addCommentMutate ] = useMutation(addComment, {
		onMutate:
			(newData: any) => {
				console.log(newData, 'sifsdfasd');
				queryCache.cancelQueries([ `comments`, task_id ]);
				queryCache.setQueryData([ `comments`, task_id ], (prev: any) => {
					console.log(prev, 'isadfsd a prev data');
					prev[0].data = prev[0].data.concat({ ...newData, date: '0', author: 'You' });
					return prev;
				});
			}
	});

	const assignTagToTask = async (id: number) => {
		const res = await axios.get(`http://46.101.172.171:8008/tags/task_tag/set/${task_id}/${id}`, axiosConfig);
		return id;
	};

	const addTag = async (title: string) => {
		tagArea.current!.value = '';
		try {
			const res = await axios.post(`http://46.101.172.171:8008/tags/create`, { title }, axiosConfig);
			assignTagToTask(res.data.id);
			return res.data.id;
		} catch (err) {
			setTagExist(true);
			setTimeout(() => {
				setTagExist(false);
			}, 2000);
		}
	};

	const [ addTagMutate ] = useMutation(addTag, {
		onMutate:
			(newData: any) => {
				queryCache.cancelQueries(`details-for-task-${task_id}`);
				queryCache.setQueryData(`details-for-task-${task_id}`, (prev: any) => {
					prev['tags'] = [ ...prev['tags'], { title: newData } ];
					return prev;
				});
			},
		onSettled:
			() => {
				setTimeout(() => {
					queryCache.invalidateQueries(`details-for-task-${task_id}`);
				}, 80);
			}
	});

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
					key={task_id}
				/>
			)}
			<div className='comments-section'>
				<h3>Comments</h3>
				{comments &&
					comments[0].data.map((comment: any) => (
						<Comment
							text={comment.text}
							author={comment.author}
							date={comment.date}
							id={comment.id}
							key={uuidv4()}
						/>
					))}
			</div>
			<div className='btn-container'>
				<button
					onClick={() => {
						fetchMore();
					}}
					disabled={
						isFetching ||
						(comments &&
							comments[comments.length - 1].page_current >= comments[comments.length - 1].page_total)
					}
					className={
						'btn load-more-lists comments-load ' +
						(
							isFetching ||
							(comments &&
								comments[comments.length - 1].page_current >=
									comments[comments.length - 1].page_total) ? 'disabledBtn' :
							'')
					}
				>
					{
						isFetchingMore ? 'Loading more...' :
						comments &&
						comments[comments.length - 1].page_current <
							comments[comments.length - 1].page_total ? 'Load More' :
						'Nothing more to load'}
				</button>
			</div>
			<div className='add-section comments-add'>
				<label>Add Comment</label>
				<textarea rows={10} cols={80} ref={commentArea} className='description-area details-input' />
				<button className='btn' onClick={() => addCommentMutate({ task_id, text: commentArea.current!.value })}>
					Add Comment
				</button>
			</div>
			<div className='add-section tags-add'>
				<label>Add Tag</label>
				<textarea rows={10} cols={80} placeholder='' ref={tagArea} className='description-area details-input' />
				<button className='btn' onClick={() => addTagMutate(tagArea.current!.value)}>
					Add Tag
				</button>
				{tagExist && <div className='tag-exists'>Sorry, this tag already exists</div>}
			</div>
		</div>
	);
};

export default TaskDetails;
