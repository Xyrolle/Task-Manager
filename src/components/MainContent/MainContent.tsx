import React from 'react';
import { Route } from 'react-router-dom';
import TaskLists from 'components/MainContent/Tasks/TaskLists/TaskLists';
import UnderConstruction from 'pages/UnderConstruction/UnderConstruction';
import AgendaCreate from 'components/MainContent/Agenda/AgendaCreate/AgendaCreate';
import Projects from 'pages/Projects/Projects';
import AgendaContent from './Agenda/AgendaContent';
import ContentHeader from './ContentHeader/ContentHeader';
import AgendaDetails from './Agenda/AgendaDetails/AgendaDetails';
import TaskDetails from './Tasks/TaskDetails/TaskDetails';
import Task from './Tasks/Task/Task';
import Time from './Time/Time';
import LinkContent from './Links/LinkContent';
import LinkDetails from './Links/LinkDetails/LinkDetails';
import FilesContent from './Files/FilesContent';
import Overview from './Overview/Overview';
import Layout from 'components/Layout/Layout';
import Messages from './Messages/Messages';
import Milestones from './Milestones/Milestones';

import './MainContent.css';

interface MainContentProps {
	isLayoutActive: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ isLayoutActive }) => {
	return (
		<div>
			<Route path='/projects/:projectId/' component={Layout} />
			<div className='contentContainer'>
				<ContentHeader />
				<Route exact path='/' component={Projects} />
				<Route exact path='/projects' component={Projects} />
				<Route exact path='/tasks/task_info/:task_id/:projectId' component={TaskDetails} />
				<Route exact path='/projects/:projectId/agenda' component={AgendaContent} />
				<Route exact path='/projects/:projectId/agenda/create' component={AgendaCreate} />
				<Route exact path='/projects/:projectId/time' component={Time} />
				<Route exact path='/projects/:projectId/links' component={LinkContent} />
				<Route exact path='/projects/:projectId/links/:linkId' component={LinkDetails} />
				<Route exact path='/projects/:projectId/files' component={FilesContent} />
				<Route exact path='/projects/:projectId/milestones' component={Milestones} />
				{/* <Route exact path='/projects/:projectId/files/:fileId' component={FileDetails} /> */}
				<Route exact path='/projects/:projectId/agenda/:agendaID' component={AgendaDetails} />
				<Route exact path='/tasks/:projectID' component={TaskLists} />
				<Route exact path='/planning' component={() => <UnderConstruction title='Planning' />} />
				<Route exact path='/everything' component={() => <UnderConstruction title='Everything' />} />
				<Route exact path='/calendar' component={() => <UnderConstruction title='Calendar' />} />
				<Route exact path='/people' component={() => <UnderConstruction title='People' />} />
				<Route exact path='/projects/:projectId/messages' component={Messages} />
			</div>
			<footer style={{ height: '10rem' }} />
		</div>
	);
};

export default MainContent;
