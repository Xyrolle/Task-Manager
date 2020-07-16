import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import MainContent from './components/MainContent/MainContent';

import Agenda from './components/MainContent/Agenda/Agenda';
import Tasks from './components/MainContent/Tasks/Tasks';

import './App.css';

function App() {
	return (
		<Router>
			<div>
				<Header />
				<main className='mainContainer'>
					<Switch>
						<Route exact path='/' component={Layout} />
						<Route path='/agenda/:agendaID' component={Agenda} />
						<Route path='/tasks/:projectID' component={Tasks} />
					</Switch>
					<MainContent />
				</main>
				<footer style={{ height: '5rem' }} />
			</div>
		</Router>
	);
}

export default App;
