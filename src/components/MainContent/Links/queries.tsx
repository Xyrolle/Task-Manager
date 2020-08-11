import axios from 'axios';
import { axiosConfig } from '../../../utils/axiosConfig';

export const getLinks = async (key: string, projectId: string) => {
  const response = await axios.get(
    `http://46.101.172.171:8008/link/${projectId}/page=1`,
    axiosConfig
  );
  return response.data;
};
