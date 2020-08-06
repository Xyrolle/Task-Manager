import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, } from 'react-query';

import { getAgendasByProjectId } from './queries'
import './Agenda.css';
import Agenda from './AgendaComponent/Agenda';


const AgendaContent: React.FC = ({ }) => {
    const { projectId } = useParams();
    const { status, data, error } = useQuery(['getAllAgendas', projectId], getAgendasByProjectId);

    if (status === 'loading') return <div data-testid="loading">loading</div>;
    if (status === 'error') return <div>error!{JSON.stringify(error)}</div>;

    return (
        <div>

            <div className="agendaHeader">
                <h3 role="heading">Notebooks</h3>
                <Link to={`agenda/create`} data-testid="createAgenda">
                    <button className="agendaHeaderButton">
                        Add a notebook
                    </button>
                </Link>
            </div>
            {data && data.data.map((agenda: any, key: number) =>
                <div key={key}>
                    <Agenda agenda={agenda} />
                </div>)
            }
        </div>
    );
};
export default AgendaContent;