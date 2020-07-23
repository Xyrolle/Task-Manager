import React, { useContext } from 'react';
import { AppContext } from '../../../../context/AppContext';

import './AddTaskListModal.css';

const AddTaskListModal: React.FC = () => {
	const ctx = useContext(AppContext);
	if (!ctx) {
		throw new Error('You probably forgot to put <AppProvider>.');
	}
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
							<input type='text' className='form-control' />
						</div>
						<div className='task-list-description'>
							<label>
								Do you have any notes for this list? Enter them her. <small>(Optional)</small>
							</label>
							<textarea rows={30} cols={20} className='description-input' />
						</div>
					</div>
					<div className='modal-footer'>
						<button type='button' className='closeBtn' onClick={ctx.closeTaskListModal}>
							Close
						</button>
						<button type='button' className='addList-btn btn'>
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
