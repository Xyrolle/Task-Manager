import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useMutation, queryCache, useQuery } from 'react-query';
import TextField from '@material-ui/core/TextField';
import { axiosConfig } from 'utils/axiosConfig';
import { AppContext } from '../../../context/AppContext';
import {
	CreateTimePointsInterface,
	TimesInterface,
	TimeTaskListInterface
} from 'components/MainContent/Time/interfaces'

const createTimeGroup = async (projectId: string) => {
	const response = await axios.post(`http://46.101.172.171:8008/times/new_time_group/${projectId}`, {},
		axiosConfig);
	return response.data.id;
};

const createTimePoints = async ({
	projectId,
	groupId,
	description,
	startTimeValue,
	endTimeValue,
	user,
	taskList
}: CreateTimePointsInterface): Promise<void> => {
	const response = await axios.post(
		`http://46.101.172.171:8008/times/time_point/add/${groupId}`,
		{
			description,
			time_start: startTimeValue.toString(),
			time_end: endTimeValue.toString(),
			user,
			task_list: taskList
		},
		axiosConfig
	);
	return response.data;
};
interface AddTimeModalInterface {
	closeModal(): void;
}

const getTaskList = async (key: string, projectId: string) => {
	const response = await axios.get(`http://46.101.172.171:8008/project/task_list_view_by_project/${projectId}/1/`,
		axiosConfig
	)
	return response.data
}

const AddTimeModal: React.FC<AddTimeModalInterface> = ({ closeModal }) => {
	const [startTimeValue, setStartTimeValue] = useState(moment().format());
	const [endTimeValue, setEndTimeValue] = useState(moment().toISOString());
	const [selectedOption, setSelectedOption] = useState<number>()
	const descriptionInput = useRef<HTMLTextAreaElement>(null);
	const ctx = useContext(AppContext);
	const { data } = useQuery(['getTaskList', ctx && ctx.projectId], getTaskList);

	if (!ctx) {
		throw new Error('You probably forgot to put <AppProvider>.');
	}

	const [mutate] = useMutation(createTimePoints, {
		onMutate:
			(newData: CreateTimePointsInterface) => {
				queryCache.cancelQueries(['getTimeGroups', ctx.projectId]);
				queryCache.setQueryData(['getTimeGroups', ctx.projectId], (prev: TimesInterface[] | undefined) => {
					const index = prev && prev[0].page_total;
					if (newData.projectId && prev && index) {
						prev[index - 1] &&
							prev[index - 1].data.push({
								id: newData.groupId,
								project: +newData.projectId,
								date: new Date().toISOString(),
								times_points: []
							});
					}
					return prev;
				});
			},
		onError: (error, newData, rollback) => console.log(error),
		onSettled: () => queryCache.invalidateQueries(['getTimeGroups', ctx.projectId])
	});

	return (
		<div>
			<div className='modalContainer sectionFormLightbox'>
				<form className='addTaskListForm'>
					<div className='addTaskListHeader'>
						<h2 className='modal-title'>Add Time</h2>
					</div>
					<div className='modal-body'>
						<div className='task-list-description'>
							<label>Give description</label>
							<textarea ref={descriptionInput} rows={30} cols={20} className='description-input' />
						</div>
						<h6>Start Date</h6>
						<TextField
							id='datetime-local'
							type='datetime-local'
							defaultValue='2017-05-24T10:30'
							InputLabelProps={{
								shrink: true
							}}
							onChange={(e) => setStartTimeValue(e.target.value)}
						/>
						<h6>End Date</h6>
						<TextField
							id='datetime-local'
							type='datetime-local'
							defaultValue='2017-05-24T10:30'
							InputLabelProps={{
								shrink: true
							}}
							onChange={(e) => setEndTimeValue(e.target.value)}
						/>
						Choose task list
					<select
							className="selectOptionAddTimeModal"
							onChange={(e) => setSelectedOption(+e.target.value)}
						>
							<option selected disabled hidden>Choose here</option>
							{data && data.data.map((taskList: TimeTaskListInterface, key: number) => (
								<option value={taskList.id} key={key}>{taskList.name}</option>
							))}
						</select>
					</div>
					<div className='modal-footer'>
						<button onClick={ctx.closeModal} type='button' className='closeBtn'>
							Close
						</button>
						<button
							onClick={async () => {
								const groupId = await createTimeGroup(ctx.projectId);
								await mutate({
									projectId: ctx.projectId,
									groupId,
									description: descriptionInput.current!.value,
									startTimeValue,
									endTimeValue,
									user: ctx.userDetails.id,
									taskList: selectedOption
								});
								await ctx.closeModal()

							}}
							type='button'
							className='addList-btn btn'
						>
							Add Project
						</button>
					</div>
				</form>
			</div>
			<div className='bg' onClick={ctx.closeModal} />
		</div>
	);
};
export default AddTimeModal;
