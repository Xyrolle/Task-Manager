import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import './MainContent.css';
import { Agenda } from './Agenda/Agenda';
import { useParams } from 'react-router-dom'
import ContentHeader from './ContentHeader/ContentHeader';
import { AgendaDetails } from './Agenda/AgendaDetails'

const getAgendaByProjectId = async () => {
  const response = await axios.get('http://46.101.172.171:8008/agenda/1/page=1', {
    headers: {
      'Authorization': `Basic YWRtaW46cXdlMTIz`
    }
  })
  return response.data
}

const MainContent: React.FC = () => {
  const { status, data, error } = useQuery('agenda', getAgendaByProjectId)
  const { agendaId } = useParams();

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'error') return <div>Error...</div>
  return (
    <div>
      <ContentHeader />
      <div className='contentContainer'>
        <h4>Notebooks</h4>
        {!agendaId ? data.map((agenda: any, key: number) => <Agenda key={key} agenda={agenda} />) : null}
        {agendaId ? <AgendaDetails id={agendaId} /> : null}
      </div>
    </div>
  );
};

export default MainContent;
