import React from 'react';

import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import MainContent from './components/MainContent/MainContent';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Header />
      <main className='mainContainer'>
        <Layout />
        <MainContent />
      </main>
      <footer style={{ height: '5rem' }}></footer>
    </div>
  );
}

export default App;
