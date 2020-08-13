import React, { Fragment, useContext, useRef, useState } from 'react';
import { useMutation, queryCache } from 'react-query';
import axios from 'axios';

import moment from 'moment';
import TextField from '@material-ui/core/TextField';

import { AppContext } from '../../../context/AppContext';

import './AddMilestoneModal.css';

import { axiosConfig } from '../../../utils/axiosConfig';

const AddMilestoneModal: React.FC = () => {
	const ctx = useContext(AppContext);

	const [ endTimeValue, setEndTimeValue ] = useState(moment().toISOString());
	const titleInput = useRef<HTMLInputElement>(null);
	const descriptionInput = useRef<HTMLTextAreaElement>(null);

	if (!ctx) {
		throw new Error('You probably forgot to put <AppProvider>.');
	}

	const addMilestone = async (props: any) => {
		console.log(props, 'in add milestone');
		const res = await axios.post(
			'http://46.101.172.171:8008/stage/',
			{
				project: 115,
				end_date: '2020-08-13T12:08:49Z',
				title: 'dfgdfsstringfvd1',
				description: 'gfhfd'
			},
			axiosConfig
		);

		console.log(res, 'from add milestone');
	};

	const [ addMilestoneMutate ]: any = useMutation(addMilestone, {
		onMutate:
			(newData: any) => {
				console.log(newData, 'in mutate add milestone');

				// const page = newData[]
				// queryCache.cancelQueries(newData.id);
				// queryCache.setQueryData('task-lists', (prev: any) => {
				// 	prev = prev.map((taskLists: any) => {
				// 		taskLists.data = taskLists.data.filter((taskList: any) => {
				// 			return taskList.id !== newData.id;
				// 		});
				// 		return taskLists;
				// 	});
				// 	return prev;
				// });
			}
	});

	console.log(ctx, ctx.projectId);

	return (
		<Fragment>
			<div className='modalContainer sectionFormLightbox'>
				<form className='addTaskListForm'>
					<div className='addTaskListHeader'>
						<h2 className='modal-title'>Add Milestone</h2>
					</div>
					<div className='modal-body'>
						<div className='title'>
							<label>Provide title</label>
							<input ref={titleInput} type='text' className='form-control' />
						</div>
						<div className='task-list-description'>
							<label>Provide description</label>
							<textarea ref={descriptionInput} rows={30} cols={20} className='description-input' />
						</div>
						<label className='end-date'>End Date</label>
						<TextField
							id='datetime-local'
							type='datetime-local'
							defaultValue='2017-05-24T10:30'
							InputLabelProps={{
								shrink: true
							}}
							onChange={(e) => setEndTimeValue(e.target.value)}
						/>
					</div>
					<div className='modal-footer'>
						<button type='button' className='closeBtn' onClick={ctx.closeModal}>
							Close
						</button>
						<button
							type='button'
							className='addList btn'
							onClick={() =>
								addMilestoneMutate({
									title: titleInput.current!.value,
									description: descriptionInput.current!.value,
									end_date: endTimeValue,
									project: ctx.projectId
								})}
						>
							Add Milestone
						</button>
					</div>
				</form>
			</div>
			<div className='bg' onClick={ctx.closeModal} />
		</Fragment>
	);
};

export default AddMilestoneModal;
