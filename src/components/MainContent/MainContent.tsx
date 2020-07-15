import React from 'react';
import axios from 'axios'
import { useQuery } from 'react-query'
import './MainContent.css';
import { Agenda } from './Agenda/Agenda'
import ContentHeader from './ContentHeader/ContentHeader';

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

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'error') return <div>Error...</div>
  return (
    <div>
      <ContentHeader />
      <div className='contentContainer'>
        <h6>Notebooks</h6>
        {data.map((notebook: any, key: number) => <Agenda key={key} />)}
      </div>
    </div>
  );
};

export default MainContent;
