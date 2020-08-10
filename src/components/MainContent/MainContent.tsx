import React from 'react';
import { Route } from 'react-router-dom';

import TaskLists from 'components/MainContent/Tasks/TaskLists/TaskLists';
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
import FileDetails from './Files/FileDetails/FileDetails';
import './MainContent.css';

const MainContent: React.FC = () => {
  return (
    <div>
      <ContentHeader />
      <div className="contentContainer">
        <Route exact path="/" component={Projects} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/tasks/task_info/:task_id" component={TaskDetails} />
        <Route
          exact
          path="/projects/:projectId/agenda"
          component={AgendaContent}
        />
        <Route
          exact
          path="/projects/:projectId/agenda/create"
          component={AgendaCreate}
        />
        <Route exact path="/projects/:projectId/time" component={Time} />
        <Route
          exact
          path="/projects/:projectId/links"
          component={LinkContent}
        />
        <Route
          exact
          path="/projects/:projectId/links/:linkId"
          component={LinkDetails}
        />
        <Route
          exact
          path="/projects/:projectId/files"
          component={FilesContent}
        />
        <Route
          exact
          path="/projects/:projectId/files/:fileId"
          component={FileDetails}
        />
        <Route
          path="/projects/:projectId/agenda/:agendaID"
          component={AgendaDetails}
        />
        <Route exact path="/tasks/:projectID" component={TaskLists} />
      </div>
      <footer style={{ height: '10rem' }} />
    </div>
  );
};

export default MainContent;
