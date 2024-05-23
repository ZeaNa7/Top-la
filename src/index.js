import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AppRouter } from './router';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import CssBaseline from '@mui/material/CssBaseline';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <CssBaseline />
      <AppRouter />
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
