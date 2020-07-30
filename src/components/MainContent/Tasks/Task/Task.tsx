import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useQuery, useMutation, queryCache } from 'react-query';

import assignPencil from '../../../../assets/assignPencil.svg';
import subtask from '../../../../assets/subtask.svg';
import clock from '../../../../assets/clock.svg';
import calendar from '../../../../assets/calendar.svg';
import eye from '../../../../assets/eye.svg';
import comments from '../../../../assets/comments.svg';
import tag from '../../../../assets/tag.png';

import { Icon } from '@iconify/react';
import alertCircleCheck from '@iconify/icons-mdi/alert-circle-check';
import checkCircle from '@iconify/icons-mdi/check-circle';
import bellIcon from '@iconify/icons-mdi/bell';
import clockTimeFourOutline from '@iconify/icons-mdi/clock-time-four-outline';

import { ITask, ITag } from './ITask';

import './Task.css';

// add task info popup

let axiosConfig = {
	headers:
		{
			Authorization: `Basic YWRtaW46cXdlMTIz`
		}
};

const Task: React.FC<ITask> = ({ description, title, creationDate, tags, id, list_id }: ITask) => {
	const [ isCompleted, setIsCompleted ] = useState(false);
	const [ showDescription, setShowDescription ] = useState(false);

	const showHideDescription = () => {
		let setTo =
			showDescription ? false :
			true;
		setShowDescription(setTo);
	};

	const deleteTask: any = ({ task_id }: any) => {
		axios
			.delete(`http://46.101.172.171:8008/tasks/item/${task_id}`, axiosConfig)
			.then((res) => console.log(res))
			.catch((err) => console.error(err));
	};

	const deleteTag: any = async (tag_id: number, task_id: number) => {
		const res = await axios.delete(
			`http://46.101.172.171:8008/tags/task_tag/set/${task_id}/${tag_id}`,
			axiosConfig
		);
		if (list_id) queryCache.invalidateQueries(list_id);
		else queryCache.invalidateQueries(`details-for-task-${id}`);
	};

	const [ deleteTaskMutate ]: any = useMutation(deleteTask, {
		onMutate:
			(newData: any) => {
				if (list_id) {
					queryCache.cancelQueries(list_id);
					queryCache.setQueryData(list_id, (prev: any) => {
						if (prev) {
							return prev.filter((task: ITask) => {
								return id !== task.id;
							});
						}
					});
				} else {
					queryCache.setQueryData(id, null);
				}
			}
	});

	const completeTask = () => {
		setIsCompleted((isCompleted) => !isCompleted);
		deleteTaskMutate({ task_id: id, list_id });
	};

	return (
		<div className='task-row'>
			<span onClick={completeTask}>
				<Icon
					icon={checkCircle}
					className={
						'check icon ' +
						(
							isCompleted ? 'task-completed-check' :
							'')
					}
				/>
			</span>
			<span className='assigned-to'>
				Anyone
				<img src={assignPencil} alt='assign to' className='assign-pencil icon' />
			</span>
			<div className='task-info-tooltip'>
				<Link
					to={`task_info/${id}`}
					onClick={(evt) =>

							list_id === '0' ? evt.preventDefault() :
							null}
				>
					<span
						className={
							'task-title ' +
							(
								isCompleted ? 'title-completed' :
								'')
						}
					>
						{
							title.length > 6 ? title.slice(0, 4) + '...' :
							title}
					</span>
				</Link>
				<div className='task-ifno-text'>
					<span className='task-tooltip-title'>{title}</span>
					<span className='task-tooltip-date'>Created At: {creationDate}</span>
				</div>
			</div>
			{
				description ? <span className='open-close-description' onClick={showHideDescription}>
					{
						showDescription ? 'less...' :
						'more...'}
				</span> :
				''}
			{tags &&
				tags.length > 0 &&
				tags.map((tag: ITag) => (
					<span className='tag-oval' key={uuidv4()}>
						{tag.title}
						<span className='close-tag-btn' onClick={() => deleteTag(tag.id, id)}>
							&times;
						</span>
					</span>
				))}
			<img src={subtask} alt='add subtask' className='subtask icon pd-left-10' />
			<Icon icon={clockTimeFourOutline} className='clock icon pd-left-10' />
			<img src={calendar} alt='calendar' className='calendar icon pd-left-10' />
			<Icon icon={alertCircleCheck} className='exclamation important icon pd-left-10' />
			<div className='progress pd-left-10'>
				<span className='percentage icon'>0%</span>
				<span className='progress-slider'>progress</span>
			</div>
			<div className='description-tooltip'>
				<Icon icon={bellIcon} className='bell bell-active icon pd-left-10' />
				<span className='tooltip-text'>Current Reminders</span>
			</div>
			{list_id && (
				<div className='description-tooltip'>
					<img src={comments} alt='add comment' className='comments icon pd-left-10' />
					<span className='tooltip-text'>Add Comment</span>
				</div>
			)}
			<div className='description-tooltip'>
				<img src={tag} alt='add tag' className='tag icon pd-left-10' />
				<span className='tooltip-text'>Add Tag</span>
			</div>
			<img src={eye} alt='eye icon' className='eye icon pd-left-10' />
			{description &&
			showDescription && (
				<div className='task-description-content'>
					<p>{description}</p>
				</div>
			)}
		</div>
	);
};

export default Task;
