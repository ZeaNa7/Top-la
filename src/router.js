import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CameraPage from './pages/cameraPage';
import HomePage from './pages/homePage';
import PicturePage from './pages/picturePage';
import MapPage from './pages/mapPage';
import CallPage from './pages/callPage';

export const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/camera" element={<CameraPage />} />
      <Route path="/picture" element={<PicturePage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/call" element={<CallPage />} />
    </Routes>
  </Router>
);
