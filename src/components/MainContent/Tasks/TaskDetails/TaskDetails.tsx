import React, { useRef, useState } from 'react';
import { useQuery, useMutation, queryCache, useInfiniteQuery } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Task from '../Task/Task';
import Comment from '../Comment/Comment';
import Time from '../../Time/Time';

import { fetchTaskDetails, fetchComments } from '../queries';
import { axiosConfig } from '../../../../utils/axiosConfig';

import './TaskDetails.css';
import { IComment } from '../Comment/IComment';

interface CommentType {
	data: [];
	page_current: number;
	page_total: number;
}

const TaskDetails: React.FC = () => {
	const [ tagExist, setTagExist ] = useState(false);
	const { task_id } = useParams();

	const { data: taskInfo } = useQuery([ 'details', task_id ], fetchTaskDetails);

	const { data: comments, isFetching, isFetchingMore, fetchMore, canFetchMore } = useInfiniteQuery<
		CommentType,
		any,
		number
	>([ 'comments', task_id ], fetchComments, {
		getFetchMore:
			(prev) => {
				if (prev.page_current + 1 > prev.page_total) {
					return false;
				}

				return prev.page_current + 1;
			}
	});

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
				queryCache.cancelQueries([ `comments`, task_id ]);
				queryCache.setQueryData([ `comments`, task_id ], (prev: any) => {
					const idx = prev[0].page_total - 1;
					if (prev[idx]) {
						prev[idx].data.push({ ...newData, date: '0', author: 'You' });
					}
					return prev;
				});
			}
	});

	const assignTagToTask = async (id: number) => {
		await axios.get(`http://46.101.172.171:8008/tags/task_tag/set/${task_id}/${id}`, axiosConfig);
	};

	const addTag = async (title: string) => {
		tagArea.current!.value = '';
		try {
			const res = await axios.post(`http://46.101.172.171:8008/tags/create`, { title }, axiosConfig);
			assignTagToTask(res.data.id);
		} catch (err) {
			setTagExist(true);
			setTimeout(() => {
				setTagExist(false);
			}, 2000);
		}
	};

	console.log('hello');

	const [ addTagMutate ] = useMutation(addTag, {
		onMutate:
			(newData: any) => {
				queryCache.cancelQueries([ 'details', task_id ]);
				queryCache.setQueryData([ 'details', task_id ], (prev: any) => {
					prev['tags'] = [ ...prev['tags'], { title: newData } ];
					return prev;
				});
			},
		onSettled:
			() => {
				setTimeout(() => {
					queryCache.invalidateQueries([ 'details', task_id ]);
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
					task_list={taskInfo.task_list}
					parent={taskInfo.parent}
					contributors={taskInfo.contributors}
					parent_id={taskInfo.parent_id}
					key={task_id}
				/>
			)}
			<div className='comments-section'>
				<h3>Comments</h3>
				{comments &&
					comments.map((commentPage: any) => {
						return commentPage.data.map((comment: IComment) => (
							<Comment
								text={comment.text}
								author={comment.author}
								date={comment.date}
								id={comment.id}
								key={uuidv4()}
							/>
						));
					})}
			</div>
			<div className='btn-container'>
				<button
					onClick={() => {
						fetchMore();
					}}
					disabled={isFetching || !canFetchMore}
					className={
						'btn load-more-lists comments-load ' +
						(
							isFetching || !canFetchMore ? 'disabledBtn' :
							'')
					}
				>
					{
						isFetchingMore ? 'Loading more...' :
						canFetchMore ? 'Load More' :
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
			<div>
				time
				<Time />
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
