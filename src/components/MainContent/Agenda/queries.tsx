import axios from 'axios';
import { axiosConfig } from 'utils/axiosConfig';
import { UpdateAgendaContentInterface, DeleteTagInterface, CreateTagInterface } from './interfaces';


export const getAgendasByProjectId = async (key: string, projectId: string, page = 1) => {
  const response = await axios.get(
    `http://46.101.172.171:8008/agenda/${projectId}/page=${page}`,
    await axiosConfig
  );
  return response.data;
};

export const addAgenda = (
  title: string,
  content: string,
  project: string,
  user: number
) => {
  axios
    .post(
      'http://46.101.172.171:8008/agenda/',
      {
        title,
        content,
        project,
        user,
        last_user: '1', // last updated userid
      },
      axiosConfig
    )
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getAgendaById = async (id: string) => {
  const response = await axios.get(
    `http://46.101.172.171:8008/agenda/item/${id}`,
    axiosConfig
  );
  return response.data;
};

export const updateAgendaContent = ({
  id,
  title,
  content,
  project,
  user
}: UpdateAgendaContentInterface): Promise<void> => {
  return axios
    .patch(
      `http://46.101.172.171:8008/agenda/item/${id}`,
      {
        title,
        content,
        project,
        user,
        last_user: '1', // last updated userid
      },
      axiosConfig
    )
    .then(function (response: any) {
      console.log(response.data);
      const data = response.data;
      // return data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const addTagInAgenda = (id: number, title: string) => {
  axios
    .get(`http://46.101.172.171:8008/tags/agenda_tag/set/4/${id}`, axiosConfig)
    .then(function () {
      // addTagInAgenda(data.id, title)
    })
    .catch(function () {
      // console.log(error);
    });
};

export const deleteTag = async ({ agendaId, tagId }: DeleteTagInterface) => {
  const response = await axios.delete(`http://46.101.172.171:8008/tags/agenda_tag/set/${agendaId}/${tagId}`,
    axiosConfig
  )
  return response;
}

export const setTagToAgenda = async (agendaId: number, id: string) => {
  const response = await axios.get(
    `http://46.101.172.171:8008/tags/agenda_tag/set/${agendaId}/${id}`,
    axiosConfig
  );
  return response.data;
};

export const createTag = async ({
  title,
  agendaId,
  projectId,
}: CreateTagInterface): Promise<void> => {
  const response = await axios.post(
    'http://46.101.172.171:8008/tags/create',
    {
      title,
    },
    axiosConfig
  );
  if (response.status === 200) {

    await setTagToAgenda(agendaId, response.data.id);
  }
  return response.data;
};
