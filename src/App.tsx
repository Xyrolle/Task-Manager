import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AllPages from './pages/AllPages';
import { AppProvider } from './context/AppContext';

import './App.css';

function App() {
  return (
    <Router>
      <AppProvider>
        <AllPages />
      </AppProvider>
    </Router>
  );
}
export default App;
