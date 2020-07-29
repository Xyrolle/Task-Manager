import React from 'react';
import { Route } from 'react-router-dom';
import ContentHeader from './ContentHeader/ContentHeader';
import TaskLists from '../../components/MainContent/Tasks/TaskLists/TaskLists';
import AgendaContent from './Agenda/AgendaContent';
import AgendaCreate from '../../components/MainContent/Agenda/AgendaCreate/AgendaCreate';
import AgendaDetails from './Agenda/AgendaDetails/AgendaDetails';
import Task from './Tasks/Task/Task'
import Time from './Time/Time'

import './MainContent.css';

const MainContent: React.FC = () => {
  return (
    <div>
      <ContentHeader />
      <div className='contentContainer'>
        <Route path='/project/' component={TaskLists} />
        <Route exact path='/projects/:projectId/agenda' component={AgendaContent} />
        <Route exact path='/agenda/create' component={AgendaCreate} />
        <Route exact path='/projects/:projectId/time' component={Time} />
        <Route path='/agenda/:agendaID' component={AgendaDetails} />
        <Route path='/tasks/:projectID' component={TaskLists} />
      </div>
    </div>
  );
};

export default MainContent;
