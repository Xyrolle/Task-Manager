import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import AllPages from './pages/AllPages';
import Login from './pages/Login/Login'
import Registration from './pages/Registration/Registration'
import { AppProvider } from './context/AppContext';

{/* <Redirect to="/login/" />
  <Route exact path='/login' component={Login} /> */}
const App: React.FC = () => {
  const [isAuth, setisAuth] = useState(false)

  useEffect((): any => {
    if (localStorage.getItem('token')) {
      setisAuth(true)
    }
  }, [])

  return (
    <Router>
      <AppProvider>
        {!isAuth ?
          <div>
            <Redirect to="/login/" />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Registration} />
          </div>
          : <AllPages />
        }
      </AppProvider>
    </Router>
  );
}
export default App;
