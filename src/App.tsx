import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import MainContent from './components/MainContent/MainContent';

import Agenda from './components/MainContent/Agenda/Agenda';
import Tasks from './components/MainContent/Tasks/Tasks';
import { AgendaContent } from './components/MainContent/Agenda/AgendaContent'

import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main className='mainContainer'>
          <Switch>
            <Route path='/' component={Layout} />
            <Route exact path='/agenda' component={AgendaContent} />
            <Route path='/agenda/:agendaID' component={AgendaContent} />
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
