import React, { Fragment, useContext, useRef, useState } from 'react';
import { useMutation, queryCache } from 'react-query';
import axios from 'axios'
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import { AppContext } from '../../../context/AppContext';
import './AddMilestoneModal.css';
import { IMilestone } from '../../MainContent/Milestones/Milestone/IMilestone';
import { axiosConfig } from '../../../utils/axiosConfig';

const AddMilestoneModal: React.FC = () => {
	const ctx = useContext(AppContext);

	const [endTimeValue, setEndTimeValue] = useState(moment().toISOString());
	const titleInput = useRef<HTMLInputElement>(null);
	const descriptionInput = useRef<HTMLTextAreaElement>(null);

	if (!ctx) {
		throw new Error('You probably forgot to put <AppProvider>.');
	}

	const addMilestone = async ({ title, description, end_date, project, id }: IMilestone) => {
		axios.post(
			'http://46.101.172.171:8008/stage/',
			{
				project,
				end_date,
				title,
				description
			},
			axiosConfig
		);
	};

	const [addMilestoneMutate]: any = useMutation(addMilestone, {
		onMutate:
			(newData: any) => {
				queryCache.cancelQueries(['milestones', ctx.projectId]);
				queryCache.setQueryData(['milestones', ctx.projectId], (prev: any) => {
					const idx = prev.length - 1;
					prev[idx].data.push({ ...newData, id: new Date().toISOString() });
					return prev;
				});
			},
		onSettled: () => queryCache.invalidateQueries(['milestones', ctx.projectId])
	});

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
