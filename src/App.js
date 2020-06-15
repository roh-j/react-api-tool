import React from 'react';
import ToolMainPage from './pages/ToolMainPage';
import './App.css';
import './resources/css/bootstrap.css'
import { Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Route component={ToolMainPage} path='/' />
    </>
  );
}

export default App;
