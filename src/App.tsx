import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import MainContent from './components/MainContent/MainContent';
import { Agenda } from './components/MainContent/Agenda/Agenda'
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <main className='mainContainer'>
          <Switch>
            <Route path="/" exact component={Layout} />
            <Route path="/agenda/:agendaId" component={Agenda} />
          </Switch>
          <MainContent />
        </main>
        <footer style={{ height: '5rem' }}></footer>
      </div>
    </Router>
  );
}

export default App;
