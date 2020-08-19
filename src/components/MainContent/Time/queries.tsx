import axios from 'axios';
import { axiosConfig } from '../../../utils/axiosConfig';
import { CreateTimePointsInterface } from './interfaces';

export const getTimeGroups = async () => {
  const response = await axios.get(
    'http://46.101.172.171:8008/times/time_groups/84/1',
    await axiosConfig
  );
  return response.data;
};

export const getTimePoints = async (string: string, timeGroupId: string) => {
  const response = await axios.get(
    `http://46.101.172.171:8008/times/time_groups/item/${timeGroupId}/time_points/1`,
    await axiosConfig
  );
  return response.data;
};

export const createTimeGroup = async (projectId: string) => {
  const response = await axios.post(`http://46.101.172.171:8008/times/new_time_group/${projectId}`, {},
    axiosConfig);
  return response.data.id;
};

export const getTaskList = async (key: string, projectId: string) => {
  const response = await axios.get(`http://46.101.172.171:8008/project/task_list_view_by_project/${projectId}/1/`,
    axiosConfig
  )
  return response.data
}

export const createTimePoints = async ({
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