import axios from 'axios';
import { axiosConfig } from 'utils/axiosConfig';

export const deleteProject = async (id: number) => {
  const response = await axios.delete(
    `http://46.101.172.171:8008/project/project_delete/${id}`,
    axiosConfig
  );
  return response.data;
};

export const getLikes = async () => {
  const response = await axios.get(
    `http://46.101.172.171:8008/project/liked_projects_by_users/5/1/`,
    axiosConfig
  );
  return response.data;
};

export const addLikeToProject = async (project: number) => {
  await axios.post(
    `http://46.101.172.171:8008/project/liked_projects_add/`,
    {
      project,
    },
    axiosConfig
  );
};