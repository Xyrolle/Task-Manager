import React from 'react';
import { Route } from 'react-router-dom';

import ContentHeader from './ContentHeader/ContentHeader';
import Tasks from '../../components/MainContent/Tasks/TaskList/TaskList';
import { AgendaContent } from '../../components/MainContent/Agenda/AgendaContent';

import './MainContent.css';

const MainContent: React.FC = () => {
	return (
		<div>
			<ContentHeader />
			<div className='contentContainer'>
				<Route exact path='/agenda' component={AgendaContent} />
				<Route path='/agenda/:agendaID' component={AgendaContent} />
				<Route path='/tasks/:projectID' component={Tasks} />
			</div>
		</div>
	);
};

export default MainContent;
