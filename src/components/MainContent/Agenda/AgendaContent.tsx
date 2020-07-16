import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { AgendaDetails } from './AgendaDetails'
import './Agenda.css';
import Agenda from './Agenda';

// const getAgendaById = async (id: string) => {
//     const response = await axios.get(`http://46.101.172.171:8008/agenda/item/${id}`, {
//         headers:
//         {
//             Authorization: `Basic YWRtaW46cXdlMTIz`
//         }
//     });
//     return response.data;
// };
const getAgendasByProjectId = async () => {
    const response = await axios.get('http://46.101.172.171:8008/agenda/1/page=1', {
        headers:
        {
            Authorization: `Basic YWRtaW46cXdlMTIz`
        }
    });
    return response.data;
};
export const AgendaContent: React.FC = ({ }) => {
    const { status, data, error } = useQuery('getAllAgendas', getAgendasByProjectId);
    const { agendaID } = useParams();

    if (status === 'loading') return <div>loading</div>;
    if (status === 'error') return <div>error!{JSON.stringify(error)}</div>;


    return (
        <div >
            {console.log('Params', agendaID)}
            Agenda Content
            {!agendaID ? data.map((agenda: any, key: number) => <Agenda key={key} agenda={agenda} />) : null}
            {agendaID ? <AgendaDetails id={agendaID} /> : null}
        </div>
    );
};
