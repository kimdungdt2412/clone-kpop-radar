import React from 'react';
import './App.css';
import Loading from './components/Loading/Loading';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeTemplate from './templates';
import Homepage from './templates/Homepage/Homepage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Dots from './components/Dots/Dots';
import About from './templates/AboutPage/AboutPage';
import { ParallaxProvider } from 'react-scroll-parallax';
import Brief from './templates/BriefPage/BriefPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Loading />
      <ParallaxProvider>
        <Routes>
          <Route path="/" element={<HomeTemplate />}>
            <Route path="" element={<Homepage />} />
            <Route path="/brief" element={<Brief />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </ParallaxProvider>
      <Dots />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
