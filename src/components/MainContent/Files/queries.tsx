import axios from 'axios';
import { axiosConfig } from 'utils/axiosConfig';
import { FileUploadInterface } from './interfaces';

export const uploadFile = async ({ projectId, title, upload }: FileUploadInterface) => {
  const fd = new FormData();
  upload && fd.append('upload', upload)
  fd.append('project', projectId)
  fd.append('title', title)
  try {
    const response = await axios.post(`http://46.101.172.171:8008/files/`,
      fd,
      axiosConfig,
    );
    return response.data;
  } catch (err) {
    console.log(err)
  }
}

export const getFiles = async (key: string, projectId: string, page = 1) => {
  const response = await axios.get(`http://46.101.172.171:8008/files/files_item_view_by_project/${projectId}/${page}`,
    axiosConfig
  );
  return response.data;
}