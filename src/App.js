import React from 'react';
import './App.css';
import Loading from './components/Loading/Loading';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeTemplate from './templates';
import Homepage from './templates/Homepage/Homepage';

function App() {
  return (
    <BrowserRouter>
      {/* <Loading /> */}
      <Routes>
        <Route path="/" element={<HomeTemplate />}>
          <Route path="" element={<Homepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
