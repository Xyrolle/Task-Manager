import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query-devtools';
import { ReactQueryConfigProvider } from 'react-query';
import './App.css';
import AllPages from './pages/AllPages';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import { AppProvider } from './context/AppContext';
import Projects from './pages/Projects/Projects';

const App: React.FC = () => {
  const [isAuth, setisAuth] = useState(false);

  const queryConfig = { queries: { refetchOnWindowFocus: false } };
  console.log('APp');
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <AppProvider>
        <ReactQueryDevtools />
        {!localStorage.getItem('token') ? (
          <div>
            <Redirect to="/login/" />
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Registration} />
              <Route path="/projects" component={Projects} />
              <AllPages />
            </Switch>
          </div>
        ) : (
          <AllPages />
        )}
      </AppProvider>
    </ReactQueryConfigProvider>
  );
};
export default App;
