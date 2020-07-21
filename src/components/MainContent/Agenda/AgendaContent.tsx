import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { AgendaDetails } from './AgendaDetails'
import './Agenda.css';
import Agenda from './Agenda';

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
        <div>
            <div className="agendaHeader">
                <h3>Notebooks</h3>
                <Link to={`/agenda/create`}>
                    <button className="agendaHeaderButton">+ Add a notebook</button>
                </Link>

            </div>
            {data && data.map((agenda: any, key: number) =>
                <div>
                    <Agenda key={key} agenda={agenda} />
                </div>)
            }
            {/* {agendaID ? <AgendaDetails id={agendaID} /> : null} */}
        </div>
    );
};
