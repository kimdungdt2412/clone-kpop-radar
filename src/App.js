import React from 'react';
import './App.css';
import Loading from './components/Loading/Loading';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeTemplate from './templates';
import DashboardTemplate from './templates/Dashboard';
import Footer from './components/Footer/Footer';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ScrollToTop } from './components/ScrollToTop';


const About = React.lazy(() => import('./pages/AboutPage'))
const Brief = React.lazy(() => import('./pages/BriefPage'))
const Artist = React.lazy(() => import('./pages/ArtistPage'))
const DetailArtist = React.lazy(() => import('./pages/DetailArtistPage'))
const BoardPage = React.lazy(() => import('./pages/BoardPage'))

function App() {
  return (
    <BrowserRouter>
      <ParallaxProvider>
        <ScrollToTop>
          <Routes>
            <Route element={<DashboardTemplate />}>
              <Route
                path="/"
                element={
                  <React.Suspense fallback={<Loading />}>
                    <BoardPage />
                  </React.Suspense>}
              />
              <Route
                path="/board"
                element={
                  <React.Suspense fallback={<Loading />}>
                    <BoardPage />
                  </React.Suspense>}
              />

              <Route
                path="/board/:type"
                element={
                  <React.Suspense fallback={<Loading />}>
                    <BoardPage />
                  </React.Suspense>}
              />
            </Route>

            <Route element={<HomeTemplate />}>

              <Route
                path="/artist"
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
      <Footer />
    </BrowserRouter>
  );
}

export default App;
