import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from '../../components/Header/Header';
import Layout from '../../components/Layout/Layout';
import MainContent from '../../components/MainContent/MainContent';

const ProjectsPage: React.FC = () => {
	return (
		<Router>
			<div>
				<Header />
				<main className='mainContainer'>
					<Route path='/' component={Layout} />
					<MainContent />
				</main>
				<footer style={{ height: '5rem' }} />
			</div>
		</Router>
	);
};
export default ProjectsPage;
