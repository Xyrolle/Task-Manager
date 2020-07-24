import React, { useContext, useRef } from 'react';
import axios from 'axios';
import { AppContext } from '../../../../context/AppContext';

import './AddTaskListModal.css';

let axiosConfig = {
	headers:
		{
			Authorization: `Basic YWRtaW46cXdlMTIz`
		}
};

const AddTaskListModal: React.FC = () => {
	const ctx = useContext(AppContext);
	if (!ctx) {
		throw new Error('You probably forgot to put <AppProvider>.');
	}

	const taskListTitle = useRef<HTMLInputElement>(null);
	const taskListDescription = useRef<HTMLTextAreaElement>(null);

	const addTaskList = (title: string, content: string) => {
		console.log(title, 'is');
		axios
			.post(
				'http://46.101.172.171:8008/project/tasklist_create/',
				{
					name: 'strsafasfasfing',
					project: 10
				},
				axiosConfig
			)
			.then(function(response) {
				console.log(response);
				return response;
			})
			.catch(function(error) {
				console.error(error);
			});
	};

	return (
		<div>
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
						<button type='button' className='closeBtn' onClick={ctx.closeTaskListModal}>
							Close
						</button>
						<button type='button' className='addList btn' onClick={() => addTaskList('hello', 'world')}>
							Add Task List
						</button>
					</div>
				</form>
			</div>
			<div className='bg' onClick={ctx.closeTaskListModal} />
		</div>
	);
};

export default AddTaskListModal;
