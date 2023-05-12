import React from 'react';
import './App.css';
import Loading from './components/Loading/Loading';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeTemplate from './templates';
import Homepage from './templates/Homepage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Dots from './components/Dots/Dots';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ScrollToTop } from './features/ScrollToTop';


const About = React.lazy(() => import('./templates/AboutPage'))
const Brief = React.lazy(() => import('./templates/BriefPage'))
const Artist = React.lazy(() => import('./templates/ArtistPage'))
const DetailArtist = React.lazy(() => import('./templates/DetailArtistPage'))


function App() {

  return (
    <BrowserRouter>
      <Header />
      <ParallaxProvider>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<HomeTemplate />}>
              <Route path="" element={<Homepage />}>

              </Route>


              <Route
                path="/artist-list"
                element={
                  <React.Suspense fallback={<Loading />}>
                    <Artist />
                  </React.Suspense>}
              />

              <Route
                path="/artist/:artistPath"
                element={
                  <React.Suspense fallback={<Loading />}>
                    <DetailArtist />
                  </React.Suspense>}
              />

              <Route
                path="/brief"
                element={
                  <React.Suspense fallback={<Loading />}>
                    <Brief />
                  </React.Suspense>}
              />

              <Route
                path="/brief/:id"
                element={
                  <React.Suspense fallback={<Loading />}>
                    <Brief />
                  </React.Suspense>}
              />

              {/* <Route
                path="/brief/:id"
                element={<BriefViewDetail />}
              /> */}


              <Route
                path="/about"
                element={
                  <React.Suspense fallback={<Loading />}>
                    <About />
                  </React.Suspense>
                }
              />
            </Route>
          </Routes>
        </ScrollToTop>
      </ParallaxProvider>
      <Dots />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
