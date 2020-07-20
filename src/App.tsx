import React from 'react';

import AllPages from './pages/AllPages';
import { AppProvider } from './context/AppContext';

import './App.css';

function App() {
  return (
    <AppProvider>
      <AllPages />
    </AppProvider>
  );
}
export default App;
