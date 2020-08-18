import React, { Fragment, useRef, useContext } from 'react';
import axios from 'axios';
import { useMutation, queryCache } from 'react-query';

import './AddTaskListModal.css';

import { axiosConfig } from '../../../utils/axiosConfig';

import { AppContext } from '../.././../context/AppContext';

type taskListParams = {
	name: string;
	description: string;
};

interface AddTaskListModalProps {
	closeModal: () => void;
}

const AddTaskListModal: React.FC<AddTaskListModalProps> = ({ closeModal }) => {
	const taskListTitle = useRef<HTMLInputElement>(null);
	const taskListDescription = useRef<HTMLTextAreaElement>(null);
	const ctx = useContext(AppContext);

	if (!ctx) throw new Error('no context');

	const addTaskList = async ({ name, description, project }: any) => {
		await axios.post(
			'http://46.101.172.171:8008/project/tasklist_create',
			{
				name,
				description,
				project
			},
			axiosConfig
		);
	};

	const [ addTaskListMutate ] = useMutation(addTaskList, {
		onMutate:
			(newData) => {
				queryCache.cancelQueries([ 'task-lists', ctx.projectId ]);
				queryCache.setQueryData([ 'task-lists', ctx.projectId ], (prev: any) => {
					const idx = prev[0].page_total;
					prev[idx - 1].data.push({ ...newData, id: new Date().toISOString() });
					return prev;
				});
			},
		onSettled: () => queryCache.invalidateQueries([ 'task-lists', ctx.projectId ])
	});

	return (
		<Fragment>
			<div className='modalContainer sectionFormLightbox'>
				<form className='addTaskListForm'>
					<div className='addTaskListHeader'>
						<h2 className='modal-title'>Add Task List</h2>
					</div>
					<div className='modal-body'>
						<div className='form-group'>
							<label>Give the list a name</label>
							<input type='text' ref={taskListTitle} className='form-control' />
						</div>
						<div className='task-list-description'>
							<label>
								Do you have any notes for this list? Enter them her. <small>(Optional)</small>
							</label>
							<textarea rows={30} cols={20} ref={taskListDescription} className='description-input' />
						</div>
					</div>
					<div className='modal-footer'>
						<button type='button' className='closeBtn' onClick={closeModal}>
							Close
						</button>
						<button
							type='button'
							className='addList btn'
							onClick={() => {
								addTaskListMutate({
									name: taskListTitle.current!.value,
									description: taskListDescription.current!.value,
									project: ctx.projectId
								});
								taskListTitle.current!.value = '';
								taskListDescription.current!.value = '';
							}}
						>
							Add Task List
						</button>
					</div>
				</form>
			</div>
			<div className='bg' onClick={closeModal} />
		</Fragment>
	);
};

export default AddTaskListModal;
