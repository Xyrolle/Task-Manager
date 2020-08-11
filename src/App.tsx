import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query-devtools';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import AllPages from './pages/AllPages';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import { AppProvider } from './context/AppContext';
import { ReactQueryConfigProvider } from 'react-query';

const App: React.FC = () => {
	const [ isAuth, setisAuth ] = useState(false);
	const queryConfig = { queries: { refetchOnWindowFocus: false } };
	console.log('APp');
	return (
		<ReactQueryConfigProvider config={queryConfig}>
			<AppProvider>
				<ReactQueryDevtools />
				<Router>
					{
						!localStorage.getItem('token') ? <div>
							<Redirect to='/login/' />
							<Switch>
								<Route path='/login' component={Login} />
								<Route path='/register' component={Registration} />
								<AllPages />
							</Switch>
						</div> :
						<AllPages />}
				</Router>
			</AppProvider>
		</ReactQueryConfigProvider>
	);
};
export default App;
