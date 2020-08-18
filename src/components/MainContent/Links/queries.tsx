import axios from 'axios';
import { axiosConfig } from '../../../utils/axiosConfig';
import { EditLinkInterface } from './interfaces';

export const getLinks = async (key: string, projectId: string, page = 1) => {
  const response = await axios.get(
    `http://46.101.172.171:8008/link/${projectId}/page=${page}`,
    axiosConfig
  );
  return response.data;
};

export const editLink = async ({ userId, linkId, projectId, title, content, tags }: EditLinkInterface) => {
  const response = await axios.patch(`http://46.101.172.171:8008/link/${projectId}/item/${linkId}`, {
    project: projectId,
    user: userId,
    title,
    content,
    tags
  },
    axiosConfig
  );
  return response.data;
}
