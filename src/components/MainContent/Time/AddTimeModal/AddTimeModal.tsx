import React, { useState, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useMutation, queryCache, useQuery } from 'react-query';
import { axiosConfig } from '../../../../utils/axiosConfig'
import TextField from '@material-ui/core/TextField';
import { useParams } from 'react-router';

const createTimeGroup = async (projectId: number) => {

    const response = await axios.post(`http://46.101.172.171:8008/times/new_time_group/${projectId}`, {},
        await axiosConfig
    );
    return response.data.id;
}

interface foo {
    projectId: string;
    groupId: number;
    description: string;
    startTimeValue: string;
    endTimeValue: string;
    user: number;
    taskList: number
}
const createTimePoints = async ({ projectId, groupId, description, startTimeValue, endTimeValue, user, taskList }: foo): Promise<void> => {
    const response = await axios.post(`http://46.101.172.171:8008/times/time_point/add/${groupId}`, {
        description,
        time_start: startTimeValue,
        time_end: endTimeValue,
        user,
        task_list: taskList
    },
        await axiosConfig
    );
    queryCache.setQueryData(['getTimeGroups', 1], (prev: any) => {
        const index = prev[0].page_total;

        prev[index - 1] && prev[index - 1].data.push({
            id: groupId,
            project: projectId,
            date: new Date(),
            times_points: [response.data.id]
        })
        return prev
    });
    queryCache.setQueryData(groupId.toString(), (prev: any) => {
        return [{
            id: response.data.id,
            description: response.data.description,
            time_start: response.data.time_start,
            time_end: response.data.time_end,
            user: response.data.user,
            task_list: response.data.task_list,
        }]
    });
    return response.data;
}

const AddTimeModal: React.FC<{ handleShowModal(): void }> = ({ handleShowModal }) => {
    const [startTimeValue, setStartTimeValue] = useState(moment().toISOString());
    const [endTimeValue, setEndTimeValue] = useState(moment().toISOString());
    const descriptionInput = useRef<HTMLTextAreaElement>(null);
    const { projectId } = useParams();

    const [mutate] = useMutation(createTimePoints, {

        onMutate: (newData: any) => {
            queryCache.cancelQueries('getTimeGroups');
            const snapshot = queryCache.getQueryData('getTimeGroups');

            return () => queryCache.setQueryData('getTimeGroups', snapshot);
        },
        onError: (error: any, newData: any, rollback: any) => rollback(),
        // onSettled: () => queryCache.prefetchQuery('getTimeGroups')
    })

    return (
        <div>
            <div className='modalContainer sectionFormLightbox'>
                <form className='addTaskListForm'>
                    <div className='addTaskListHeader'>
                        <h2 className='modal-title'>Add Time</h2>
                    </div>
                    <div className='modal-body'>

                        <div className='task-list-description'>
                            <label>
                                Give description
                            </label>
                            <textarea ref={descriptionInput} rows={30} cols={20} className='description-input' />
                        </div>
                        <h6>Start Date</h6>
                        <TextField
                            id="datetime-local"
                            label="Next appointment"
                            type="datetime-local"
                            defaultValue="2017-05-24T10:30"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => setStartTimeValue(e.target.value)}
                        />
                        <h6>End Date</h6>
                        <TextField
                            id="datetime-local"
                            label="Next appointment"
                            type="datetime-local"
                            defaultValue="2017-05-24T10:30"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => setEndTimeValue(e.target.value)}
                        />
                        <button>submit</button>
                    </div>
                    <div className='modal-footer'>
                        <button
                            onClick={() => handleShowModal()}
                            type='button'
                            className='closeBtn' >
                            Close
						</button>
                        <button
                            onClick={async () => {
                                const groupId = await createTimeGroup(projectId);
                                await mutate({
                                    projectId,
                                    groupId,
                                    description: descriptionInput.current!.value,
                                    startTimeValue,
                                    endTimeValue,
                                    user: 5,
                                    taskList: 108,
                                })
                                await handleShowModal()
                            }}
                            type='button'
                            className='addList-btn btn'>
                            Add Project
						</button>
                    </div>
                </form>
            </div>
            <div className='bg' />
        </div>
    );
};
export default AddTimeModal;
