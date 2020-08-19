import axios from 'axios';
import { axiosConfig } from '../../../utils/axiosConfig';
import { EditLinkInterface, DeleteTagInterface, AddLinkInterface, AddCommentInterface, CreateTagInterface } from './interfaces';
import { queryCache } from 'react-query';

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

export const deleteTag = async ({ linkId, tagId }: DeleteTagInterface) => {
  const response = await axios.delete(`http://46.101.172.171:8008/tags/link_tag/set/${linkId}/${tagId}`,
    axiosConfig
  )
  return response;
}

export const addLink = async ({ projectId, userId, title, content }: AddLinkInterface) => {
  try {
    const response = await axios.post(
      `http://46.101.172.171:8008/link/`,
      {
        project: projectId,
        user: userId,
        title,
        content,
        tags: [],
      },
      await axiosConfig
    );
    return response.data;
  } catch (err) { }
};

export const getLink = async (key: string, projectId: string, linkId: string) => {
  const response = await axios.get(`http://46.101.172.171:8008/link/${projectId}/item/${linkId}`,
    axiosConfig)
  return response.data
}

export const addComment = async ({ comment, linkId, projectId, userId }: AddCommentInterface) => {
  const response = await axios.post(`http://46.101.172.171:8008/link/item/${linkId}/comments`,
    {
      text: comment
    },
    axiosConfig)
  return response.data
}

export const setTagToLink = async (linkId: number, id: string) => {
  const response = await axios.get(`http://46.101.172.171:8008/tags/link_tag/set/${linkId}/${id}`,
    axiosConfig)
  return response.data
}

export const createTag = async ({ title, linkId }: CreateTagInterface): Promise<void> => {
  const response = await axios.post('http://46.101.172.171:8008/tags/create', {
    title
  },
    axiosConfig
  )
  if (response.status === 200) {
    await setTagToLink(linkId, response.data.id);
  }
  return response.data
}
