import axios from 'axios';
import { axiosConfig } from '../../../utils/axiosConfig';
import { IupdateAgendaContent } from './interfaces'

export const getAgendasByProjectId = async () => {
    const response = await axios.get('http://46.101.172.171:8008/agenda/1/page=1',
        await axiosConfig
    );
    return response.data;
};

export const addAgenda = (title: string, content: string) => {
    axios.post('http://46.101.172.171:8008/agenda/', {
        title,
        content,
        project: '1',//project id
        user: '1',//current user id
        last_user: '1', // last updated userid
    },
        axiosConfig
    )
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
        })
}

export const getAgendaById = async (id: string) => {
    const response = await axios.get(`http://46.101.172.171:8008/agenda/item/${id}`,
        axiosConfig
    );
    return response.data;
};

export const updateAgendaContent = ({ id, title, content }: IupdateAgendaContent): Promise<void> => {
    return axios.patch(`http://46.101.172.171:8008/agenda/item/${id}`, {
        title,
        content,
        project: '1',//project id
        user: '1',//current user id
        last_user: '1', // last updated userid
    },
        axiosConfig
    )
        .then(function (response: any) {
            console.log(response.data);
            const data = response.data
            // return data;
        })
        .catch(function (error) {
            console.log(error);
        })
}

export const addTagInAgenda = (id: number, title: string) => {
    axios.get(`http://46.101.172.171:8008/tags/agenda_tag/set/4/${id}`,
        axiosConfig
    )
        .then(function () {
            // addTagInAgenda(data.id, title)
        })
        .catch(function () {
            // console.log(error);
        })
}

export const createTag = (title: string) => {
    axios.post('http://46.101.172.171:8008/tags/create', {
        title
    },
        axiosConfig
    )
        .then(function ({ data }) {
            addTagInAgenda(data.id, title)
        })
        .catch(function (error) {
            console.log(error);
        })
}