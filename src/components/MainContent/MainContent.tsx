import React from 'react';
import { Route } from 'react-router-dom';
import ContentHeader from './ContentHeader/ContentHeader';
import TaskLists from '../../components/MainContent/Tasks/TaskLists/TaskLists';
import AgendaContent from './Agenda/AgendaContent';
import AgendaCreate from '../../components/MainContent/Agenda/AgendaCreate/AgendaCreate';
import AgendaDetails from './Agenda/AgendaDetails/AgendaDetails';
import TaskDetails from './Tasks/TaskDetails/TaskDetails';

import './MainContent.css';

const MainContent: React.FC = () => {
	return (
		<div>
			<ContentHeader />
			<div className='contentContainer'>
				<Route exact path='/tasks/task_info/:task_id' component={TaskDetails} />
				<Route exact path='/projects/:projectId/agenda' component={AgendaContent} />
				<Route exact path='/agenda/create' component={AgendaCreate} />
				<Route path='/agenda/:agendaID' component={AgendaDetails} />
				<Route exact path='/tasks/:projectID' component={TaskLists} />
			</div>
		</div>
	);
};

export default MainContent;
