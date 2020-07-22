import React from 'react';
import { Route } from 'react-router-dom';

import ContentHeader from './ContentHeader/ContentHeader';
import TaskLists from '../../components/MainContent/Tasks/TaskLists/TaskLists';
import { AgendaContent } from '../../components/MainContent/Agenda/AgendaContent';

import './MainContent.css';

const MainContent: React.FC = () => {
	return (
		<div>
			<ContentHeader />
			<div className='contentContainer'>
				<Route exact path='/agenda' component={AgendaContent} />
				<Route path='/agenda/:agendaID' component={AgendaContent} />
				<Route path='/tasks/:projectID' component={TaskLists} />
			</div>
		</div>
	);
};

export default MainContent;
