import axios from 'axios';

export const getProjects = async (key: string, userId: string, page = 1) => {
  const response = await axios.get(
    `http://46.101.172.171:8008/project/project_view_by_user/${userId}/${page}/`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  return response.data;
};
