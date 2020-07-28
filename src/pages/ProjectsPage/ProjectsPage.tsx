import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Layout from '../../components/Layout/Layout';
import MainContent from '../../components/MainContent/MainContent';
import Projects from '../Projects/Projects';

const ProjectsPage: React.FC = () => {
	return (
		<Router>
			<div>
				<Header />
				<main className='mainContainer'>
					{/* <Route path='/' component={Layout} /> */}
					<Route exact path='/' component={Projects} />
					<Route exact path='/projects' component={Projects} />
					<Route path='/projects/:projectId/' component={Layout} />
					<MainContent />
				</main>
				<footer style={{ height: '10rem' }} />
			</div>
		</Router>
	);
};
export default ProjectsPage;
