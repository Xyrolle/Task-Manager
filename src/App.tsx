import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import AllPages from './pages/AllPages';
import Login from './pages/Login/Login'
import Registration from './pages/Registration/Registration'
import { AppProvider } from './context/AppContext';

const App: React.FC = () => {
  const [isAuth, setisAuth] = useState(false)

  return (
    <AppProvider>
      <Router >
        {!localStorage.getItem('token') ?
          <div  >
            <Redirect to="/login/" />
            <Switch>
              <Route path='/login' component={Login} />
              <Route path='/register' component={Registration} />
              <AllPages />
            </Switch>
          </div>
          : <AllPages />
        }
      </Router>
    </AppProvider>

  );
}
export default App;
